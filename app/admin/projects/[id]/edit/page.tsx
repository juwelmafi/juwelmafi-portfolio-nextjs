"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/types";
import { FaArrowLeft, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import ImageUploader from "@/components/admin/ImageUploader";

const CATEGORY_OPTIONS = [
  "MERN",
  "Shopify",
  "WordPress",
  "Designs",
  "Landing Page",
  "Other",
];

const TECH_OPTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Shopify",
  "Liquid",
  "WordPress",
  "WooCommerce",
  "CMS",
  "Headless CMS",
  "Wix",
  "Tailwind CSS",
  "Bootstrap",
  "CSS",
  "HTML",
  "Figma",
  "UI/UX Design",
  "Landing Page",
  "NextAuth",
  "Redux",
  "GraphQL",
  "Firebase",
  "Stripe",
  "Prisma",
  "PostgreSQL",
  "Docker",
];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customTech, setCustomTech] = useState("");
  const [form, setForm] = useState<Partial<Project>>({
    category: "MERN",
    tech: [],
  });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => {
        if (data) {
          let cat = data.category;
          if (!cat || cat === "undefined") {
            const techList = Array.isArray(data.tech) ? data.tech.map((t: string) => t.toLowerCase()) : [];
            if (techList.includes("shopify")) cat = "Shopify";
            else if (techList.includes("wordpress") || techList.includes("woocommerce")) cat = "WordPress";
            else if (techList.includes("landing page") || techList.includes("landing")) cat = "Landing Page";
            else if (techList.includes("figma") || techList.includes("designs") || techList.includes("ui/ux design")) cat = "Designs";
            else cat = "MERN";
          }

          setForm({
            ...data,
            category: cat,
            tech: data.tech || [],
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleTech = (tech: string) => {
    setForm((f) => {
      const willInclude = !f.tech?.includes(tech);
      const newTech = willInclude ? [...(f.tech ?? []), tech] : (f.tech ?? []).filter((t) => t !== tech);

      let newCategory = f.category;
      if (willInclude) {
        if (/shopify/i.test(tech)) newCategory = "Shopify";
        else if (/wordpress|woocommerce/i.test(tech)) newCategory = "WordPress";
        else if (/landing/i.test(tech)) newCategory = "Landing Page";
        else if (/figma|ui\/ux|design/i.test(tech)) newCategory = "Designs";
      }

      return {
        ...f,
        tech: newTech,
        category: newCategory,
      };
    });
  };

  const addCustomTech = () => {
    const trimmed = customTech.trim();
    if (!trimmed) return;
    const current = form.tech || [];
    if (!current.includes(trimmed)) {
      setForm((f) => ({ ...f, tech: [...current, trimmed] }));
    }
    setCustomTech("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      await Swal.fire({
        title: "Project Updated!",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to update project.",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin" />
        <p className="font-typewriter text-xs text-[#78716C]">LOADING PROJECT DOSSIER...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b-2 border-[#191712] pb-4">
        <Link
          href="/admin/projects"
          className="w-9 h-9 border-2 border-[#191712] rounded bg-[#FAF7EE] hover:bg-[#FFE45E] flex items-center justify-center text-[#191712] shadow-[2px_2px_0px_#191712] transition-colors"
          title="Back to Projects"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <span className="font-typewriter text-xs text-[#C2410C] font-bold uppercase tracking-wider block">
            PROJECT DOSSIER EDIT
          </span>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Edit Project
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5 truncate max-w-xl">
            {form.title}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Info */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-5">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Project Overview</h2>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Project Title *
            </label>
            <input
              required
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Category Filter Selector */}
          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Project Category (Tab Filter) *
            </label>
            <p className="font-hand text-sm text-[#78716C] mb-2">
              Select which tab this project will be cataloged under on the website:
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = form.category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-hand transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FFE45E] text-[#191712] font-bold border-2 border-[#191712] shadow-[2px_2px_0px_#191712] scale-105"
                        : "bg-[#FAF7EE] text-[#57534E] border border-[#191712] hover:bg-[#F5EED9]"
                    }`}
                  >
                    {isSelected && "✓ "}
                    {cat}
                  </button>
                );
              })}
            </div>
            <select
              required
              value={form.category || "MERN"}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Short Description *
            </label>
            <textarea
              required
              rows={3}
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
              value={form.desc ?? ""}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#191712]/15 pb-2">
            <div>
              <h2 className="font-script font-bold text-2xl text-[#191712]">Technology Stack</h2>
              <p className="font-hand text-xs text-[#78716C]">
                Click pills to toggle, or type any custom technology below.
              </p>
            </div>
            {form.tech && form.tech.length > 0 && (
              <span className="font-typewriter text-xs text-[#C2410C] font-bold">
                {form.tech.length} SELECTED
              </span>
            )}
          </div>

          {/* Quick Select Pills */}
          <div className="flex flex-wrap gap-2">
            {TECH_OPTIONS.map((tech) => {
              const active = form.tech?.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`text-xs px-3 py-1.5 rounded-full font-hand transition-all cursor-pointer ${
                    active
                      ? "bg-[#FFE45E] text-[#191712] font-bold border-2 border-[#191712] shadow-[1px_1px_0px_#191712]"
                      : "bg-[#FAF7EE] text-[#57534E] border border-[#191712] hover:bg-[#F5EED9]"
                  }`}
                >
                  {active && <FaTimes className="inline mr-1 text-[9px]" />}
                  {tech}
                </button>
              );
            })}
          </div>

          {/* Custom Tech Pill Input */}
          <div className="pt-2 border-t border-[#191712]/15 flex gap-2">
            <input
              type="text"
              placeholder="Add other tech (e.g. CMS, Wix, Liquid, Prisma)..."
              value={customTech}
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomTech();
                }
              }}
              className="flex-1 bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-1.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E]"
            />
            <button
              type="button"
              onClick={addCustomTech}
              className="btn-small text-xs py-1.5 px-4 cursor-pointer"
            >
              <FaPlus className="mr-1" /> Add Pill
            </button>
          </div>
        </div>

        {/* Media */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Media &amp; Screenshots</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <ImageUploader
              label="Mockup Image (Main)"
              value={form.img ?? ""}
              onChange={(url) => setForm({ ...form, img: url })}
              placeholder="https://... or upload file"
              helperText="Main showcase preview displayed in project cards and ledger"
            />
            <ImageUploader
              label="Screenshot (In-Depth)"
              value={form.screenshot ?? ""}
              onChange={(url) => setForm({ ...form, screenshot: url })}
              placeholder="https://... or upload file"
              helperText="Full page screenshot or secondary preview"
            />
          </div>
        </div>

        {/* Links */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Deployment &amp; Repositories</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Live URL
              </label>
              <input
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                value={form.live ?? ""}
                onChange={(e) => setForm({ ...form, live: e.target.value })}
              />
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Client Repo
              </label>
              <input
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                value={form.client ?? ""}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
              />
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Server Repo
              </label>
              <input
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                value={form.server ?? ""}
                onChange={(e) => setForm({ ...form, server: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Details, Challenge & Goal */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <h2 className="font-script font-bold text-2xl text-[#191712]">In-Depth Dossier</h2>
          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Full Details
            </label>
            <textarea
              rows={4}
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
              value={form.details ?? ""}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Challenge
              </label>
              <textarea
                rows={2}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
                value={form.challenge ?? ""}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
              />
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Goal
              </label>
              <textarea
                rows={2}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
                value={form.goal ?? ""}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Display Order
              </label>
              <input
                type="number"
                min={0}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                value={form.order ?? 0}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="reverse"
                checked={form.reverse ?? false}
                onChange={(e) => setForm({ ...form, reverse: e.target.checked })}
                className="w-4 h-4 accent-[#191712] rounded cursor-pointer"
              />
              <label htmlFor="reverse" className="font-hand text-lg text-[#191712] cursor-pointer">
                Reverse Layout in Showcase
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-hand-black py-2.5 px-6 font-hand text-lg cursor-pointer flex items-center gap-2">
            <FaSave /> {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/projects" className="btn-hand-white py-2.5 px-6 font-hand text-lg cursor-pointer flex items-center gap-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
