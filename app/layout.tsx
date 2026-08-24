import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Isak - Personal Portfolio",
  description:
    "Isak - Personal Portfolio is a sleek and modern Next.js template designed for developers, designers, freelancers, and professionals who want to showcase their work online.",
  keywords: ["Portfolio", "UI Designer", "Developer", "Full-Stack", "Webflow", "Next.js"],
  authors: [{ name: "Alexander Isak" }],
  icons: {
    icon: "/assets/images/logo/favicon.svg",
    apple: "/assets/images/logo/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark">
      <body className="counter-scroll video-v1 dark-mode type-dark-v1">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
