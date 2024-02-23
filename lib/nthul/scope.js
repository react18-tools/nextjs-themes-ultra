/* eslint-disable -- no need - external file */
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const owner = "mayank1513";
const pkgPath = path.resolve(__dirname, "dist", "package.json");
const packageJson = require(pkgPath);
const ref = packageJson.name;
if (!ref.startsWith(`@${owner}`)) {
  packageJson.name = `@${owner}/${packageJson.name}`;
  fs.writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2));
  const readMePath = path.resolve(__dirname, "dist", "README.md");
  let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
  const tmp = "!--|--!";
  readMe = readMe.replace(new RegExp(`$${owner}/${ref}`, "g"), tmp);
  readMe = readMe.replace(new RegExp(ref, "g"), packageJson.name);
  readMe = readMe.replace(new RegExp(tmp, "g"), `$${owner}/${ref}`);
  fs.writeFileSync(readMePath, readMe);
}
