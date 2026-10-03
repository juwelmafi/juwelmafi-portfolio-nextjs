"use client";
import { useState, useEffect, useCallback } from "react";
import {
  FaSave,
  FaGlobe,
  FaUser,
  FaShareAlt,
  FaLink,
  FaImage,
  FaEdit,
  FaLayerGroup,
  FaTag,
  FaCompass,
  FaGraduationCap,
} from "react-icons/fa";
import { MdTextFields, MdOutlineTitle } from "react-icons/md";
import Swal from "sweetalert2";
import ImageUploader from "@/components/admin/ImageUploader";

interface ContentItem {
  id?: string;
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea" | "url" | "image";
  group: string;
}

// Default content — 100% dynamic items representing every visual element on the website
const DEFAULT_CONTENT: Omit<ContentItem, "id">[] = [
  // Hero
  { key: "hero.eyebrow",          label: "Hero Eyebrow Badge",                value: "FULL-STACK ENGINEER & SHOPIFY DEVELOPER",                                                                     type: "text",     group: "Hero" },
  { key: "hero.name",             label: "Your Display Name",                 value: "Juwel Hossain",                                                                                               type: "text",     group: "Hero" },
  { key: "hero.headline",         label: "Hero Main Headline",                value: "Engineering High-Impact Web Applications & Scalable Platforms.",                                              type: "textarea", group: "Hero" },
  { key: "hero.tagline",          label: "Hero Lede / Bio Description",       value: "I build scalable full-stack web applications, custom Shopify stores, and modern digital platforms. Specialized in React, Next.js, Node.js, and MongoDB with clean architecture and pixel-perfect design.", type: "textarea", group: "Hero" },
  { key: "hero.cta",              label: "Primary Button Text",               value: "Explore My Work →",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.ctaSecondary",     label: "Secondary Button Text",             value: "Start a Project",                                                                                             type: "text",     group: "Hero" },
  { key: "hero.subtext",          label: "Subtext Under Buttons",             value: "Available for freelance projects, full-stack contracts, and remote engineering roles.",                       type: "textarea", group: "Hero" },
  { key: "hero.subtextLink",      label: "Subtext Link Text",                 value: "View selected production cases and live deployments.",                                                        type: "text",     group: "Hero" },
  { key: "hero.check1",           label: "Trust Checklist Item 1",            value: "FAST PERFORMANCE",                                                                                            type: "text",     group: "Hero" },
  { key: "hero.check2",           label: "Trust Checklist Item 2",            value: "CLEAN ARCHITECTURE",                                                                                          type: "text",     group: "Hero" },
  { key: "hero.check3",           label: "Trust Checklist Item 3",            value: "MODERN TECH STACK",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.check4",           label: "Trust Checklist Item 4",            value: "ON-TIME DELIVERY",                                                                                            type: "text",     group: "Hero" },
  { key: "hero.stickerRound",     label: "Round Sticker Text",                value: "100%",                                                                                                        type: "text",     group: "Hero" },
  { key: "hero.stickerOval",      label: "Oval Sticker Text",                 value: "PRODUCTION READY",                                                                                            type: "text",     group: "Hero" },
  { key: "hero.avatar",           label: "Retro Portrait Image URL",          value: "/assets/images/avatar/juwel_retro.png",                                                                       type: "image",    group: "Hero" },
  { key: "hero.certIssuer",       label: "Dossier Issuer Brand",              value: "JUWELMAFI.DEV",                                                                                               type: "text",     group: "Hero" },
  { key: "hero.certSerial",       label: "Dossier Serial Code",               value: "JH-ENG-001",                                                                                                  type: "text",     group: "Hero" },
  { key: "hero.certTitle",        label: "Dossier Card Title",                value: "Verified Engineer Dossier",                                                                                   type: "text",     group: "Hero" },
  { key: "hero.certSubtitle",     label: "Dossier Card Subtitle",             value: "Full-Stack Web & E-Commerce Developer",                                                                       type: "text",     group: "Hero" },
  { key: "hero.certStatus",       label: "Dossier Availability Status",       value: "STATUS: AVAILABLE",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.certIssued",       label: "Dossier Issued Date",               value: "01 OCT 2026",                                                                                                 type: "text",     group: "Hero" },
  { key: "hero.certExpires",      label: "Dossier Expiry",                    value: "INDEFINITE",                                                                                                  type: "text",     group: "Hero" },
  { key: "hero.certStatement",    label: "Dossier Verification Statement",    value: "Proven expertise in end-to-end full-stack architectures, custom Shopify solutions, responsive frontends, and database optimization.", type: "textarea", group: "Hero" },
  { key: "hero.certStamp",        label: "Rubber Stamp Text",                 value: "VERIFIED ENGINEER",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.certMrz",          label: "Passport MRZ Line",                 value: "SWE<MERN000001<JUWEL<HOSSAIN<<<<<<<<<<<<<<<<<<\nSTATUS<ACTIVE<20261001<NEXTJS<REACT<NODE<MONGO<<<<",         type: "textarea", group: "Hero" },

  // The Stack (Technical Skills)
  { key: "stack.eyebrow",         label: "Stack Section Eyebrow",             value: "TECHNICAL EXPERTISE",                                                                                         type: "text",     group: "The Stack" },
  { key: "stack.title",           label: "Stack Section Heading",             value: "Introducing The Stack.",                                                                                      type: "text",     group: "The Stack" },
  { key: "stack.desc",            label: "Stack Section Description",         value: "Designed without bloat. Engineered for production. Scalable architectures powering modern full-stack web applications and custom e-commerce platforms.", type: "textarea", group: "The Stack" },
  { key: "stack.boxTitle",        label: "Toolkit Box Title",                 value: "What's in my toolkit?",                                                                                       type: "text",     group: "The Stack" },
  { key: "stack.boxDesc",         label: "Toolkit Box Description",           value: "MERN Stack, Next.js 15, React 19, Shopify Themes, WordPress, TypeScript, Node.js, MongoDB Atlas. Scalable, clean, and tested for production.", type: "textarea", group: "The Stack" },
  { key: "stack.sticker",         label: "Starburst Sticker Text",            value: "certified clean",                                                                                             type: "text",     group: "The Stack" },
  { key: "stack.specTitle",       label: "Specification Sheet Title",         value: "TECHNICAL SPECIFICATION",                                                                                     type: "text",     group: "The Stack" },
  { key: "stack.skillMern",       label: "Skill: MERN Stack",                 value: "MongoDB, Express, React & Node.js",                                                                           type: "text",     group: "The Stack" },
  { key: "stack.skillNextjs",     label: "Skill: Next.js & React",            value: "Next.js 15, App Router, React 19 & SSR",                                                                      type: "text",     group: "The Stack" },
  { key: "stack.skillShopify",    label: "Skill: Shopify & Liquid",           value: "Custom Theme Dev, Liquid & Store Customization",                                                              type: "text",     group: "The Stack" },
  { key: "stack.skillWordpress",  label: "Skill: WordPress & CMS",            value: "Custom Themes, WooCommerce & Headless CMS",                                                                   type: "text",     group: "The Stack" },
  { key: "stack.skillLanguages",  label: "Skill: Languages",                  value: "TypeScript (Strict), JavaScript ES6+, HTML5/CSS3",                                                            type: "text",     group: "The Stack" },
  { key: "stack.skillBackend",    label: "Skill: Backend & Database",         value: "Node.js, Express API, MongoDB Atlas & REST/GraphQL",                                                          type: "text",     group: "The Stack" },
  { key: "stack.skillTools",      label: "Skill: Other Tech & DevOps",        value: "TailwindCSS, Git, Vercel, Docker & Cloudinary",                                                               type: "text",     group: "The Stack" },
  { key: "stack.skillQuality",    label: "Skill: Delivery & Standards",       value: "Clean Architecture & Zero Bloat",                                                                             type: "text",     group: "The Stack" },
  { key: "stack.footnote",        label: "Stack Footnote",                    value: "*All solutions built with clean, scalable, production-tested code.",                                          type: "text",     group: "The Stack" },

  // Services
  { key: "services.eyebrow",      label: "Services Section Eyebrow",          value: "SERVICES & SOLUTIONS",                                                                                        type: "text",     group: "Services" },
  { key: "services.title",        label: "Services Main Heading",             value: "Handcrafted Engineering Services.",                                                                           type: "text",     group: "Services" },
  { key: "services.desc",         label: "Services Description",              value: "Choose the exact service your project needs. Every solution is engineered from scratch with clean architecture, zero bloat, and full production care.", type: "textarea", group: "Services" },
  { key: "services.bottomNote",   label: "Services Bottom Note",              value: "Need a custom project or have a unique requirement? Send an inquiry through the contact form and I will review your specifications within 24 hours.", type: "textarea", group: "Services" },

  // Projects
  { key: "projects.eyebrow",      label: "Projects Eyebrow",                  value: "01 / THE WORK",                                                                                               type: "text",     group: "Projects" },
  { key: "projects.headerTitle",  label: "Projects Section Title",            value: "Featured Projects & Deployments",                                                                             type: "text",     group: "Projects" },
  { key: "projects.headerDesc",   label: "Projects Section Description",      value: "Real-world full-stack web applications, custom platforms, and production systems built with Next.js, React, Node.js, and MongoDB.", type: "textarea", group: "Projects" },

  // Education Ledger
  { key: "education.eyebrow",     label: "Education Eyebrow",                 value: "02 / CREDENTIALS & ACADEMIA",                                                                                 type: "text",     group: "Education Ledger" },
  { key: "education.title",       label: "Education Section Title",           value: "Academic Ledger & Formal Study",                                                                              type: "text",     group: "Education Ledger" },
  { key: "education.desc",        label: "Education Section Description",     value: "Verified university degrees and foundational academic milestones powering real-world engineering problem solving.", type: "textarea", group: "Education Ledger" },
  { key: "education.rec1.institution",   label: "Record 1: University Name",        value: "Sonargaon University",                                                                                 type: "text",     group: "Education Ledger" },
  { key: "education.rec1.qualification", label: "Record 1: Degree / Qualification", value: "B.Sc in Computer Science and Engineering (CSE)",                                                       type: "text",     group: "Education Ledger" },
  { key: "education.rec1.period",        label: "Record 1: Period & Status",        value: "2026 - Present · CURRENTLY ENROLLED",                                                                  type: "text",     group: "Education Ledger" },
  { key: "education.rec1.description",   label: "Record 1: Description",            value: "Deepening academic foundations in algorithmic complexity, distributed systems, software engineering patterns, database internal structures, and full-stack web platforms.", type: "textarea", group: "Education Ledger" },
  { key: "education.rec1.courses",       label: "Record 1: Core Subjects (CSV)",    value: "Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, Software Engineering Architecture, Computer Networks", type: "textarea", group: "Education Ledger" },
  { key: "education.rec2.institution",   label: "Record 2: College Name",           value: "Government Barhamgonj College, Shibchar",                                                              type: "text",     group: "Education Ledger" },
  { key: "education.rec2.qualification", label: "Record 2: Degree / Certificate",   value: "Higher Secondary Certificate (HSC) — Science",                                                          type: "text",     group: "Education Ledger" },
  { key: "education.rec2.period",        label: "Record 2: Period & Status",        value: "2020 - 2022 · COMPLETED",                                                                              type: "text",     group: "Education Ledger" },
  { key: "education.rec2.description",   label: "Record 2: Description",            value: "Graduated with a strong STEM background focusing on advanced mathematics, physics, and introductory computer science fundamentals.", type: "textarea", group: "Education Ledger" },
  { key: "education.rec2.courses",       label: "Record 2: Core Subjects (CSV)",    value: "Higher Mathematics, Physics, Information & Communication Technology",                                   type: "textarea", group: "Education Ledger" },

  // Explore Hub
  { key: "explore.ticketNumber",  label: "Explore Ticket Identifier",         value: "TICKET #EXP-2026",                                                                                            type: "text",     group: "Explore Hub" },
  { key: "explore.heading",       label: "Explore Section Heading",           value: "Want to explore more?",                                                                                       type: "text",     group: "Explore Hub" },
  { key: "explore.desc",          label: "Explore Section Description",       value: "Read comprehensive technical breakdowns, study MERN stack architectures, watch full YouTube masterclasses, and browse continuous learning guides.", type: "textarea", group: "Explore Hub" },
  { key: "explore.btnText",       label: "Explore Button Text",               value: "Explore More (Blogs & Courses) →",                                                                            type: "text",     group: "Explore Hub" },
  { key: "explore.stickyNote",    label: "Pinned Sticky Note Quote",          value: "“No gatekeeping. Every tutorial, course, and essay is open for everyone to learn.”",                          type: "textarea", group: "Explore Hub" },

  // Contact & Form
  { key: "contact.eyebrow",       label: "Contact Page Eyebrow",              value: "DISPATCH #001 · REACH OUT",                                                                                   type: "text",     group: "Contact & Form" },
  { key: "contact.title",         label: "Contact Page Heading",              value: "Transmit a message.",                                                                                         type: "text",     group: "Contact & Form" },
  { key: "contact.desc",          label: "Contact Page Description",          value: "Tell me about your product requirements, team needs, or questions. I read every message and respond promptly with actionable insights.", type: "textarea", group: "Contact & Form" },
  { key: "contact.cardEyebrow",   label: "Contact Card Dossier Eyebrow",      value: "COMMUNICATION DOSSIER",                                                                                       type: "text",     group: "Contact & Form" },
  { key: "contact.cardTitle",     label: "Contact Card Title",                value: "Let's talk software.",                                                                                        type: "text",     group: "Contact & Form" },
  { key: "contact.cardDesc",      label: "Contact Card Description",          value: "Have a project in mind, need consultation on modern full-stack architectures, or looking to collaborate? Drop me a message below.", type: "textarea", group: "Contact & Form" },
  { key: "contact.email",         label: "Inquiry Email Address",             value: "juwelhossain16457@gmail.com",                                                                                 type: "text",     group: "Contact & Form" },
  { key: "contact.location",      label: "Location Description",              value: "Dhaka, Bangladesh · Global Remote",                                                                           type: "text",     group: "Contact & Form" },
  { key: "contact.availability",  label: "Availability Status",               value: "Available for Freelance & Engineering",                                                                       type: "text",     group: "Contact & Form" },
  { key: "contact.formTitle",     label: "Form Box Title",                    value: "Transmit a Message",                                                                                          type: "text",     group: "Contact & Form" },
  { key: "contact.guaranteeText", label: "Form Guarantee Badge",              value: "0% SPAM GUARANTEE",                                                                                           type: "text",     group: "Contact & Form" },

  // Navigation
  { key: "header.work",           label: "Nav Link: Work",                    value: "Work",                                                                                                        type: "text",     group: "Navigation" },
  { key: "header.stack",          label: "Nav Link: The Stack",               value: "The Stack",                                                                                                   type: "text",     group: "Navigation" },
  { key: "header.services",       label: "Nav Link: Services",                value: "Services",                                                                                                    type: "text",     group: "Navigation" },
  { key: "header.education",      label: "Nav Link: Education",               value: "Education",                                                                                                   type: "text",     group: "Navigation" },
  { key: "header.explore",        label: "Nav Link: Writing & Courses",       value: "Writing & Courses",                                                                                           type: "text",     group: "Navigation" },
  { key: "header.cta",            label: "Nav Link: Button / CTA",            value: "Let's talk",                                                                                                  type: "text",     group: "Navigation" },

  // Site Settings
  { key: "site.logo",             label: "Site Logo URL",                     value: "/assets/images/logo/favicon.svg",                                                                             type: "image",    group: "Site Settings" },
  { key: "site.logoText",         label: "Site Logo Monogram",                value: "jh.",                                                                                                         type: "text",     group: "Site Settings" },
  { key: "site.favicon",          label: "Favicon Image",                       value: "/assets/images/logo/favicon.svg",                                                                             type: "image",    group: "Site Settings" },
  { key: "site.resumeUrl",        label: "Global Resume / CV URL",            value: "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing",                        type: "url",      group: "Site Settings" },
  { key: "site.footerTitle",      label: "Footer Brand Name",                 value: "JUWEL HOSSAIN",                                                                                               type: "text",     group: "Site Settings" },
  { key: "site.footerTagline",    label: "Footer Brand Tagline",              value: "Full-Stack Engineer & Shopify Developer",                                                                     type: "text",     group: "Site Settings" },
  { key: "site.footerDesc",       label: "Footer Description",                value: "Full-stack engineer specializing in MERN stack, Next.js, and high-performance Shopify e-commerce platforms.", type: "textarea", group: "Site Settings" },
  { key: "site.footerLedgerLine", label: "Footer Top Ledger Line",            value: "================ OFFICIAL DISPATCH & SUMMARY ================",                                               type: "text",     group: "Site Settings" },
  { key: "site.footerSerial",     label: "Footer Serial Code",                value: "JH-PORTFOLIO-2026",                                                                                           type: "text",     group: "Site Settings" },
  { key: "site.copyright",        label: "Footer Copyright Text",             value: "© 2026 Juwel Hossain. All rights reserved.",                                                                 type: "text",     group: "Site Settings" },

  // Social Links
  { key: "social.youtube",        label: "YouTube Channel URL",               value: "https://www.youtube.com/@juwelmafi",                                                                          type: "url",      group: "Social Links" },
  { key: "social.linkedin",       label: "LinkedIn Profile URL",              value: "https://www.linkedin.com/in/juwelmafi",                                                                       type: "url",      group: "Social Links" },
  { key: "social.github",         label: "GitHub Profile URL",                value: "https://github.com/juwelmafi",                                                                                type: "url",      group: "Social Links" },
  { key: "social.twitter",        label: "Twitter / X Profile URL",           value: "https://x.com/juwelmafi",                                                                                     type: "url",      group: "Social Links" },
  { key: "social.facebook",       label: "Facebook Profile URL",              value: "https://facebook.com/juwelmafi",                                                                              type: "url",      group: "Social Links" },
];

const GROUP_ICONS: Record<string, React.ReactNode> = {
  "Hero":               <FaUser />,
  "The Stack":           <FaLayerGroup />,
  "Services":           <FaTag />,
  "Projects":           <MdOutlineTitle />,
  "Education Ledger":   <FaGraduationCap />,
  "Explore Hub":        <FaCompass />,
  "Contact & Form":     <FaEdit />,
  "Navigation":         <FaLink />,
  "Site Settings":      <FaGlobe />,
  "Social Links":       <FaShareAlt />,
};

export default function AdminContentsPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeGroup, setActiveGroup] = useState("Hero");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-content");
      const data = await res.json();

      const dbMap = new Map<string, ContentItem>();
      if (Array.isArray(data)) {
        data.forEach((item: ContentItem) => {
          if (item && item.key) dbMap.set(item.key, item);
        });
      }

      // Merge: Start with DEFAULT_CONTENT so every item exists with exact live website defaults.
      // If DB has a saved value for this key and it's non-empty, use it.
      const merged: ContentItem[] = DEFAULT_CONTENT.map((def) => {
        const saved = dbMap.get(def.key);
        return {
          ...def,
          id: saved?.id,
          value: saved?.value !== undefined && saved?.value !== "" ? saved.value : def.value,
        };
      });

      // Also include any extra custom items from DB that might not be in DEFAULT_CONTENT
      const defaultKeys = new Set(DEFAULT_CONTENT.map((d) => d.key));
      if (Array.isArray(data)) {
        data.forEach((item: ContentItem) => {
          if (item && item.key && !defaultKeys.has(item.key)) {
            merged.push(item);
          }
        });
      }

      setItems(merged);
    } catch {
      setItems(DEFAULT_CONTENT.map((d) => ({ ...d })));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setValue = (key: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });

      if (!res.ok) {
        throw new Error("Failed to save content");
      }

      await Swal.fire({
        title: "Content Saved!",
        text: "Website content has been updated successfully.",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to save content.",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } finally {
      setSaving(false);
    }
  };

  const groups = Array.from(new Set(items.map((i) => i.group)));
  const groupItems = items.filter((i) => i.group === activeGroup);

  const getTypeIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "url":
        return <FaLink className="text-[#191712] text-xs" />;
      case "image":
        return <FaImage className="text-[#191712] text-xs" />;
      default:
        return <MdTextFields className="text-[#191712] text-xs" />;
    }
  };

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-typewriter text-xs text-[#78716C]">LOADING DOSSIERS...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b-2 border-[#191712] pb-5">
        <div>
          <p className="retro-eyebrow !mb-1">CONTENT CONTROLLER</p>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Site <span className="marked">Contents</span>
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Manage live website copy — hero headline, tech specs, pricing tiers, certificates, and headers.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaSave /> Save All Changes
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Group Sidebar */}
        <nav className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap lg:w-56 xl:w-64 flex-shrink-0">
          {groups.map((g) => {
            const isActive = activeGroup === g;
            return (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-hand transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-[#FFE45E] text-[#191712] border-2 border-[#191712] font-bold shadow-[2px_2px_0px_#191712]"
                    : "bg-[#FAF7EE] text-[#57534E] border border-[#191712]/20 hover:border-[#191712] hover:bg-[#FBF6E6]"
                }`}
              >
                <span className="text-base text-[#191712]">
                  {GROUP_ICONS[g] ?? <FaGlobe />}
                </span>
                <span>{g}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex-1 space-y-5">
          {/* Retro Notice Note (Replacing green banner) */}
          <div className="hand-dashed-box p-4 bg-[#FFFBEB] flex items-start gap-3">
            <span className="font-typewriter font-bold text-sm bg-[#FFE45E] border border-[#191712] px-2 py-0.5 text-[#191712] shrink-0">
              NOTE
            </span>
            <p className="font-hand text-sm text-[#292524] leading-relaxed">
              These fields reflect the <strong>exact visual copy</strong> on your live website. Modify any field and click <strong>Save All Changes</strong> to update live values across all pages.
            </p>
          </div>

          <div className="hand-box p-5 sm:p-7 bg-[#FFFFFF]">
            <h2 className="font-script font-bold text-2xl text-[#191712] mb-5 pb-3 border-b-2 border-[#191712] flex items-center justify-between">
              <span>{activeGroup}</span>
              <span className="font-typewriter text-xs text-[#78716C] font-normal">
                {groupItems.length} FIELDS
              </span>
            </h2>

            <div className="space-y-5">
              {groupItems.map((item) => (
                <div key={item.key}>
                  <label className="flex items-center gap-2 font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-2">
                    {getTypeIcon(item.type)}
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] lowercase tracking-normal text-[#78716C] font-normal">
                      ({item.key})
                    </span>
                  </label>
                  {item.type === "image" || item.key === "site.favicon" || item.key === "site.logo" ? (
                    <ImageUploader
                      label=""
                      value={item.value}
                      onChange={(url) => setValue(item.key, url)}
                      placeholder="/assets/... or https://..."
                      helperText={`Asset link for ${item.label}`}
                    />
                  ) : item.type === "textarea" ? (
                    <textarea
                      rows={item.key === "about.bio" || item.key === "hero.tagline" ? 4 : 2}
                      className="form-input w-full font-hand text-base"
                      value={item.value}
                      onChange={(e) => setValue(item.key, e.target.value)}
                      placeholder={`Enter ${item.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      className="form-input w-full font-hand text-base"
                      type={item.type === "url" ? "url" : "text"}
                      value={item.value}
                      onChange={(e) => setValue(item.key, e.target.value)}
                      placeholder={
                        item.type === "url"
                          ? "https://..."
                          : `Enter ${item.label.toLowerCase()}...`
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
