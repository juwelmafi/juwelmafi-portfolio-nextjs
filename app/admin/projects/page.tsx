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
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#78716C",
      confirmButtonText: "Yes, delete",
      background: "#FAF6EC",
      color: "#191712",
    });
    if (!result.isConfirmed) return;

    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    Swal.fire({
      title: "Deleted!",
      icon: "success",
      background: "#FAF6EC",
      color: "#191712",
      confirmButtonColor: "#191712",
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b-2 border-[#191712]">
        <div>
          <p className="retro-eyebrow !mb-1">ENGINEERING PORTFOLIO</p>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Production <span className="marked">Projects</span>
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Manage your portfolio projects, tech stacks &amp; live deployments
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary self-start sm:self-auto">
          <FaPlus /> Add Project
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="font-typewriter text-xs text-[#78716C]">LOADING PROJECTS...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 hand-box bg-[#FFFFFF]">
          <p className="text-4xl mb-3">📁</p>
          <h2 className="font-script font-bold text-2xl text-[#191712] mb-1">No projects yet</h2>
          <p className="font-hand text-base mb-6 text-[#57534E]">Add your first project to get started.</p>
          <Link href="/admin/projects/new" className="btn-primary">
            <FaPlus /> Add Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="hand-box p-5 bg-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-typewriter text-[11px] font-bold text-[#C2410C]">
                    PROJECT DOSSIER
                  </span>
                  {project.category && (
                    <span className="font-typewriter text-[10px] uppercase px-2 py-0.5 rounded border border-[#191712] bg-[#FFE45E] text-[#191712] font-bold">
                      {project.category}
                    </span>
                  )}
                </div>
                <h3 className="font-script font-bold text-2xl text-[#191712] truncate">
                  {project.title}
                </h3>
                <p className="font-hand text-sm text-[#57534E] line-clamp-1 mt-0.5">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {project.tech?.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="font-typewriter text-[11px] px-2.5 py-0.5 rounded border border-[#191712] bg-[#FAF7EE] text-[#191712]"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech && project.tech.length > 5 && (
                    <span className="font-typewriter text-[11px] px-2 py-0.5 text-[#78716C]">
                      +{project.tech.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0 self-end sm:self-center">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712]"
                    title="View Live"
                  >
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712]"
                  title="Edit"
                >
                  <FaEdit size={13} />
                </Link>
                <button
                  onClick={() => handleDelete(project.id!, project.title)}
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] flex items-center justify-center transition shadow-[2px_2px_0px_#191712] cursor-pointer"
                  title="Delete"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
