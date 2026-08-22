"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Blog } from "@/types";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";

const TAG_OPTIONS = [
  "React", "Next.js", "JavaScript", "TypeScript", "CSS", "Node.js",
  "MongoDB", "Web Dev", "Tips", "Self-Growth", "Career", "Physics"
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
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#FDCB6E",
      });
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to create post.",
        icon: "error",
        background: "#12121E",
        color: "#F0F0F5",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/blogs"
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="heading-font text-2xl font-bold text-white">Write New Post</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Craft your article below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Title *
          </label>
          <input
            required
            className="form-input"
            placeholder="Your awesome article title"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;
              setForm({ ...form, title, slug: autoSlug(title) });
            }}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Slug *
          </label>
          <input
            required
            className="form-input mono-font text-sm"
            placeholder="your-article-slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
            URL: /blog/{form.slug || "your-slug"}
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Excerpt *
          </label>
          <textarea
            required
            rows={2}
            className="form-input"
            placeholder="Short summary (shown in cards)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Cover Image URL
          </label>
          <input
            className="form-input"
            placeholder="https://..."
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-subtle)" }}>
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
                style={{
                  background: form.tags.includes(tag) ? "var(--accent)" : "var(--bg-elevated)",
                  color: form.tags.includes(tag) ? "#0A0A14" : "var(--text-muted)",
                  borderColor: form.tags.includes(tag) ? "var(--accent)" : "var(--border)",
                  fontWeight: form.tags.includes(tag) ? 600 : 400,
                }}
              >
                {form.tags.includes(tag) && <FaTimes className="inline mr-1 text-[9px]" />}
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Content * (supports # headings and plain text)
          </label>
          <textarea
            required
            rows={18}
            className="form-input mono-font text-sm"
            placeholder={`# Introduction\n\nWrite your article here...\n\n## Section 1\n\nYour content...`}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
            Use # for h1, ## for h2, ### for h3. Leave blank lines between paragraphs.
          </p>
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 rounded-full peer-checked:bg-[var(--accent)] bg-[var(--bg-elevated)] border border-[var(--border)] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
          </label>
          <div>
            <span className="text-sm font-medium text-white">
              {form.published ? "Publish immediately" : "Save as Draft"}
            </span>
            <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
              {form.published ? "Will appear publicly on your blog" : "Only visible in admin"}
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? (
              <><span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" /> Saving...</>
            ) : (
              <><FaSave /> {form.published ? "Publish Post" : "Save Draft"}</>
            )}
          </button>
          <Link href="/admin/blogs" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
