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
    const page = PAGES.find((p) => p.key === pageKey)!;
    return seoData[pageKey] ?? emptyEntry(pageKey, page.label);
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
