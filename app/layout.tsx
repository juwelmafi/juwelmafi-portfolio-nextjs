import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Juwel Hossain — MERN Stack Developer",
  description:
    "Personal portfolio of Juwel Hossain — a passionate MERN Stack Developer from Bangladesh. Explore my projects, blog, and get in touch.",
  keywords: ["MERN Stack", "React Developer", "Next.js", "Frontend Developer", "Bangladesh"],
  authors: [{ name: "Juwel Hossain" }],
  openGraph: {
    title: "Juwel Hossain — MERN Stack Developer",
    description: "Portfolio of Juwel Hossain — MERN Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
