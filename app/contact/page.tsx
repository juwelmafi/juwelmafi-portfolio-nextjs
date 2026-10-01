import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import HeaderRetro from "@/components/retro/HeaderRetro";
import FooterRetro from "@/components/retro/FooterRetro";
import ContactRetro from "@/components/retro/ContactRetro";
import { getSiteContentMap, getPageSeo } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contact");
  const title = seo?.metaTitle || "Contact & Inquiries — Juwel Hossain";
  const description =
    seo?.metaDescription ||
    "Get in touch with Juwel Hossain for full-stack web development collaborations, freelance projects, technical consulting, and inquiries.";

  return {
    title,
    description,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
    },
  };
}

export default async function ContactPage() {
  const content = await getSiteContentMap();

  const eyebrow = content?.["contact.eyebrow"] || "DISPATCH #001 · REACH OUT";
  const title = content?.["contact.title"] || "Transmit a message.";
  const desc =
    content?.["contact.desc"] ||
    "Tell me about your product requirements, team needs, or questions. I read every message and respond promptly with actionable insights.";

  return (
    <div className="retro-page-container">
      <HeaderRetro content={content} />

      <main className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Eyebrow & Navigation */}
          <div className="mb-10 sm:mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-hand text-base sm:text-lg text-[#191712] hover:underline mb-4"
            >
              ← Back to Overview
            </Link>
            
            <p className="retro-eyebrow">
              {eyebrow}
            </p>

            <h1 className="font-script font-bold text-4xl sm:text-5xl lg:text-6xl text-[#191712] mb-3">
              {title.toLowerCase().includes("message") ? (
                <>
                  {title.replace(/message\.?/i, "").trim()}{" "}
                  <span className="marked">message.</span>
                </>
              ) : (
                title
              )}
            </h1>

            <p className="font-hand text-lg sm:text-xl text-[#57534E] max-w-2xl">
              {desc}
            </p>
          </div>

          {/* Interactive Retro Contact Form */}
          <Suspense fallback={<div className="font-typewriter text-center py-20 text-[#57534E]">Loading transmission terminal...</div>}>
            <ContactRetro content={content} />
          </Suspense>

        </div>
      </main>

      <FooterRetro content={content} />
    </div>
  );
}
