/** It is assumed that this is called only from the default branch. */
const { execSync, exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Apply changesets if any -- e.g., coming from pre-release branches
try {
  execSync("pnpm changeset pre exit");
} catch {
  // empty
}
try {
  execSync("pnpm changeset version");
  execSync(
    `git add . && git commit -m "Apply changesets and update CHANGELOG" && git push origin ${process.env.BRANCH}`,
  );
} catch {
  // no changesets to be applied
}

const pkgJSON = require("../lib/package.json");
const { version: VERSION, name } = pkgJSON;
const LATEST_VERSION = execSync(`npm view ${name} version`).toString();

console.log({ VERSION, LATEST_VERSION });

const [newMajor, newMinor] = VERSION.split(".");
const [oldMajor, oldMinor] = LATEST_VERSION.split(".");

const isPatch = newMajor === oldMajor && newMinor === oldMinor;

if (!isPatch) {
  /** Create new release branch for every Major or Minor release */
  const releaseBranch = `release-${newMajor}.${newMinor}`;
  execSync(`git checkout -b ${releaseBranch} && git push origin ${releaseBranch}`);
}

/** Create release */
try {
  execSync("cd lib && pnpm build && npm publish --provenance --access public");
  /** Create GitHub release */
  execSync(
    `gh release create ${VERSION} --generate-notes --latest -n "$(sed '1,/^## /d;/^## /,$d' ./lib/CHANGELOG.md)" --title "Release v${VERSION}"`,
  );
} catch (e) {
  console.error(e);
}

// update canonicals

const canonicals = [`@mayank1513/${name}`, "nextjs-themes-ultra"];
const pkgPath = path.join(__dirname, "../lib/package.json");

/** Publish canonical packages */
const publishCanonical = canonical => {
  pkgJSON.name = canonical;
  fs.writeFileSync(pkgPath, JSON.stringify(pkgJSON, null, 2));
  exec("cd lib && pnpm build && npm publish --provenance --access public");
};

canonicals.forEach(publishCanonical);

pkgJSON.peerDependencies.r18gs = "^1";
delete pkgJSON.dependencies;

const liteCanonicals = ["nthul-lite", "@mayank1513/nthul-lite", "nextjs-themes-ultralite"];

liteCanonicals.forEach(publishCanonical);

const toDeprecate = ["@mayank1513/nthul", "@mayank1513/nthul-lite"];

toDeprecate.forEach(pkg =>
  exec(
    `npm deprecate ${pkg} "Please use <https://www.npmjs.com/package/${pkg.slice("/")[1]}> instead. We initially created scoped packages to have similarities with the GitHub Public Repository (which requires packages to be scoped). We are no longer using GPR and thus deprecating all scoped packages for which corresponding un-scoped packages exist.`,
  ),
);
