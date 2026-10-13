"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "@/types";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import ImageUploader from "@/components/admin/ImageUploader";

const TAG_OPTIONS = [
  "React", "Next.js", "JavaScript", "TypeScript", "CSS", "Node.js",
  "MongoDB", "Web Dev", "Tips", "Self-Growth", "Career", "Physics"
];

const CATEGORY_OPTIONS = [
  "Tech", "Skill", "Personal Brand", "Self-Development", "Other"
];

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Blog>>({});

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => {
        if (data) setForm(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags?.includes(tag) ? f.tags.filter((t) => t !== tag) : [...(f.tags ?? []), tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update blog");

      await Swal.fire({
        title: "Post Updated!",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to update post.",
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
        <p className="font-typewriter text-xs text-[#78716C]">LOADING POST ARCHIVE...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b-2 border-[#191712] pb-4">
        <Link
          href="/admin/blogs"
          className="w-9 h-9 border-2 border-[#191712] rounded bg-[#FAF7EE] hover:bg-[#FFE45E] flex items-center justify-center text-[#191712] shadow-[2px_2px_0px_#191712] transition-colors"
          title="Back to Blogs"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <span className="font-typewriter text-xs text-[#C2410C] font-bold uppercase tracking-wider block">
            ARTICLE EDIT
          </span>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Edit Post
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5 truncate max-w-xl">
            {form.title}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Metadata */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-5">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Article Metadata</h2>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Title *
            </label>
            <input
              required
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Slug *
              </label>
              <input
                required
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-mono text-sm text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                value={form.slug ?? ""}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>

            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Category *
              </label>
              <select
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                value={form.category ?? ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Excerpt *
            </label>
            <textarea
              rows={2}
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
              value={form.excerpt ?? ""}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>

          <ImageUploader
            label="Article Cover Image"
            value={form.coverImage ?? ""}
            onChange={(url) => setForm({ ...form, coverImage: url })}
            altValue={form.coverImageAlt ?? ""}
            onAltChange={(alt) => setForm({ ...form, coverImageAlt: alt })}
            altLabel="Cover Image Alt Text (SEO)"
            altPlaceholder="e.g. Next.js 15 Full-Stack Tutorial Cover by Juwel Hossain Mafi"
            placeholder="https://... or upload file"
            helperText="Featured banner image for this article on the blog archive"
          />
        </div>

        {/* Tags */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Tags &amp; Indexing</h2>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => {
              const active = form.tags?.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full font-hand transition-all cursor-pointer ${
                    active
                      ? "bg-[#FFE45E] text-[#191712] font-bold border-2 border-[#191712] shadow-[1px_1px_0px_#191712]"
                      : "bg-[#FAF7EE] text-[#57534E] border border-[#191712] hover:bg-[#F5EED9]"
                  }`}
                >
                  {active && <FaTimes className="inline mr-1 text-[9px]" />}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* SEO & Google Search Optimization */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-5">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-script font-bold text-2xl text-[#191712]">SEO &amp; Google Search</h2>
            <span className="font-typewriter text-[10px] bg-[#D1FAE5] border border-[#191712] px-2 py-0.5 text-[#065F46] font-bold uppercase">Recommended</span>
          </div>
          <p className="font-hand text-sm text-[#78716C] -mt-2">Optimize how this article appears in Google search results, social media shares, and link previews.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Meta Title
              </label>
              <input
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                placeholder="Custom title for Google (60 chars ideal)"
                value={form.metaTitle ?? ""}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                maxLength={70}
              />
              <p className="font-typewriter text-[11px] text-[#78716C] mt-1">
                {(form.metaTitle?.length || 0)}/70 chars — Falls back to article title if empty
              </p>
            </div>
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Canonical URL
              </label>
              <input
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-mono text-sm text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                placeholder="https://juwelmafi.dev/blog/your-slug"
                value={form.canonicalUrl ?? ""}
                onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
              />
              <p className="font-typewriter text-[11px] text-[#78716C] mt-1">
                Auto-generated if empty — set only for cross-posted content
              </p>
            </div>
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Meta Description
            </label>
            <textarea
              rows={2}
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
              placeholder="Compelling description for Google search results (155 chars ideal)"
              value={form.metaDescription ?? ""}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              maxLength={160}
            />
            <p className="font-typewriter text-[11px] text-[#78716C] mt-1">
              {(form.metaDescription?.length || 0)}/160 chars — Falls back to excerpt if empty
            </p>
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
              Meta Keywords
            </label>
            <input
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
              placeholder="next.js, react, mern stack, web development (comma separated)"
              value={(form.metaKeywords ?? []).join(", ")}
              onChange={(e) => setForm({ ...form, metaKeywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean) })}
            />
            <p className="font-typewriter text-[11px] text-[#78716C] mt-1">
              Comma-separated keywords — Falls back to article tags if empty
            </p>
          </div>

          <div className="border-t border-dashed border-[#A8A29E] pt-4 mt-2">
            <span className="font-typewriter text-xs font-bold text-[#78716C] uppercase tracking-wider block mb-3">Open Graph (Social Sharing)</span>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                  OG Title
                </label>
                <input
                  className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                  placeholder="Custom title for Facebook / LinkedIn / Twitter"
                  value={form.ogTitle ?? ""}
                  onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
                />
              </div>
              <div>
                <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                  OG Description
                </label>
                <input
                  className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                  placeholder="Custom description for social media cards"
                  value={form.ogDescription ?? ""}
                  onChange={(e) => setForm({ ...form, ogDescription: e.target.value })}
                />
              </div>
            </div>
          </div>

          <ImageUploader
            label="OG Image (Social Media Preview)"
            value={form.ogImage ?? ""}
            onChange={(url) => setForm({ ...form, ogImage: url })}
            placeholder="https://... (1200x630px recommended)"
            helperText="Custom image for social media link previews. Falls back to cover image if empty."
          />
        </div>

        {/* Content */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Article Body (Markdown)</h2>
          <textarea
            required
            rows={18}
            className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md p-4 font-mono text-sm text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
            value={form.content ?? ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        {/* Publish toggle */}
        <div className="hand-box p-6 bg-[#FFFFFF] flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={form.published ?? false}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-5 h-5 accent-[#191712] rounded cursor-pointer"
          />
          <div>
            <label htmlFor="published" className="font-hand font-bold text-lg text-[#191712] cursor-pointer block">
              {form.published ? "Published (Live)" : "Draft (Unpublished)"}
            </label>
            <p className="font-hand text-xs text-[#78716C]">
              {form.published ? "Visible on your public portfolio blog" : "Hidden from public view"}
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-hand-black py-2.5 px-6 font-hand text-lg cursor-pointer flex items-center gap-2">
            <FaSave /> {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/blogs" className="btn-hand-white py-2.5 px-6 font-hand text-lg cursor-pointer flex items-center gap-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
