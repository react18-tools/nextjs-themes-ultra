import "./styles.css";
import "react18-loaders/dist/index.css";
import { ServerTarget } from "nthul/dist/server";
import { ThemeSwitcher } from "nthul";
import { Layout } from "@repo/shared/dist/server";
import { GlobalLoader, Header } from "@repo/shared";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/** Root layout. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServerTarget />
        <ThemeSwitcher themeTransition="all 0.3s ease-in-out 0s" />
        <Layout>
          <Header />
          {children}
        </Layout>
        <GlobalLoader />
      </body>
    </html>
  );
}
