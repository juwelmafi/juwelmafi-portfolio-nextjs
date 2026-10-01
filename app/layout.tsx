import type { Metadata } from "next";
import "./theme.css";
import "./globals.css";
import "./retro.css";
import { SessionProvider } from "next-auth/react";
import GlobalNav from "@/components/portfolio/GlobalNav";
import { getPageSeo } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  const title = seo?.metaTitle || "Juwel Hossain — MERN Stack & Next.js Developer";
  const description =
    seo?.metaDescription ||
    "Personal portfolio of Juwel Hossain (juwelmafi) — Full-Stack Developer & UI/UX Specialist. Explore featured projects, tech stack, and get in touch.";

  return {
    metadataBase: new URL(process.env.NEXTAUTH_URL || "https://juwelmafi.dev"),
    title,
    description,
    keywords: [
      "Juwel Hossain",
      "juwelmafi",
      "MERN Stack Developer",
      "Full-Stack Developer",
      "Next.js",
      "React Developer",
      "Portfolio",
      "Bangladesh",
    ],
    authors: [{ name: "Juwel Hossain" }],
    icons: {
      icon: "/assets/images/logo/favicon.svg",
      apple: "/assets/images/logo/favicon.svg",
    },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      type: "website",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="counter-scroll">
        <SessionProvider>
          <GlobalNav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
