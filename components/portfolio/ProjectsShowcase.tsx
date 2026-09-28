"use client";

import { useState, useMemo } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaSearch,
  FaInfoCircle,
  FaTimes,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";
import { Project } from "@/types";

interface ProjectsShowcaseProps {
  initialProjects: Project[];
}

export default function ProjectsShowcase({ initialProjects }: ProjectsShowcaseProps) {
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Extract all unique tech tags from projects
  const availableTechs = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      (p.tech || []).forEach((t) => set.add(t));
    });
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  // Filter projects by search query and tech tag
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesTech =
        selectedTech === "All" ||
        (p.tech && p.tech.some((t) => t.toLowerCase() === selectedTech.toLowerCase()));

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query) ||
        (p.details && p.details.toLowerCase().includes(query)) ||
        (p.tech && p.tech.some((t) => t.toLowerCase().includes(query)));

      return matchesTech && matchesQuery;
    });
  }, [initialProjects, selectedTech, searchQuery]);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-10 space-y-5">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, technology, or keywords..."
            className="w-full bg-[#12121e]/90 text-white placeholder-white/40 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl border border-white/10 focus:border-[#00DE51] focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Tech Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {availableTechs.map((tech) => {
            const isSelected = selectedTech.toLowerCase() === tech.toLowerCase();
            return (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`tech-filter-pill text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#00DE51] !text-black font-extrabold shadow-md shadow-[#00DE51]/25 scale-105"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {tech}
                {tech === "All" && ` (${initialProjects.length})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-white/50 mb-6 px-1">
        <span>
          Showing <span className="text-[#00DE51] font-semibold">{filteredProjects.length}</span> of{" "}
          {initialProjects.length} projects
        </span>
        {(selectedTech !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedTech("All");
              setSearchQuery("");
            }}
            className="text-xs text-[#00DE51] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Projects Grid (2-Column on Tablet/Desktop, 1-Column on Mobile) */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="heading-font text-lg font-bold text-white mb-1">No projects matched</h3>
          <p className="text-xs text-white/60 mb-5">
            Try adjusting your search terms or clearing selected filter pills.
          </p>
          <button
            onClick={() => {
              setSelectedTech("All");
              setSearchQuery("");
            }}
            className="btn-primary text-xs px-5 py-2 rounded-xl"
          >
            View All Projects
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const totalStr = String(filteredProjects.length).padStart(2, "0");
            const imgUrl =
              project.img ||
              project.screenshot ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";
            const role =
              (project as { role?: string }).role ||
              (project.tech?.includes("Next.js") ? "Full-Stack Lead" : "Full-Stack Developer");
            const year =
              (project as { year?: string }).year ||
              (project.createdAt ? new Date(project.createdAt).getFullYear().toString() : "2024");

            return (
              <div
                key={project.id || idx}
                className="water-drop-card juwel-project-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Project Image with subtle gradient overlay */}
                  <div className="rounded-xl overflow-hidden mb-3 aspect-video bg-black/40 relative shadow-md">
                    <img
                      alt={project.title}
                      loading="lazy"
                      width={600}
                      height={340}
                      src={imgUrl}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white/80 font-mono text-[9.5px] font-semibold border border-white/10">
                      <span className="text-[#00DE51] font-bold">{num}</span>/{totalStr}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="mb-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-bold text-sm sm:text-[14px] leading-snug group-hover:text-[#00DE51] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-white/50 mt-1">
                      <span className="text-white/70 font-medium">{role}</span>
                      <span className="font-mono text-white/60 font-semibold">{year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-[11px] leading-relaxed mb-3 line-clamp-3">
                    {project.desc || project.details}
                  </p>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {(project.tech || []).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="tech-pill text-[9.5px] sm:text-[10px] font-medium text-white/80 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-white/10 mt-auto flex flex-col gap-2">
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        style={{ color: "#000" }}
                        className={`btn-proj-action bg-[#00DE51] hover:bg-[#33FF77] !text-black font-extrabold text-[10.5px] sm:text-xs rounded-xl shadow-md shadow-[#00DE51]/20 active:scale-[0.98] transition-all ${
                          project.server ? "col-span-2 sm:col-span-1 sm:flex-1" : "col-span-1 sm:flex-1"
                        }`}
                      >
                        <FaExternalLinkAlt className="w-2.5 h-2.5 shrink-0 text-black" />
                        <span className="!text-black font-extrabold">Demo</span>
                      </a>
                    )}

                    {project.client && (
                      <a
                        href={project.client}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={project.server ? "Client Code" : "Source Code"}
                        className="btn-proj-action col-span-1 sm:flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold text-[10.5px] sm:text-xs rounded-xl border border-white/10 active:scale-[0.98] transition-all"
                      >
                        <FaGithub className="w-3.5 h-3.5 shrink-0 text-white/90" />
                        <span>{project.server ? "Client" : "Code"}</span>
                      </a>
                    )}

                    {project.server && (
                      <a
                        href={project.server}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Server Code"
                        className="btn-proj-action col-span-1 sm:flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold text-[10.5px] sm:text-xs rounded-xl border border-white/10 active:scale-[0.98] transition-all"
                      >
                        <FaGithub className="w-3.5 h-3.5 shrink-0 text-white/90" />
                        <span>Server</span>
                      </a>
                    )}
                  </div>

                  {/* Case Study Details Trigger Button */}
                  {(project.details || project.challenge || project.goal) && (
                    <button
                      onClick={() => setActiveProject(project)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10.5px] font-medium text-white/60 hover:text-[#00DE51] hover:bg-white/5 transition-colors border border-dashed border-white/10"
                    >
                      <FaInfoCircle className="text-[10px]" />
                      <span>View Project Details &amp; Architecture</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Case Study / Details Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="water-drop-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-[#0D0D18] border border-white/20 rounded-3xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="text-xs" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-black bg-[#00DE51] inline-block mb-2">
                Project Overview
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{activeProject.title}</h2>
              <p className="text-xs text-white/50 mt-1">
                {(activeProject as { role?: string }).role || "Full-Stack Project"} •{" "}
                {(activeProject as { year?: string }).year || "2024"}
              </p>
            </div>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-black/50 border border-white/10">
              <img
                src={
                  activeProject.screenshot ||
                  activeProject.img ||
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
                }
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Content */}
            <div className="space-y-5 text-xs sm:text-sm">
              {activeProject.details && (
                <div>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <FaCheckCircle className="text-[#00DE51] text-xs" /> About the Platform
                  </h4>
                  <p className="text-white/70 leading-relaxed">{activeProject.details}</p>
                </div>
              )}

              {activeProject.challenge && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="text-amber-400 font-bold mb-1.5 flex items-center gap-2 text-xs">
                    <FaLightbulb className="text-amber-400" /> Engineering Challenge
                  </h4>
                  <p className="text-white/80 leading-relaxed text-xs">{activeProject.challenge}</p>
                </div>
              )}

              {activeProject.goal && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="text-blue-400 font-bold mb-1.5 flex items-center gap-2 text-xs">
                    <FaRocket className="text-blue-400" /> Roadmap &amp; Future Goals
                  </h4>
                  <p className="text-white/80 leading-relaxed text-xs">{activeProject.goal}</p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-white font-bold mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {(activeProject.tech || []).map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/90 bg-white/10 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#000" }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs !text-black bg-[#00DE51] hover:bg-[#33FF77] shadow-md shadow-[#00DE51]/20 transition-all"
                  >
                    <FaExternalLinkAlt className="text-xs text-black" />
                    <span className="!text-black font-extrabold">Open Live Demo</span>
                  </a>
                )}
                {activeProject.client && (
                  <a
                    href={activeProject.client}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
                  >
                    <FaGithub className="text-sm" />
                    <span>{activeProject.server ? "Client Repo" : "GitHub Repo"}</span>
                  </a>
                )}
                {activeProject.server && (
                  <a
                    href={activeProject.server}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
                  >
                    <FaGithub className="text-sm" />
                    <span>Server Repo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
