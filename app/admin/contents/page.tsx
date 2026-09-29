"use client";
import { useState, useEffect, useCallback } from "react";
import {
  FaSave, FaGlobe, FaUser, FaShareAlt, FaLink, FaImage, FaEdit
} from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import Swal from "sweetalert2";

interface ContentItem {
  id?: string;
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea" | "url" | "image";
  group: string;
}

// Default content structure — pre-filled with CURRENT live website values
const DEFAULT_CONTENT: Omit<ContentItem, "id">[] = [
  // Hero
  { key: "hero.name",      label: "Your Name",                  value: "Juwel Hossain",                                                                                              type: "text",     group: "Hero" },
  { key: "hero.title",     label: "Hero Title / Role",          value: "Self Learner & Full-Stack Developer",                                                                         type: "text",     group: "Hero" },
  { key: "hero.tagline",   label: "Hero Bio (below name)",      value: "Coding is my passion. I enjoy building beautiful, accessible, and scalable web experiences — one component at a time.", type: "textarea", group: "Hero" },
  { key: "hero.badge",     label: "Hero Badge Text",            value: "Available for Work",                                                                                          type: "text",     group: "Hero" },
  { key: "hero.cta",       label: "CTA Button Text",            value: "Let's Talk",                                                                                                 type: "text",     group: "Hero" },
  { key: "hero.resumeUrl", label: "Resume / CV Download URL",   value: "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing",                       type: "url",      group: "Hero" },
  { key: "hero.avatar",    label: "Avatar / Profile Image URL", value: "https://i.ibb.co/xKd3jY5K/20250629-181542.png",                                                              type: "image",    group: "Hero" },
  // About
  { key: "about.bio",       label: "About Bio",          value: "Coding is my passion. I enjoy building beautiful, accessible, and scalable web experiences — one component at a time.", type: "textarea", group: "About" },
  { key: "about.location",  label: "Location",           value: "Madaripur, Bangladesh",          type: "text", group: "About" },
  { key: "about.email",     label: "Contact Email",      value: "juwelhossain16457@gmail.com",    type: "text", group: "About" },
  { key: "about.phone",     label: "Phone / WhatsApp",   value: "+880 01859797307",               type: "text", group: "About" },
  // Social Links
  { key: "social.github",    label: "GitHub URL",      value: "https://github.com/juwelmafi",                 type: "url", group: "Social Links" },
  { key: "social.linkedin",  label: "LinkedIn URL",    value: "https://www.linkedin.com/in/juwelmafi",        type: "url", group: "Social Links" },
  { key: "social.youtube",   label: "YouTube URL",     value: "https://www.youtube.com/@juwelmafi",           type: "url", group: "Social Links" },
  { key: "social.twitter",   label: "Twitter / X URL", value: "",                                             type: "url", group: "Social Links" },
  { key: "social.facebook",  label: "Facebook URL",    value: "",                                             type: "url", group: "Social Links" },
  { key: "social.instagram", label: "Instagram URL",   value: "",                                             type: "url", group: "Social Links" },
  // Site Settings
  { key: "site.logo",      label: "Site Logo URL",             value: "/assets/images/logo/favicon.svg",                                                               type: "image", group: "Site Settings" },
  { key: "site.favicon",   label: "Favicon URL",               value: "/assets/images/logo/favicon.svg",                                                               type: "url",   group: "Site Settings" },
  { key: "site.resumeUrl", label: "Resume / CV URL (global)",  value: "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing",          type: "url",   group: "Site Settings" },
];

const GROUP_ICONS: Record<string, React.ReactNode> = {
  "Hero":          <FaUser />,
  "About":         <FaEdit />,
  "Social Links":  <FaShareAlt />,
  "Site Settings": <FaGlobe />,
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
      if (Array.isArray(data) && data.length > 0) {
        setItems(data);
      } else {
        // Seed defaults into UI (will be saved when user clicks Save)
        setItems(DEFAULT_CONTENT.map((d) => ({ ...d })));
      }
    } catch {
      setItems(DEFAULT_CONTENT.map((d) => ({ ...d })));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setValue = (key: string, value: string) => {
    setItems((prev) => prev.map((item) => item.key === key ? { ...item, value } : item));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Upsert all items
      for (const item of items) {
        await fetch("/api/site-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      await Swal.fire({
        title: "Content Saved!",
        text: "Website content has been updated successfully.",
        icon: "success",
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#00DE51",
      });
    } catch {
      Swal.fire({ title: "Error", text: "Failed to save content.", icon: "error", background: "#12121E", color: "#F0F0F5" });
    } finally {
      setSaving(false);
    }
  };

  const groups = Array.from(new Set(items.map((i) => i.group)));
  const groupItems = items.filter((i) => i.group === activeGroup);

  const getTypeIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "url":   return <FaLink className="text-[#00DE51] text-xs" />;
      case "image": return <FaImage className="text-[#00DE51] text-xs" />;
      default:      return <MdTextFields className="text-[#00DE51] text-xs" />;
    }
  };

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="w-8 h-8 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white leading-tight">
            Site Contents
          </h1>
          <p className="text-xs sm:text-sm mt-1 text-[#888899]">
            Manage dynamic website content — hero, about, social links and more.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? (
            <><span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" /> Saving...</>
          ) : (
            <><FaSave /> Save All Changes</>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Group Sidebar */}
        <nav className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap lg:w-52 xl:w-60 flex-shrink-0">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left"
              style={{
                background: activeGroup === g ? "var(--accent)" : "rgba(255,255,255,0.04)",
                color: activeGroup === g ? "#0A0A14" : "var(--text-muted)",
              }}
            >
              <span className="text-base">{GROUP_ICONS[g] ?? <FaGlobe />}</span>
              {g}
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-4">
          {/* Info banner */}
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl text-xs leading-relaxed"
            style={{ background: "rgba(0,222,81,0.08)", border: "1px solid rgba(0,222,81,0.2)" }}
          >
            <span className="text-[#00DE51] mt-0.5 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            </span>
            <span style={{ color: "var(--text-muted)" }}>
              These fields show the <strong className="text-white">current live values</strong> on your website. Edit any field and click <strong className="text-white">Save All Changes</strong> to update the content in the database.
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 sm:p-6">
            <h2 className="heading-font text-base font-semibold text-white mb-5 pb-3 border-b border-white/10">
              {activeGroup}
            </h2>
            <div className="space-y-5">
              {groupItems.map((item) => (
                <div key={item.key}>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                    {getTypeIcon(item.type)}
                    {item.label}
                    <span className="text-[10px] font-normal normal-case tracking-normal opacity-40 ml-1">
                      ({item.key})
                    </span>
                  </label>
                  {item.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className="form-input"
                      value={item.value}
                      onChange={(e) => setValue(item.key, e.target.value)}
                      placeholder={`Enter ${item.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      className="form-input"
                      type={item.type === "url" || item.type === "image" ? "url" : "text"}
                      value={item.value}
                      onChange={(e) => setValue(item.key, e.target.value)}
                      placeholder={
                        item.type === "url" || item.type === "image"
                          ? "https://..."
                          : `Enter ${item.label.toLowerCase()}...`
                      }
                    />
                  )}
                  {item.type === "image" && item.value && (
                    <div className="mt-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.value}
                        alt="preview"
                        className="h-16 w-16 object-cover rounded-xl border border-white/10"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
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
