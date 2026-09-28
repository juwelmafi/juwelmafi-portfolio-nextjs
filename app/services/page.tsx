import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getServices } from "@/lib/data";
import ServicesShowcase from "@/components/portfolio/ServicesShowcase";

export const metadata: Metadata = {
  title: "Services & Solutions — Juwel Hossain",
  description:
    "Explore professional full-stack web development, MERN & Next.js engineering, UI/UX design, and cloud database architecture services by Juwel Hossain.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <>
      <main className="min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-28" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
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
              <span className="section-label">Services &amp; Solutions</span>
              <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
                Engineering &amp; Design Services
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                High-converting web applications, resilient Next.js architectures, fluid UI/UX systems, and cloud
                infrastructure built for long-term scalability.
              </p>
            </div>
          </div>

          {/* Interactive Services Showcase */}
          <ServicesShowcase initialServices={services} />
        </div>
      </main>
      <Footer />
    </>
  );
}
