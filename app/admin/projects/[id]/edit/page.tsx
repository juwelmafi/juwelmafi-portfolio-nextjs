"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/types";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";

const TECH_OPTIONS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap",
  "CSS", "HTML", "Node.js", "Express", "MongoDB", "NextAuth", "Redux", "GraphQL"
];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Project>>({});

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => {
        if (data) setForm(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleTech = (tech: string) => {
    setForm((f) => ({
      ...f,
      tech: f.tech?.includes(tech) ? f.tech.filter((t) => t !== tech) : [...(f.tech ?? []), tech],
    }));
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
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#FDCB6E",
      });
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to update project.",
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
          href="/admin/projects"
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="heading-font text-2xl font-bold text-white">Edit Project</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{form.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Project Title *
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
            Short Description *
          </label>
          <textarea
            required
            rows={3}
            className="form-input"
            value={form.desc ?? ""}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-subtle)" }}>
            Tech Stack
          </label>
          <div className="flex flex-wrap gap-2">
            {TECH_OPTIONS.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
                style={{
                  background: form.tech?.includes(tech) ? "var(--accent)" : "var(--bg-elevated)",
                  color: form.tech?.includes(tech) ? "#0A0A14" : "var(--text-muted)",
                  borderColor: form.tech?.includes(tech) ? "var(--accent)" : "var(--border)",
                  fontWeight: form.tech?.includes(tech) ? 600 : 400,
                }}
              >
                {form.tech?.includes(tech) && <FaTimes className="inline mr-1 text-[9px]" />}
                {tech}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Mockup Image URL
            </label>
            <input
              className="form-input"
              value={form.img ?? ""}
              onChange={(e) => setForm({ ...form, img: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Screenshot URL
            </label>
            <input
              className="form-input"
              value={form.screenshot ?? ""}
              onChange={(e) => setForm({ ...form, screenshot: e.target.value })}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Live URL
            </label>
            <input
              className="form-input"
              value={form.live ?? ""}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Client Repo
            </label>
            <input
              className="form-input"
              value={form.client ?? ""}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Server Repo
            </label>
            <input
              className="form-input"
              value={form.server ?? ""}
              onChange={(e) => setForm({ ...form, server: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
            Full Details
          </label>
          <textarea
            rows={4}
            className="form-input"
            value={form.details ?? ""}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Challenge
            </label>
            <textarea
              rows={2}
              className="form-input"
              value={form.challenge ?? ""}
              onChange={(e) => setForm({ ...form, challenge: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Goal
            </label>
            <textarea
              rows={2}
              className="form-input"
              value={form.goal ?? ""}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
              Display Order
            </label>
            <input
              type="number"
              min={0}
              className="form-input"
              value={form.order ?? 0}
              onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.reverse ?? false}
                onChange={(e) => setForm({ ...form, reverse: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 rounded-full peer-checked:bg-[var(--accent)] bg-[var(--bg-elevated)] border border-[var(--border)] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
            </label>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Reverse Layout</span>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? (
              <><span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" /> Saving...</>
            ) : (
              <><FaSave /> Update Project</>
            )}
          </button>
          <Link href="/admin/projects" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
