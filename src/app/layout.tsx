import "~/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Providers } from "~/providers";
import { Header } from "./header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "BlockRaise",
  description: `
    In the broader context of web3, founders struggle to raise funds for their project and there is no such platform to support various backers to fund projects.
    Traditional crowdfunding platforms face issues related to lack of transparency, high fees, and susceptibility to fraud.
    Centralized control hinders trust, and project creators often face challenges with fund distribution and accountability.
  `,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-50 font-sans ${inter.variable}`}>
        <Providers cookies={cookies().toString()}>
          <Header />
          <main className="mx-auto min-h-screen max-w-screen-xl px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
