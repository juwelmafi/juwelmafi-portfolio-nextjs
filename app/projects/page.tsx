import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getProjects, getSiteContentMap, getPageSeo } from "@/lib/data";
import ProjectsShowcase from "@/components/portfolio/ProjectsShowcase";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("projects");
  const title = seo?.metaTitle || "Projects & Works — Juwel Hossain";
  const description =
    seo?.metaDescription ||
    "Explore full-stack web applications, scalable platforms, open-source repositories, and client deployments by Juwel Hossain.";

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

export default async function ProjectsPage() {
  const [projects, content] = await Promise.all([
    getProjects(),
    getSiteContentMap(),
  ]);

  const headerTitle = content["projects.headerTitle"] || "Projects & Deployments";
  const headerDesc =
    content["projects.headerDesc"] ||
    "Production web platforms, real-world full-stack architectures, and open-source applications built with Next.js, React, Node.js, and MongoDB Atlas.";

  return (
    <>
      <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-28 md:pb-36 px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-28" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-6xl mx-auto">
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
              <span className="section-label">Portfolio Showcase</span>
              <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
                {headerTitle}
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {headerDesc}
              </p>
            </div>
          </div>

          {/* Interactive Project Gallery & Filters */}
          <ProjectsShowcase initialProjects={projects} />
        </div>
      </main>
      <Footer content={content} />
    </>
  );
}
