"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";

const COMMON_TAGS = [
  "Next.js & React",
  "Node.js & Express",
  "MongoDB Integration",
  "REST & GraphQL APIs",
  "TailwindCSS",
  "Framer Motion",
  "UI/UX Design",
  "Performance Tuning",
  "NextAuth & JWT",
  "Vercel Cloud Hosting",
  "Stripe Integration",
];

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [form, setForm] = useState({
    title: "",
    desc: "",
    tags: [] as string[],
    img1: "",
    img2: "",
    features: [] as string[],
    order: 0,
    published: true,
  });

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setForm({
          title: data.title || "",
          desc: data.desc || "",
          tags: Array.isArray(data.tags) ? data.tags : [],
          img1: data.img1 || "",
          img2: data.img2 || "",
          features: Array.isArray(data.features) ? data.features : [],
          order: typeof data.order === "number" ? data.order : 0,
          published: data.published !== false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Could not fetch service details",
          icon: "error",
          background: "#12121E",
          color: "#F0F0F5",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm((f) => ({
      ...f,
      features: [...f.features, featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    setForm((f) => ({
      ...f,
      features: f.features.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.desc) {
      Swal.fire({
        title: "Validation Error",
        text: "Please provide a title and description for the service.",
        icon: "warning",
        background: "#12121E",
        color: "#F0F0F5",
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
        icon: "success",
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#00DE51",
      });
      router.push("/admin/services");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to update service",
        icon: "error",
        background: "#12121E",
        color: "#F0F0F5",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="flex items-center gap-4 pb-3 border-none">
        <Link
          href="/admin/services"
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 text-[#8E95B3] hover:text-white hover:bg-white/10 transition shadow-sm"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white leading-tight">Edit Service</h1>
          <p className="text-xs sm:text-sm mt-0.5 text-[#888899]">
            Update service offerings and scope of work
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 space-y-5">
          <h2 className="heading-font text-[18px] lg:text-[20px] font-semibold text-white">Basic Information</h2>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Service Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Full-Stack Web Development"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#12121e] text-white text-sm px-4 py-3 rounded-xl border-none focus:ring-1 focus:ring-[#00DE51]/70 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Detailed description of what this service delivers..."
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="w-full bg-[#12121e] text-white text-sm p-4 rounded-xl border-none focus:ring-1 focus:ring-[#00DE51]/70 outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Deliverables / Features Checklist */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="heading-font text-base font-semibold text-white">Key Deliverables &amp; Scope</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Role-Based Authentication & Authorization"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
              className="flex-1 bg-[#12121e] text-white text-sm px-4 py-2.5 rounded-xl border-none focus:ring-1 focus:ring-[#00DE51]/70 outline-none"
            />
            <button
              type="button"
              onClick={addFeature}
              className="btn-primary text-xs px-4 py-2"
            >
              <FaPlus /> Add
            </button>
          </div>

          {form.features.length > 0 && (
            <div className="space-y-2 pt-2">
              {form.features.map((feat, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border-none text-xs text-white shadow-sm">
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="heading-font text-base font-semibold text-white">Technology Tags</h2>
          <div className="flex flex-wrap gap-2">
            {COMMON_TAGS.map((tag) => {
              const active = form.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    active
                      ? "bg-[#00DE51] text-black font-bold shadow-md shadow-[#00DE51]/20 border-none"
                      : "bg-[#181a2e] text-white/70 hover:bg-[#20233b] border-none shadow-sm"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media & Order */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="heading-font text-base font-semibold text-white">Media &amp; Display Order</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Primary Image URL
              </label>
              <input
                type="text"
                placeholder="/assets/images/section/service-1.jpg"
                value={form.img1}
                onChange={(e) => setForm({ ...form, img1: e.target.value })}
                className="w-full bg-[#12121e] text-white text-sm px-4 py-2.5 rounded-xl border-none focus:ring-1 focus:ring-[#00DE51]/70 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Secondary Image URL
              </label>
              <input
                type="text"
                placeholder="/assets/images/section/service-2.jpg"
                value={form.img2}
                onChange={(e) => setForm({ ...form, img2: e.target.value })}
                className="w-full bg-[#12121e] text-white text-sm px-4 py-2.5 rounded-xl border-none focus:ring-1 focus:ring-[#00DE51]/70 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full bg-[#12121e] text-white text-sm px-4 py-2.5 rounded-xl border-none focus:ring-1 focus:ring-[#00DE51]/70 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 accent-[#00DE51] rounded"
              />
              <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer">
                Published
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            <FaSave /> {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/services" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
