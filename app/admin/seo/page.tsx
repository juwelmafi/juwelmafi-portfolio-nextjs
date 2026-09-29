"use client";
import { useState, useEffect, useCallback } from "react";
import { FaSave, FaSearch, FaShareAlt, FaTwitter, FaLink } from "react-icons/fa";
import { MdOutlineTitle, MdDescription } from "react-icons/md";
import Swal from "sweetalert2";

const PAGES = [
  { key: "home",     label: "Home Page" },
  { key: "about",    label: "About Page" },
  { key: "projects", label: "Projects Page" },
  { key: "blog",     label: "Blog Page" },
  { key: "services", label: "Services Page" },
  { key: "contact",  label: "Contact Page" },
  { key: "courses",  label: "Courses Page" },
];

interface SeoEntry {
  id?: string;
  pageKey: string;
  pageLabel: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  canonicalUrl: string;
}

const emptyEntry = (pageKey: string, pageLabel: string): SeoEntry => ({
  pageKey,
  pageLabel,
  metaTitle: "",
  metaDescription: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  canonicalUrl: "",
});

// Pre-filled with the EXACT live website metadata from code
const DEFAULT_SEO_DATA: Record<string, Omit<SeoEntry, "id">> = {
  home: {
    pageKey: "home", pageLabel: "Home Page",
    metaTitle: "Juwel Hossain — MERN Stack & Next.js Developer",
    metaDescription: "Personal portfolio of Juwel Hossain (juwelmafi) — Full-Stack Developer & UI/UX Specialist. Explore featured projects, tech stack, and get in touch.",
    ogTitle: "Juwel Hossain — MERN Stack & Next.js Developer",
    ogDescription: "Personal portfolio of Juwel Hossain — Full-Stack Developer & UI/UX Specialist.",
    ogImage: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",
    twitterTitle: "Juwel Hossain — MERN Stack & Next.js Developer",
    twitterDescription: "Full-Stack Developer & UI/UX Specialist. Explore featured projects and get in touch.",
    canonicalUrl: "https://juwelmafi.vercel.app/",
  },
  projects: {
    pageKey: "projects", pageLabel: "Projects Page",
    metaTitle: "Projects & Works — Juwel Hossain",
    metaDescription: "Explore full-stack web applications, scalable platforms, open-source repositories, and client deployments by Juwel Hossain.",
    ogTitle: "Projects & Works — Juwel Hossain",
    ogDescription: "Production web platforms, real-world full-stack architectures, and open-source applications built with Next.js, React, Node.js, and MongoDB Atlas.",
    ogImage: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",
    twitterTitle: "Projects & Works — Juwel Hossain",
    twitterDescription: "Explore full-stack web applications, scalable platforms, open-source repositories, and client deployments by Juwel Hossain.",
    canonicalUrl: "https://juwelmafi.vercel.app/projects",
  },
  blog: {
    pageKey: "blog", pageLabel: "Blog Page",
    metaTitle: "Blog & Knowledge Base — Juwel Hossain",
    metaDescription: "Thoughts on web development, the MERN stack, Next.js architecture, and the journey of continuous engineering.",
    ogTitle: "Blog & Knowledge Base — Juwel Hossain",
    ogDescription: "Thoughts on web development, the MERN stack, Next.js architecture, and the journey of continuous engineering.",
    ogImage: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",
    twitterTitle: "Blog & Knowledge Base — Juwel Hossain",
    twitterDescription: "Thoughts on web development, the MERN stack, Next.js architecture, and the journey of continuous engineering.",
    canonicalUrl: "https://juwelmafi.vercel.app/blog",
  },
  services: {
    pageKey: "services", pageLabel: "Services Page",
    metaTitle: "Services & Solutions — Juwel Hossain",
    metaDescription: "Explore professional full-stack web development, MERN & Next.js engineering, UI/UX design, and cloud database architecture services by Juwel Hossain.",
    ogTitle: "Services & Solutions — Juwel Hossain",
    ogDescription: "High-converting web applications, resilient Next.js architectures, fluid UI/UX systems, and cloud infrastructure built for long-term scalability.",
    ogImage: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",
    twitterTitle: "Services & Solutions — Juwel Hossain",
    twitterDescription: "Explore professional full-stack web development, MERN & Next.js engineering, UI/UX design, and cloud database architecture services by Juwel Hossain.",
    canonicalUrl: "https://juwelmafi.vercel.app/services",
  },
  contact: {
    pageKey: "contact", pageLabel: "Contact Page",
    metaTitle: "Contact & Inquiries — Juwel Hossain",
    metaDescription: "Get in touch with Juwel Hossain for full-stack web development collaborations, freelance projects, technical consulting, and inquiries.",
    ogTitle: "Contact & Inquiries — Juwel Hossain",
    ogDescription: "Let's build something memorable together. Drop a message for project collaborations, technical consulting, or freelance opportunities.",
    ogImage: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",
    twitterTitle: "Contact & Inquiries — Juwel Hossain",
    twitterDescription: "Get in touch with Juwel Hossain for full-stack web development collaborations, freelance projects, technical consulting, and inquiries.",
    canonicalUrl: "https://juwelmafi.vercel.app/contact",
  },
  courses: {
    pageKey: "courses", pageLabel: "Courses Page",
    metaTitle: "Courses — Juwel Hossain",
    metaDescription: "Free web development courses and tutorials on Next.js, React, MERN stack, and more.",
    ogTitle: "Courses & Tutorials — Juwel Hossain",
    ogDescription: "Practical web development courses — Next.js, MERN stack, React, and beyond. All free.",
    ogImage: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",
    twitterTitle: "Courses — Juwel Hossain",
    twitterDescription: "Free web development courses and tutorials on Next.js, React, MERN stack, and more.",
    canonicalUrl: "https://juwelmafi.vercel.app/courses",
  },
  about: {
    pageKey: "about", pageLabel: "About Page",
    metaTitle: "About Me — Juwel Hossain",
    metaDescription: "Passionate MERN & Next.js developer studying CSE at Sonargaon University, building scalable web apps in Bangladesh.",
    ogTitle: "About Me — Juwel Hossain",
    ogDescription: "Passionate MERN & Next.js developer studying CSE at Sonargaon University, building scalable web apps in Bangladesh.",
    ogImage: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",
    twitterTitle: "About Me — Juwel Hossain",
    twitterDescription: "Passionate MERN & Next.js developer studying CSE at Sonargaon University, building scalable web apps in Bangladesh.",
    canonicalUrl: "https://juwelmafi.vercel.app/#about",
  },
};

export default function AdminSeoPage() {
  const [seoData, setSeoData] = useState<Record<string, SeoEntry>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activePage, setActivePage] = useState("home");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/seo-meta");
      const data = await res.json();
      const map: Record<string, SeoEntry> = {};
      if (Array.isArray(data)) {
        data.forEach((d: SeoEntry) => { map[d.pageKey] = d; });
      }
      setSeoData(map);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const getEntry = (pageKey: string): SeoEntry => {
    const page = PAGES.find((p) => p.key === pageKey) || { key: pageKey, label: pageKey };
    const saved = seoData[pageKey];
    const def = DEFAULT_SEO_DATA[pageKey] || emptyEntry(pageKey, page.label);

    if (!saved) {
      return { ...emptyEntry(pageKey, page.label), ...def };
    }

    return {
      ...emptyEntry(pageKey, page.label),
      ...def,
      ...saved,
      metaTitle: saved.metaTitle || def.metaTitle || "",
      metaDescription: saved.metaDescription || def.metaDescription || "",
      ogTitle: saved.ogTitle || def.ogTitle || "",
      ogDescription: saved.ogDescription || def.ogDescription || "",
      ogImage: saved.ogImage || def.ogImage || "",
      twitterTitle: saved.twitterTitle || def.twitterTitle || "",
      twitterDescription: saved.twitterDescription || def.twitterDescription || "",
      canonicalUrl: saved.canonicalUrl || def.canonicalUrl || "",
    };
  };

  const setField = (field: keyof SeoEntry, value: string) => {
    setSeoData((prev) => ({
      ...prev,
      [activePage]: { ...getEntry(activePage), [field]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(activePage);
    try {
      const entry = getEntry(activePage);
      const res = await fetch("/api/seo-meta", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error("Failed");
      const saved = await res.json();
      setSeoData((prev) => ({ ...prev, [activePage]: saved }));
      await Swal.fire({
        title: "SEO Saved!",
        text: `Metadata for "${entry.pageLabel}" updated.`,
        icon: "success",
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#00DE51",
      });
    } catch {
      Swal.fire({ title: "Error", text: "Failed to save SEO metadata.", icon: "error", background: "#12121E", color: "#F0F0F5" });
    } finally {
      setSaving(null);
    }
  };

  const entry = getEntry(activePage);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="w-8 h-8 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white leading-tight">
            SEO &amp; Metadata
          </h1>
          <p className="text-xs sm:text-sm mt-1 text-[#888899]">
            Configure page-level meta titles, descriptions, and Open Graph social sharing for each page.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={!!saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? (
            <><span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" /> Saving...</>
          ) : (
            <><FaSave /> Save Page SEO</>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Page Selector */}
        <nav className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap lg:w-52 xl:w-60 flex-shrink-0">
          {PAGES.map((p) => (
            <button
              key={p.key}
              onClick={() => setActivePage(p.key)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left"
              style={{
                background: activePage === p.key ? "var(--accent)" : "rgba(255,255,255,0.04)",
                color: activePage === p.key ? "#0A0A14" : "var(--text-muted)",
              }}
            >
              {p.label}
              {seoData[p.key]?.metaTitle && (
                <span className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: activePage === p.key ? "#0A0A14" : "#00DE51" }} />
              )}
            </button>
          ))}
        </nav>

        {/* SEO Fields */}
        <div className="flex-1 space-y-5">
          {/* Info banner */}
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl text-xs leading-relaxed"
            style={{ background: "rgba(0,222,81,0.08)", border: "1px solid rgba(0,222,81,0.2)" }}
          >
            <span className="text-[#00DE51] mt-0.5 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            </span>
            <span style={{ color: "var(--text-muted)" }}>
              These fields show the <strong className="text-white">current live metadata</strong> for the selected page. Unsaved pages display defaults from the code. Click <strong className="text-white">Save Page SEO</strong> to persist to the database.
            </span>
          </div>
          {/* Basic SEO */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="heading-font text-base font-semibold text-white pb-3 border-b border-white/10 flex items-center gap-2">
              <FaSearch className="text-[#00DE51]" /> Basic SEO
            </h2>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: "var(--text-subtle)" }}>
                <MdOutlineTitle /> Meta Title
              </label>
              <input
                className="form-input"
                placeholder="Page Title — Your Site Name"
                value={entry.metaTitle}
                onChange={(e) => setField("metaTitle", e.target.value)}
                maxLength={70}
              />
              <p className="text-[11px] mt-1 opacity-50">{entry.metaTitle.length}/70 characters</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: "var(--text-subtle)" }}>
                <MdDescription /> Meta Description
              </label>
              <textarea
                rows={3}
                className="form-input"
                placeholder="Brief description for search engines (150–160 chars recommended)"
                value={entry.metaDescription}
                onChange={(e) => setField("metaDescription", e.target.value)}
                maxLength={160}
              />
              <p className="text-[11px] mt-1 opacity-50">{entry.metaDescription.length}/160 characters</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: "var(--text-subtle)" }}>
                <FaLink /> Canonical URL
              </label>
              <input
                className="form-input"
                type="url"
                placeholder="https://yoursite.com/page"
                value={entry.canonicalUrl}
                onChange={(e) => setField("canonicalUrl", e.target.value)}
              />
            </div>
          </div>

          {/* Open Graph */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="heading-font text-base font-semibold text-white pb-3 border-b border-white/10 flex items-center gap-2">
              <FaShareAlt className="text-[#00DE51]" /> Open Graph (Facebook, LinkedIn, WhatsApp)
            </h2>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                OG Title
              </label>
              <input
                className="form-input"
                placeholder="Social share title"
                value={entry.ogTitle}
                onChange={(e) => setField("ogTitle", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                OG Description
              </label>
              <textarea
                rows={2}
                className="form-input"
                placeholder="Social share description"
                value={entry.ogDescription}
                onChange={(e) => setField("ogDescription", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                OG Image URL
              </label>
              <input
                className="form-input"
                type="url"
                placeholder="https://... (1200×630px recommended)"
                value={entry.ogImage}
                onChange={(e) => setField("ogImage", e.target.value)}
              />
              {entry.ogImage && (
                <div className="mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.ogImage}
                    alt="OG preview"
                    className="h-20 rounded-lg object-cover border border-white/10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Twitter Card */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="heading-font text-base font-semibold text-white pb-3 border-b border-white/10 flex items-center gap-2">
              <FaTwitter className="text-[#00DE51]" /> Twitter / X Card
            </h2>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                Twitter Title
              </label>
              <input
                className="form-input"
                placeholder="Twitter card title"
                value={entry.twitterTitle}
                onChange={(e) => setField("twitterTitle", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                Twitter Description
              </label>
              <textarea
                rows={2}
                className="form-input"
                placeholder="Twitter card description"
                value={entry.twitterDescription}
                onChange={(e) => setField("twitterDescription", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
