import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getServices, getSiteContentMap, getPageSeo } from "@/lib/data";
import ServicesShowcase from "@/components/portfolio/ServicesShowcase";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services");
  const title = seo?.metaTitle || "Services & Solutions — Juwel Hossain";
  const description =
    seo?.metaDescription ||
    "Explore professional full-stack web development, MERN & Next.js engineering, UI/UX design, and cloud database architecture services by Juwel Hossain.";

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

export default async function ServicesPage() {
  const [services, content] = await Promise.all([
    getServices(true),
    getSiteContentMap(),
  ]);

  const headerTitle = content["services.headerTitle"] || "Engineering & Design Services";
  const headerDesc =
    content["services.headerDesc"] ||
    "High-converting web applications, resilient Next.js architectures, fluid UI/UX systems, and cloud infrastructure built for long-term scalability.";

  return (
    <>
      <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-28 md:pb-36 px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-28" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 mb-8"
              style={{
                background: "rgba(0, 222, 81, 0.12)",
                color: "#00DE51",
                border: "none",
              }}
            >
              ← Back to Portfolio
            </Link>
            <div>
              <span className="section-label">Services &amp; Solutions</span>
              <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
                {headerTitle}
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed text-white/70">
                {headerDesc}
              </p>
            </div>
          </div>

          {/* Interactive Services Showcase */}
          <ServicesShowcase initialServices={services} />
        </div>
      </main>
      <Footer content={content} />
    </>
  );
}
