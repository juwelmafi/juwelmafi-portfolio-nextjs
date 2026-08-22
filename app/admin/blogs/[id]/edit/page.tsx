"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "@/types";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";

const TAG_OPTIONS = [
  "React", "Next.js", "JavaScript", "TypeScript", "CSS", "Node.js",
  "MongoDB", "Web Dev", "Tips", "Self-Growth", "Career", "Physics"
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
        text: "Failed to update post.",
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
      <div className="p-8 flex justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          <h1 className="heading-font text-2xl font-bold text-white">Edit Post</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{form.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Title *
          </label>
          <input
            required
            className="form-input"
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Slug *
          </label>
          <input
            required
            className="form-input mono-font text-sm"
            value={form.slug ?? ""}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Excerpt *
          </label>
          <textarea
            required
            rows={2}
            className="form-input"
            value={form.excerpt ?? ""}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Cover Image URL
          </label>
          <input
            className="form-input"
            value={form.coverImage ?? ""}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />
        </div>
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
                  background: form.tags?.includes(tag) ? "var(--accent)" : "var(--bg-elevated)",
                  color: form.tags?.includes(tag) ? "#0A0A14" : "var(--text-muted)",
                  borderColor: form.tags?.includes(tag) ? "var(--accent)" : "var(--border)",
                  fontWeight: form.tags?.includes(tag) ? 600 : 400,
                }}
              >
                {form.tags?.includes(tag) && <FaTimes className="inline mr-1 text-[9px]" />}
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Content *
          </label>
          <textarea
            required
            rows={18}
            className="form-input mono-font text-sm"
            value={form.content ?? ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.published ?? false}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 rounded-full peer-checked:bg-[var(--accent)] bg-[var(--bg-elevated)] border border-[var(--border)] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
          </label>
          <span className="text-sm font-medium text-white">
            {form.published ? "Published" : "Draft"}
          </span>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? (
              <><span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" /> Saving...</>
            ) : (
              <><FaSave /> Update Post</>
            )}
          </button>
          <Link href="/admin/blogs" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
