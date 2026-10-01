"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";

const CATEGORY_PRESETS = [
  "FULL-STACK",
  "SHOPIFY",
  "LANDING PAGE",
  "UI/UX DESIGN",
  "WORDPRESS",
  "API & BACKEND",
  "SPEED & SEO",
  "CUSTOM",
];

const RIBBON_PRESETS = [
  "",
  "Most requested",
  "Popular",
  "Best value",
  "High demand",
];

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    kicker: "FULL-STACK",
    desc: "",
    deliverables: "",
    ribbon: "",
    order: 0,
    published: true,
  });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/services/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Service not found");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setForm({
            title: data.title || "",
            kicker: data.kicker || "FULL-STACK",
            desc: data.desc || "",
            deliverables:
              data.deliverables ||
              (data.features && data.features.length > 0
                ? data.features.slice(0, 3).join(" · ")
                : ""),
            ribbon: data.ribbon || "",
            order: data.order || 0,
            published: data.published ?? true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Could not load service details",
          icon: "error",
          background: "#FAF6EC",
          color: "#191712",
          confirmButtonColor: "#191712",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      Swal.fire({
        title: "Validation Error",
        text: "Please provide a Service Name (e.g. MERN Website, Shopify Store).",
        icon: "warning",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to update service");
      }

      await Swal.fire({
        title: "Service Updated!",
        text: "Your changes have been saved to the database.",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err?.message || "Failed to update service",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Delete Service?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#FAF6EC",
      color: "#191712",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#191712",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      await Swal.fire({
        title: "Deleted!",
        text: "Service has been removed.",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
      });
      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err?.message || "Failed to delete service",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
      });
    }
  };

  if (loading) {
    return (
      <div className="hand-box p-12 text-center bg-white">
        <p className="font-typewriter text-sm font-bold text-[#191712] uppercase tracking-wider animate-pulse">
          Loading Service Dossier...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#191712] pb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="w-9 h-9 border-2 border-[#191712] rounded bg-[#FAF7EE] hover:bg-[#FFE45E] flex items-center justify-center text-[#191712] shadow-[2px_2px_0px_#191712] transition-colors"
            title="Back to Services"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <span className="font-typewriter text-xs text-[#C2410C] font-bold uppercase tracking-wider block">
              SERVICE DOSSIER LEDGER
            </span>
            <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
              Edit Service
            </h1>
            <p className="font-hand text-base text-[#57534E] mt-0.5">
              Update minimal card info for this service on the live website.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="btn-outline text-xs px-3.5 py-2 text-[#DC2626] border-[#DC2626] hover:bg-[#FEE2E2] flex items-center gap-1.5"
        >
          <FaTrash /> Delete Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form (7 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="hand-box p-6 bg-[#FFFFFF] space-y-5">
            <h2 className="font-script font-bold text-2xl text-[#191712]">
              Service Information
            </h2>

            {/* Service Name */}
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Service Name * (Card Main Heading)
              </label>
              <input
                required
                type="text"
                placeholder="e.g. MERN Website, Shopify Website, Graphic Design, Landing Page"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-lg text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
              />
              <p className="font-hand text-xs text-[#78716C] mt-1">
                This is displayed in bold text replacing the old price tag.
              </p>
            </div>

            {/* Category / Kicker */}
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Category / Top Kicker Tag
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {CATEGORY_PRESETS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, kicker: cat })}
                    className={`text-xs px-2.5 py-1 rounded font-typewriter uppercase transition-all ${
                      form.kicker === cat
                        ? "bg-[#FFE45E] text-[#191712] font-bold border border-[#191712] shadow-[1px_1px_0px_#191712]"
                        : "bg-[#FAF7EE] text-[#57534E] border border-[#191712]/40 hover:bg-[#F5EED9]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="e.g. FULL-STACK, SHOPIFY & ECOMMERCE, LANDING PAGE"
                value={form.kicker}
                onChange={(e) => setForm({ ...form, kicker: e.target.value.toUpperCase() })}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-typewriter text-xs uppercase tracking-wider text-[#C2410C] font-bold placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Short Description *
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Custom full-stack web applications with Next.js, Node & MongoDB. Fast, responsive, and scalable."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
              />
            </div>

            {/* Extra Info / Key Deliverables */}
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Key Deliverables / Extra Info
              </label>
              <input
                type="text"
                placeholder="e.g. Clean Architecture · REST APIs · Responsive Design · SEO Ready"
                value={form.deliverables}
                onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
              />
              <p className="font-hand text-xs text-[#78716C] mt-1">
                Displayed in the bottom box of the card (e.g. Certificate reads / Included).
              </p>
            </div>

            {/* Ribbon Badge (Optional) */}
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Floating Ribbon Badge (Optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {RIBBON_PRESETS.map((r) => (
                  <button
                    key={r || "none"}
                    type="button"
                    onClick={() => setForm({ ...form, ribbon: r })}
                    className={`text-xs px-3 py-1 rounded font-hand transition-all ${
                      form.ribbon === r
                        ? "bg-[#FFE45E] text-[#191712] font-bold border border-[#191712] shadow-[1px_1px_0px_#191712]"
                        : "bg-[#FAF7EE] text-[#57534E] border border-[#191712]/40 hover:bg-[#F5EED9]"
                    }`}
                  >
                    {r ? `★ ${r}` : "(None)"}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="e.g. Most requested, Popular, Best value, or leave empty"
                value={form.ribbon}
                onChange={(e) => setForm({ ...form, ribbon: e.target.value })}
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-sm text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
              />
            </div>

            {/* Display Order & Published */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#191712]/15">
              <div>
                <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-5 h-5 accent-[#191712] cursor-pointer"
                />
                <label
                  htmlFor="published"
                  className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider cursor-pointer"
                >
                  Published on Site
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/services"
              className="btn-outline px-5 py-2.5 text-sm font-bold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-6 py-2.5 text-sm font-bold flex items-center gap-2"
            >
              <FaSave /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Live Card Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-typewriter text-xs uppercase font-bold text-[#191712] tracking-wider">
              Live Card Preview
            </span>
            <span className="font-typewriter text-[11px] text-[#78716C]">
              Links to /contact
            </span>
          </div>

          <div className="p-4 bg-[#FAF7EE] border-2 border-[#191712] rounded-lg">
            <div className="price price-popular relative shadow-[4px_5px_0px_#191712] bg-white border-2 border-[#191712] p-6 rounded-lg">
              {form.ribbon && (
                <span className="ribbon">
                  {form.ribbon}
                </span>
              )}

              <div>
                <span className="price-name text-[#C2410C]">
                  {form.kicker || "SERVICE"}
                </span>
                <strong className="price-tag text-3xl sm:text-4xl text-[#191712] block my-2">
                  {form.title || "Service Name"}
                </strong>
                <small className="text-[#57534E] text-sm block">
                  {form.desc || "Short description will appear here describing the scope and technology."}
                </small>
              </div>

              <div className="price-title border-t border-dashed border-[#191712]/30 pt-3 mt-4 text-xs text-[#78716C]">
                Deliverables &amp; Details:
                <b className="block text-[#191712] font-bold text-sm mt-0.5">
                  {form.deliverables || "Clean Architecture · High Performance"}
                </b>
              </div>

              <div className="mt-4 pt-3 border-t border-[#191712]/15 flex items-center justify-between text-xs font-hand text-[#C2410C] font-bold">
                <span>Click card to inquire</span>
                <span>→ /contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
