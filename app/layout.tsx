import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Juwel Hossain — MERN Stack & Next.js Developer",
  description:
    "Personal portfolio of Juwel Hossain (juwelmafi) — Full-Stack Developer & UI/UX Specialist. Explore featured projects, tech stack, and get in touch.",
  keywords: [
    "Juwel Hossain",
    "juwelmafi",
    "MERN Stack Developer",
    "Full-Stack Developer",
    "Next.js",
    "React Developer",
    "Portfolio",
    "Bangladesh"
  ],
  authors: [{ name: "Juwel Hossain" }],
  icons: {
    icon: "/assets/images/logo/favicon.svg",
    apple: "/assets/images/logo/favicon.svg",
  },
  openGraph: {
    title: "Juwel Hossain — MERN Stack & Next.js Developer",
    description: "Personal portfolio of Juwel Hossain — Full-Stack Developer & UI/UX Specialist.",
    type: "website",
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
