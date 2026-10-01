"use client";
import { useState, useEffect, useCallback } from "react";
import { FaSave, FaSearch, FaShareAlt, FaTwitter, FaLink } from "react-icons/fa";
import { MdOutlineTitle, MdDescription } from "react-icons/md";
import Swal from "sweetalert2";
import ImageUploader from "@/components/admin/ImageUploader";

const PAGES = [
  { key: "home",     label: "Home Page" },
  { key: "projects", label: "Projects Page" },
  { key: "services", label: "Services Page" },
  { key: "blog",     label: "Blog Page" },
  { key: "courses",  label: "Courses Page" },
  { key: "about",    label: "About Page" },
  { key: "contact",  label: "Contact Page" },
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

// Pre-filled with the EXACT live retro website metadata
const DEFAULT_SEO_DATA: Record<string, Omit<SeoEntry, "id">> = {
  home: {
    pageKey: "home",
    pageLabel: "Home Page",
    metaTitle: "Juwel Hossain — Full-Stack Engineer & Shopify Developer",
    metaDescription: "Full-stack web developer specializing in Next.js, React, Node.js, and custom Shopify themes. Clean architecture, scalable web applications.",
    ogTitle: "Juwel Hossain — Full-Stack Engineer & Shopify Developer",
    ogDescription: "Full-stack web developer specializing in Next.js, React, Node.js, and custom Shopify solutions.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Juwel Hossain — Full-Stack Engineer & Shopify Developer",
    twitterDescription: "Full-stack web developer specializing in Next.js, React, Node.js, and custom Shopify solutions.",
    canonicalUrl: "http://localhost:3000/",
  },
  projects: {
    pageKey: "projects",
    pageLabel: "Projects Page",
    metaTitle: "Featured Projects & Deployments | Juwel Hossain",
    metaDescription: "Real-world full-stack web applications, custom platforms, and production systems built with Next.js, React, Node.js, and MongoDB.",
    ogTitle: "Featured Projects & Deployments | Juwel Hossain",
    ogDescription: "Real-world full-stack web applications, custom platforms, and production systems.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Featured Projects & Deployments | Juwel Hossain",
    twitterDescription: "Real-world full-stack web applications, custom platforms, and production systems.",
    canonicalUrl: "http://localhost:3000/#projects",
  },
  services: {
    pageKey: "services",
    pageLabel: "Services Page",
    metaTitle: "Engineering Services & Solutions | Juwel Hossain",
    metaDescription: "Handcrafted engineering services: MERN stack development, custom Shopify themes, landing pages, and API architectures.",
    ogTitle: "Engineering Services & Solutions | Juwel Hossain",
    ogDescription: "Handcrafted engineering services: MERN stack, Next.js, custom Shopify themes, and full-stack solutions.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Engineering Services & Solutions | Juwel Hossain",
    twitterDescription: "Handcrafted engineering services: MERN stack, Next.js, custom Shopify themes, and full-stack solutions.",
    canonicalUrl: "http://localhost:3000/#services",
  },
  blog: {
    pageKey: "blog",
    pageLabel: "Blog Page",
    metaTitle: "Notebook & Essays | Juwel Hossain – Full-Stack Engineer",
    metaDescription: "Handcrafted technical essays, MERN stack case studies, Next.js architecture notes, and software design principles.",
    ogTitle: "Notebook & Essays | Juwel Hossain",
    ogDescription: "Handcrafted technical essays, MERN stack case studies, and architecture notes.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Notebook & Essays | Juwel Hossain",
    twitterDescription: "Handcrafted technical essays and architecture notes.",
    canonicalUrl: "http://localhost:3000/explore?tab=blogs",
  },
  courses: {
    pageKey: "courses",
    pageLabel: "Courses Page",
    metaTitle: "Courses & Masterclasses | Juwel Hossain – Full-Stack Engineer",
    metaDescription: "Practical, 100% free web development curriculum — Next.js 15, React 19, MERN stack, and component architecture.",
    ogTitle: "Courses & Masterclasses | Juwel Hossain",
    ogDescription: "Practical, 100% free web development video courses.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Courses & Masterclasses | Juwel Hossain",
    twitterDescription: "Practical web development courses — Next.js, MERN stack, React, and beyond. All free.",
    canonicalUrl: "http://localhost:3000/explore?tab=courses",
  },
  about: {
    pageKey: "about",
    pageLabel: "About Page",
    metaTitle: "About Me | Juwel Hossain – MERN Stack & Next.js Engineer",
    metaDescription: "CSE student at Sonargaon University, full-stack engineer crafting scalable web apps with clean architecture in Bangladesh.",
    ogTitle: "About Me | Juwel Hossain",
    ogDescription: "Passionate MERN & Next.js developer studying CSE at Sonargaon University, building scalable web apps.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "About Me | Juwel Hossain",
    twitterDescription: "Passionate MERN & Next.js developer studying CSE at Sonargaon University.",
    canonicalUrl: "http://localhost:3000/#education",
  },
  contact: {
    pageKey: "contact",
    pageLabel: "Contact Page",
    metaTitle: "Let’s Talk & Inquiries | Juwel Hossain – Full-Stack Engineer",
    metaDescription: "Drop a message for project collaborations, technical consulting, or freelance full-stack engineering opportunities.",
    ogTitle: "Let’s Talk | Juwel Hossain",
    ogDescription: "Let's build something memorable together. Drop a message for project collaborations.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Let’s Talk | Juwel Hossain",
    twitterDescription: "Get in touch with Juwel Hossain for full-stack web engineering inquiries.",
    canonicalUrl: "http://localhost:3000/contact",
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
        data.forEach((d: SeoEntry) => {
          map[d.pageKey] = d;
        });
      }
      setSeoData(map);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
        text: `Metadata for "${entry.pageLabel}" updated successfully.`,
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to save SEO metadata.",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } finally {
      setSaving(null);
    }
  };

  const entry = getEntry(activePage);

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-typewriter text-xs text-[#78716C]">LOADING SEO DOSSIERS...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b-2 border-[#191712] pb-5">
        <div>
          <p className="retro-eyebrow !mb-1">METADATA CONTROLLER</p>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            SEO &amp; <span className="marked">Metadata</span>
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Configure page-level titles, meta descriptions, and Open Graph previews for search engines and social cards.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={!!saving}
          className="btn-primary"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaSave /> Save Page SEO
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Page Selector */}
        <nav className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap lg:w-56 xl:w-64 flex-shrink-0">
          {PAGES.map((p) => {
            const isActive = activePage === p.key;
            const hasCustomTitle = !!seoData[p.key]?.metaTitle;
            return (
              <button
                key={p.key}
                onClick={() => setActivePage(p.key)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-hand transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-[#FFE45E] text-[#191712] border-2 border-[#191712] font-bold shadow-[2px_2px_0px_#191712]"
                    : "bg-[#FAF7EE] text-[#57534E] border border-[#191712]/20 hover:border-[#191712] hover:bg-[#FBF6E6]"
                }`}
              >
                <span>{p.label}</span>
                {hasCustomTitle && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-[#191712] bg-[#FFE45E]"
                    title="Custom metadata active"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* SEO Fields */}
        <div className="flex-1 space-y-5">
          {/* Info banner */}
          <div className="hand-dashed-box p-4 bg-[#FFFBEB] flex items-start gap-3">
            <span className="font-typewriter font-bold text-sm bg-[#FFE45E] border border-[#191712] px-2 py-0.5 text-[#191712] shrink-0">
              NOTE
            </span>
            <p className="font-hand text-sm text-[#292524] leading-relaxed">
              These fields show the <strong>exact live metadata</strong> for the selected page. Unsaved pages display defaults from the code. Click <strong>Save Page SEO</strong> to persist to the database.
            </p>
          </div>

          {/* Basic SEO */}
          <div className="hand-box p-5 sm:p-7 bg-[#FFFFFF] space-y-5">
            <h2 className="font-script font-bold text-2xl text-[#191712] pb-3 border-b-2 border-[#191712] flex items-center gap-2">
              <FaSearch className="text-[#191712]" /> Basic SEO
            </h2>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2 flex items-center gap-2">
                <MdOutlineTitle /> Meta Title
              </label>
              <input
                className="form-input w-full font-hand text-base"
                placeholder="Page Title — Your Site Name"
                value={entry.metaTitle}
                onChange={(e) => setField("metaTitle", e.target.value)}
                maxLength={90}
              />
              <p className="font-typewriter text-[11px] text-[#78716C] mt-1">{entry.metaTitle.length}/90 characters</p>
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2 flex items-center gap-2">
                <MdDescription /> Meta Description
              </label>
              <textarea
                rows={3}
                className="form-input w-full font-hand text-base"
                placeholder="Brief description for search engines (150–160 chars recommended)"
                value={entry.metaDescription}
                onChange={(e) => setField("metaDescription", e.target.value)}
                maxLength={200}
              />
              <p className="font-typewriter text-[11px] text-[#78716C] mt-1">{entry.metaDescription.length}/200 characters</p>
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2 flex items-center gap-2">
                <FaLink /> Canonical URL
              </label>
              <input
                className="form-input w-full font-hand text-base"
                type="url"
                placeholder="https://yoursite.com/page"
                value={entry.canonicalUrl}
                onChange={(e) => setField("canonicalUrl", e.target.value)}
              />
            </div>
          </div>

          {/* Open Graph */}
          <div className="hand-box p-5 sm:p-7 bg-[#FFFFFF] space-y-5">
            <h2 className="font-script font-bold text-2xl text-[#191712] pb-3 border-b-2 border-[#191712] flex items-center gap-2">
              <FaShareAlt className="text-[#191712]" /> Open Graph (Social Cards)
            </h2>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2">
                OG Title
              </label>
              <input
                className="form-input w-full font-hand text-base"
                placeholder="Social share title"
                value={entry.ogTitle}
                onChange={(e) => setField("ogTitle", e.target.value)}
              />
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2">
                OG Description
              </label>
              <textarea
                rows={2}
                className="form-input w-full font-hand text-base"
                placeholder="Social share description"
                value={entry.ogDescription}
                onChange={(e) => setField("ogDescription", e.target.value)}
              />
            </div>
            <div>
              <ImageUploader
                label="OG / Social Share Image"
                value={entry.ogImage}
                onChange={(url) => setField("ogImage", url)}
                placeholder="https://... or /assets/..."
                helperText="Preview image shown when sharing links on Facebook, Twitter, and LinkedIn"
              />
            </div>
          </div>

          {/* Twitter Card */}
          <div className="hand-box p-5 sm:p-7 bg-[#FFFFFF] space-y-5">
            <h2 className="font-script font-bold text-2xl text-[#191712] pb-3 border-b-2 border-[#191712] flex items-center gap-2">
              <FaTwitter className="text-[#191712]" /> Twitter / X Card
            </h2>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2">
                Twitter Title
              </label>
              <input
                className="form-input w-full font-hand text-base"
                placeholder="Twitter card title"
                value={entry.twitterTitle}
                onChange={(e) => setField("twitterTitle", e.target.value)}
              />
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2">
                Twitter Description
              </label>
              <textarea
                rows={2}
                className="form-input w-full font-hand text-base"
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
