import { ReactNode } from "react";
import styles from "./landing-page.module.scss";
import { Cards } from "../cards";
import { Logo } from "../logo";
import rebrandingConfig from "@repo/scripts/rebrand.config.json";

interface LandingPageProps {
  title: string;
  children?: ReactNode;
}

const { owner, repo } = rebrandingConfig;

const cards = [
  {
    href: `https://${owner}.github.io/${repo}/`,
    title: "Docs",
    description: "Check out the official documentation for more information.",
  },
  {
    href: `https://github.com/${owner}/${repo}/tree/main/examples`,
    title: "More Examples",
    description:
      "Check out more examples on the official GitHub Repo. Feel free to suggest additional examples in the discussions section.",
  },
  {
    href: `https://github.com/${owner}/${repo}`,
    title: "Star this repo",
    description:
      "Star this repo for your new library! This also motivates us and helps us understand that community is interested in this work.",
  },
];

/**
 * # LandingPage
 * library&#x27;s landing page
 */
export function LandingPage({ title, children }: LandingPageProps) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      <div className={[styles.center, styles.hero].join(" ")}>
        <h2>Craft your next amazing library using</h2>
        <Logo href={`https://github.com/${owner}/${repo}`} />
        <strong>Harness the full potential of React 18 Server Components!</strong>
      </div>
      {children}
      <Cards cards={cards} />
    </main>
  );
}
