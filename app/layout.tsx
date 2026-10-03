import type { Metadata } from "next";
import "./theme.css";
import "./globals.css";
import "./retro.css";
import { SessionProvider } from "next-auth/react";
import GlobalNav from "@/components/portfolio/GlobalNav";
import { getPageSeo, getSiteContentMap } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, content] = await Promise.all([
    getPageSeo("home"),
    getSiteContentMap(),
  ]);
  const title = seo?.metaTitle || "Juwel Hossain — MERN Stack & Next.js Developer";
  const description =
    seo?.metaDescription ||
    "Personal portfolio of Juwel Hossain (juwelmafi) — Full-Stack Developer & UI/UX Specialist. Explore featured projects, tech stack, and get in touch.";

  const faviconUrl = content?.["site.favicon"] || "/assets/images/logo/favicon.svg";

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
      icon: [
        { url: faviconUrl },
        { url: faviconUrl, type: "image/png" },
      ],
      apple: [{ url: faviconUrl }],
      shortcut: [{ url: faviconUrl }],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContentMap();
  const faviconUrl = content?.["site.favicon"] || "/assets/images/logo/favicon.svg";

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href={faviconUrl} sizes="any" />
        <link rel="apple-touch-icon" href={faviconUrl} />
      </head>
      <body className="counter-scroll">
        <SessionProvider>
          <GlobalNav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
