import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/portfolio/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Inquiries — Juwel Hossain",
  description:
    "Get in touch with Juwel Hossain for full-stack web development collaborations, freelance projects, technical consulting, and inquiries.",
};

export default function ContactPage() {
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
              <span className="section-label">Get in Touch</span>
              <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
                Contact &amp; Inquiries
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Let&apos;s build something memorable together. Drop a message for project collaborations, technical
                consulting, or freelance opportunities.
              </p>
            </div>
          </div>

          {/* Interactive Contact Form & Reach Out Cards */}
          <Suspense fallback={<div className="text-center py-20 text-white/50 text-sm">Loading contact form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
