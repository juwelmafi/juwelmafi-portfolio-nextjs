"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);

  const fetchProjects = () =>
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: `"${title}" will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87171",
      cancelButtonColor: "#3A3D4D",
      confirmButtonText: "Yes, delete",
      background: "#12121E",
      color: "#F0F0F5",
    });
    if (!result.isConfirmed) return;

    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    Swal.fire({ title: "Deleted!", icon: "success", background: "#12121E", color: "#F0F0F5", confirmButtonColor: "#FDCB6E" });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-font text-3xl font-bold text-white">Projects</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary"><FaPlus /> Add Project</Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-4xl mb-3">📁</p>
          <h2 className="heading-font text-lg font-semibold text-white mb-2">No projects yet</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Add your first project to get started.</p>
          <Link href="/admin/projects/new" className="btn-primary"><FaPlus /> Add Project</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="heading-font font-semibold text-white truncate">{project.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech?.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>{t}</span>
                  ))}
                  {project.tech?.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: "var(--text-subtle)" }}>+{project.tech.length - 4} more</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }} title="View Live">
                    <FaExternalLinkAlt />
                  </a>
                )}
                <Link href={`/admin/projects/${project.id}/edit`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--border-accent)" }} title="Edit">
                  <FaEdit />
                </Link>
                <button onClick={() => handleDelete(project.id!, project.title)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }} title="Delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
