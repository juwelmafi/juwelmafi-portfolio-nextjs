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

export const CATEGORY_FILTERS = [
  "All",
  "MERN Websites",
  "Shopify Websites",
  "WordPress Websites",
  "Graphic Design",
  "Landing Pages",
  "Others",
] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

/**
 * Categorizes a project intelligently based on explicit category,
 * technologies used, title, and description keywords.
 */
export function getProjectCategory(project: Project): CategoryFilter {
  // If project explicitly specifies a recognized category
  if (project.category) {
    const matched = CATEGORY_FILTERS.slice(1).find(
      (c) => c.toLowerCase() === project.category?.trim().toLowerCase()
    );
    if (matched) return matched;
  }

  const tech = (project.tech || []).join(" ").toLowerCase();
  const text = `${project.title || ""} ${project.desc || ""} ${project.details || ""} ${tech}`.toLowerCase();

  // 1. Shopify
  if (tech.includes("shopify") || text.includes("shopify") || tech.includes("liquid") || tech.includes("hydrogen")) {
    return "Shopify Websites";
  }

  // 2. WordPress
  if (tech.includes("wordpress") || text.includes("wordpress") || tech.includes("woocommerce") || tech.includes("elementor")) {
    return "WordPress Websites";
  }

  // 3. Graphic Design
  if (
    tech.includes("figma") ||
    tech.includes("photoshop") ||
    tech.includes("illustrator") ||
    text.includes("graphic design") ||
    text.includes("ui/ux") ||
    text.includes("branding") ||
    text.includes("logo")
  ) {
    return "Graphic Design";
  }

  // 4. Landing Pages
  if (
    text.includes("landing page") ||
    text.includes("landing pages") ||
    text.includes("single page") ||
    text.includes("one page")
  ) {
    return "Landing Pages";
  }

  // 5. MERN Websites
  if (
    tech.includes("react") ||
    tech.includes("next") ||
    tech.includes("node") ||
    tech.includes("mongo") ||
    tech.includes("express") ||
    text.includes("mern") ||
    text.includes("full-stack") ||
    text.includes("fullstack")
  ) {
    return "MERN Websites";
  }

  return "Others";
}

export default function ProjectsShowcase({ initialProjects }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Compute count of projects for each category pill
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: initialProjects.length,
      "MERN Websites": 0,
      "Shopify Websites": 0,
      "WordPress Websites": 0,
      "Graphic Design": 0,
      "Landing Pages": 0,
      Others: 0,
    };

    initialProjects.forEach((p) => {
      const cat = getProjectCategory(p);
      if (counts[cat] !== undefined) {
        counts[cat] += 1;
      } else {
        counts["Others"] += 1;
      }
    });

    return counts;
  }, [initialProjects]);

  // Filter projects by selected category pill and search query
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const pCat = getProjectCategory(p);
      const matchesCategory =
        selectedCategory === "All" ||
        pCat.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query) ||
        (p.details && p.details.toLowerCase().includes(query)) ||
        (p.tech && p.tech.some((t) => t.toLowerCase().includes(query))) ||
        pCat.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Search and Filter Controls */}
      <div className="mb-10 space-y-6">
        {/* Glass Drop Search Bar (Borderless) */}
        <div className="relative max-w-xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, category, or keywords..."
            className="glass-drop-search w-full text-white placeholder-white/40 text-xs sm:text-sm pl-11 pr-10 py-3.5 border-none outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs border-none outline-none cursor-pointer p-1 transition-colors"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Borderless Glass Drop) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`glass-drop-pill ${isSelected ? "active" : ""}`}
              >
                <span>{cat}</span>
                <span
                  className={`ml-2 text-[10.5px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-black/20 text-black font-extrabold"
                      : "bg-white/10 text-white/60 font-semibold"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Counter & Active Filter Reset */}
      <div className="flex items-center justify-between text-xs text-white/50 mb-6 px-1">
        <span>
          Showing <span className="text-[#00DE51] font-semibold">{filteredProjects.length}</span> of{" "}
          {initialProjects.length} projects
          {selectedCategory !== "All" && (
            <span className="text-white/60 ml-1.5">
              in <span className="text-white font-medium">"{selectedCategory}"</span>
            </span>
          )}
        </span>
        {(selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-[#00DE51] hover:underline cursor-pointer border-none bg-transparent outline-none"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Projects Grid (2-Column on Tablet/Desktop, 1-Column on Mobile) */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 px-6 glass-drop-card max-w-lg mx-auto border-none">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-2xl text-[#00DE51]">
            🔍
          </div>
          <h3 className="heading-font text-lg font-bold text-white mb-2">
            No projects in "{selectedCategory}"
          </h3>
          <p className="text-xs text-white/60 mb-6 max-w-sm mx-auto leading-relaxed">
            There are currently no projects matching this category or your search keywords.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="glass-drop-btn-primary"
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
            const projectCat = getProjectCategory(project);
            const role =
              (project as { role?: string }).role ||
              (projectCat === "Shopify Websites"
                ? "Shopify Specialist"
                : projectCat === "WordPress Websites"
                ? "WordPress Engineer"
                : projectCat === "Graphic Design"
                ? "UI/UX & Graphic Designer"
                : "Full-Stack Developer");
            const year =
              (project as { year?: string }).year ||
              (project.createdAt ? new Date(project.createdAt).getFullYear().toString() : "2024");

            return (
              <div
                key={project.id || idx}
                className="glass-drop-card juwel-project-card transition-all duration-300 flex flex-col justify-between group border-none"
              >
                <div>
                  {/* Project Image with subtle gradient overlay */}
                  <div className="rounded-2xl overflow-hidden mb-3.5 aspect-video bg-black/40 relative shadow-md">
                    <img
                      alt={project.title}
                      loading="lazy"
                      width={600}
                      height={340}
                      src={imgUrl}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50" />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/80 font-mono text-[10px] font-semibold shadow-lg">
                      <span className="text-[#00DE51] font-bold">{num}</span>/{totalStr}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="mb-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-bold text-sm sm:text-[15px] leading-snug group-hover:text-[#00DE51] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-white/50 mt-1.5">
                      <span className="text-[#00DE51]/90 font-medium">{projectCat}</span>
                      <span className="font-mono text-white/60 font-semibold">{year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-[11.5px] leading-relaxed mb-3.5 line-clamp-3">
                    {project.desc || project.details}
                  </p>

                  {/* Technology Pills (Borderless Glass Drop) */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {(project.tech || []).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="glass-drop-tag"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions (Borderless Glass Drop) */}
                <div className="pt-3 mt-auto flex flex-col gap-2">
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className={`glass-drop-btn-primary ${
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
                        className="glass-drop-btn col-span-1 sm:flex-1"
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
                        className="glass-drop-btn col-span-1 sm:flex-1"
                      >
                        <FaGithub className="w-3.5 h-3.5 shrink-0 text-white/90" />
                        <span>Server</span>
                      </a>
                    )}
                  </div>

                  {/* Case Study Details Trigger Button (Borderless Glass Drop) */}
                  {(project.details || project.challenge || project.goal) && (
                    <button
                      onClick={() => setActiveProject(project)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-medium text-white/70 hover:text-[#00DE51] bg-white/[0.04] hover:bg-white/[0.08] transition-all shadow-sm border-none outline-none cursor-pointer"
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

      {/* Case Study / Details Modal (Borderless Glass Drop) */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="glass-drop-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-[#0D0D18]/95 rounded-3xl shadow-2xl relative border-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border-none outline-none cursor-pointer shadow-md"
              aria-label="Close modal"
            >
              <FaTimes className="text-xs" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-black bg-[#00DE51] inline-block mb-2 shadow-sm border-none">
                {getProjectCategory(activeProject)}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{activeProject.title}</h2>
              <p className="text-xs text-white/50 mt-1">
                {(activeProject as { role?: string }).role || "Full-Stack Project"} •{" "}
                {(activeProject as { year?: string }).year || "2024"}
              </p>
            </div>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-black/50 shadow-md">
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
                <div className="p-4 rounded-2xl bg-amber-500/10 shadow-sm border-none">
                  <h4 className="text-amber-400 font-bold mb-1.5 flex items-center gap-2 text-xs">
                    <FaLightbulb className="text-amber-400" /> Engineering Challenge
                  </h4>
                  <p className="text-white/80 leading-relaxed text-xs">{activeProject.challenge}</p>
                </div>
              )}

              {activeProject.goal && (
                <div className="p-4 rounded-2xl bg-blue-500/10 shadow-sm border-none">
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
                      className="glass-drop-tag text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center gap-3">
                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-drop-btn-primary"
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
                    className="glass-drop-btn"
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
                    className="glass-drop-btn"
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
