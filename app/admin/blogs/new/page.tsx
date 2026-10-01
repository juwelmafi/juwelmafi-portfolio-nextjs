"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Omit<Blog, "id">>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    category: "",
    coverImage: "",
    published: false,
  });

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create blog");

      await Swal.fire({
        title: "Post Created!",
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
        text: "Failed to create post.",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } finally {
      setSaving(false);
    }
  };

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
            ARTICLE ARCHIVE
          </span>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Write New Post
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Craft your essay or tutorial to publish on the retro blog registry.
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
              placeholder="Your awesome article title"
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm({ ...form, title, slug: autoSlug(title) });
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Slug *
              </label>
              <input
                required
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-mono text-sm text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                placeholder="your-article-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
              <p className="font-typewriter text-[11px] text-[#78716C] mt-1">
                URL: /blog/{form.slug || "your-slug"}
              </p>
            </div>

            <div>
              <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider mb-1.5 block">
                Category *
              </label>
              <select
                required
                className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2 font-hand text-base text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
                value={form.category}
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
              required
              rows={2}
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3.5 py-2.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full resize-none"
              placeholder="Short summary (shown in dossier cards)"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>

          <ImageUploader
            label="Article Cover Image"
            value={form.coverImage}
            onChange={(url) => setForm({ ...form, coverImage: url })}
            placeholder="https://... or upload file"
            helperText="Featured banner image for this article on the blog archive"
          />
        </div>

        {/* Tags */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Tags &amp; Indexing</h2>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => {
              const active = form.tags.includes(tag);
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

        {/* Content */}
        <div className="hand-box p-6 bg-[#FFFFFF] space-y-4">
          <h2 className="font-script font-bold text-2xl text-[#191712]">Article Body (Markdown)</h2>
          <textarea
            required
            rows={18}
            className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md p-4 font-mono text-sm text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
            placeholder={`# Introduction\n\nWrite your article here...\n\n## Section 1\n\nYour content...`}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <p className="font-typewriter text-xs text-[#78716C]">
            Use # for h1, ## for h2, ### for h3. Leave blank lines between paragraphs.
          </p>
        </div>

        {/* Publish toggle */}
        <div className="hand-box p-6 bg-[#FFFFFF] flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-5 h-5 accent-[#191712] rounded cursor-pointer"
          />
          <div>
            <label htmlFor="published" className="font-hand font-bold text-lg text-[#191712] cursor-pointer block">
              {form.published ? "Publish immediately" : "Save as Draft"}
            </label>
            <p className="font-hand text-xs text-[#78716C]">
              {form.published ? "Will appear publicly on your blog" : "Only visible in admin"}
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-hand-black py-2.5 px-6 font-hand text-lg cursor-pointer flex items-center gap-2">
            <FaSave /> {form.published ? "Publish Post" : "Save Draft"}
          </button>
          <Link href="/admin/blogs" className="btn-hand-white py-2.5 px-6 font-hand text-lg cursor-pointer flex items-center gap-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
