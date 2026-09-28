import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getProjects } from "@/lib/data";
import ProjectsShowcase from "@/components/portfolio/ProjectsShowcase";

export const metadata: Metadata = {
  title: "Projects & Works — Juwel Hossain",
  description:
    "Explore full-stack web applications, scalable platforms, open-source repositories, and client deployments by Juwel Hossain.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <main className="min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-28" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-6 transition-colors hover:text-white"
              style={{ color: "var(--accent)" }}
            >
              ← Back to Portfolio
            </Link>
            <div>
              <span className="section-label">Portfolio Showcase</span>
              <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
                Projects &amp; Deployments
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Production web platforms, real-world full-stack architectures, and open-source applications built
                with Next.js, React, Node.js, and MongoDB Atlas.
              </p>
            </div>
          </div>

          {/* Interactive Project Gallery & Filters */}
          <ProjectsShowcase initialProjects={projects} />
        </div>
      </main>
      <Footer />
    </>
  );
}
