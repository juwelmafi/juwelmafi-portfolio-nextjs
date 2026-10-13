import type { Metadata } from "next";
import "./theme.css";
import "./globals.css";
import "./retro.css";
import { SessionProvider } from "next-auth/react";
import GlobalNav from "@/components/portfolio/GlobalNav";
import { getPageSeo, getSiteContentMap } from "@/lib/data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")
    ? process.env.NEXTAUTH_URL
    : "https://juwelmafi.vercel.app");

export async function generateMetadata(): Promise<Metadata> {
  const [seo, content] = await Promise.all([
    getPageSeo("home"),
    getSiteContentMap(),
  ]);

  const defaultTitle = "Juwel Hossain Mafi (juwelmafi) — Full-Stack Engineer & Next.js Developer";
  let title = seo?.metaTitle || defaultTitle;
  if (!title.toLowerCase().includes("mafi")) {
    title = defaultTitle;
  }
  const description =
    seo?.metaDescription ||
    "Official portfolio and engineering journal of Juwel Hossain Mafi (juwelmafi). Full-Stack Web Developer & Shopify Specialist building scalable Next.js and MERN applications.";

  const faviconUrl = content?.["site.favicon"] || "/assets/images/logo/favicon.svg";

  let ogTitle = seo?.ogTitle || title;
  if (!ogTitle.toLowerCase().includes("mafi")) {
    ogTitle = title;
  }
  let twitterTitle = seo?.twitterTitle || title;
  if (!twitterTitle.toLowerCase().includes("mafi")) {
    twitterTitle = title;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Juwel Hossain Mafi (juwelmafi)",
    },
    description,
    keywords: [
      "Juwel Hossain Mafi",
      "juwelmafi",
      "Juwel Mafi",
      "Juwel Hossain",
      "MERN Stack Developer",
      "Full-Stack Developer",
      "Next.js Developer",
      "React Developer",
      "Shopify Developer",
      "Portfolio",
      "Bangladesh",
    ],
    authors: [{ name: "Juwel Hossain Mafi", url: SITE_URL }],
    creator: "Juwel Hossain Mafi",
    publisher: "Juwel Hossain Mafi",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: faviconUrl },
        { url: faviconUrl, type: "image/png" },
      ],
      apple: [{ url: faviconUrl }],
      shortcut: [{ url: faviconUrl }],
    },
    openGraph: {
      siteName: "Juwel Hossain Mafi (juwelmafi) Portfolio",
      title: ogTitle,
      description: seo?.ogDescription || description,
      url: SITE_URL,
      type: "website",
      images: seo?.ogImage
        ? [
            {
              url: seo.ogImage,
              alt: (seo as any)?.ogImageAlt || "Juwel Hossain Mafi (juwelmafi) — Full-Stack Engineer & Next.js Developer",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: "@juwelmafi",
      creator: "@juwelmafi",
      title: twitterTitle,
      description: seo?.twitterDescription || description,
      images: seo?.ogImage ? [seo.ogImage] : undefined,
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

  // Google Knowledge Graph Schema: Person + WebSite Entity
  const personSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Juwel Hossain Mafi Portfolio & Engineering Journal",
        description: "Official portfolio and technical writings of Juwel Hossain Mafi (juwelmafi).",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/explore?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Juwel Hossain Mafi",
        alternateName: ["juwelmafi", "Juwel Mafi", "Juwel Hossain"],
        url: SITE_URL,
        image: content?.["hero.avatar"] || `${SITE_URL}/assets/images/avatar/juwel_retro.png`,
        jobTitle: "Full-Stack Software Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Freelance & Software Engineering Consultant",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Sonargaon University",
        },
        knowsAbout: [
          "Full-Stack Web Development",
          "Next.js 15",
          "React 19",
          "MERN Stack",
          "Node.js",
          "MongoDB Atlas",
          "Shopify Liquid",
          "Tailwind CSS",
          "TypeScript",
        ],
        sameAs: [
          content?.["social.github"] || "https://github.com/juwelmafi",
          content?.["social.linkedin"] || "https://www.linkedin.com/in/juwelmafi",
          content?.["social.youtube"] || "https://www.youtube.com/@juwelmafi",
          content?.["social.twitter"] || "https://x.com/juwelmafi",
          content?.["social.facebook"] || "https://facebook.com/juwelmafi",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href={faviconUrl} sizes="any" />
        <link rel="apple-touch-icon" href={faviconUrl} />
        {/* Google Knowledge Graph Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
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
