"use client";

import { useState, useMemo } from "react";
import { Project } from "@/types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectsRetroProps {
  projects: Project[];
  content?: Record<string, string>;
}

const REQUIRED_TABS = [
  "All",
  "MERN",
  "Shopify",
  "WordPress",
  "Designs",
  "Landing Page",
  "Other",
];

const INITIAL_VISIBLE_COUNT = 6;

export default function ProjectsRetro({ projects, content }: ProjectsRetroProps) {
  const eyebrow = content?.["projects.eyebrow"] || "01 / THE WORK";
  const title = content?.["projects.headerTitle"] || "Featured Projects & Deployments";
  const desc =
    content?.["projects.headerDesc"] ||
    "Real-world full-stack web applications, custom platforms, and production systems built with Next.js, React, Node.js, and MongoDB.";

  // Guaranteed categories: All, MERN, Shopify, WordPress, Designs, Landing Page, Other
  const categories = useMemo(() => {
    const extraCategories = new Set<string>();
    projects.forEach((p) => {
      if (p.category && p.category.trim()) {
        const cat = p.category.trim();
        const isStandard = REQUIRED_TABS.some(
          (t) => t.toLowerCase() === cat.toLowerCase()
        );
        if (!isStandard) {
          extraCategories.add(cat);
        }
      }
    });
    const standardWithoutOther = REQUIRED_TABS.filter((t) => t !== "Other");
    return [...standardWithoutOther, ...Array.from(extraCategories), "Other"];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    const target = activeCategory.toLowerCase();

    return projects.filter((p) => {
      const cat = (p.category || "").trim().toLowerCase();
      const techList = Array.isArray(p.tech) ? p.tech.map((t) => t.toLowerCase()) : [];

      if (target === "shopify") {
        return cat === "shopify" || techList.includes("shopify");
      }
      if (target === "wordpress") {
        return cat === "wordpress" || techList.includes("wordpress") || techList.includes("woocommerce");
      }
      if (target === "landing page") {
        return cat === "landing page" || cat === "landing" || techList.includes("landing page") || techList.includes("landing");
      }
      if (target === "designs") {
        return cat === "designs" || cat === "design" || techList.includes("designs") || techList.includes("design") || techList.includes("figma") || techList.includes("ui/ux design");
      }
      if (target === "mern") {
        return (
          cat === "mern" ||
          (!cat && !techList.includes("shopify") && !techList.includes("wordpress") && (techList.includes("react") || techList.includes("next.js") || techList.includes("mongodb")))
        );
      }
      if (target === "other") {
        const isStandard =
          cat === "shopify" ||
          cat === "wordpress" ||
          cat === "landing page" ||
          cat === "designs" ||
          cat === "mern" ||
          techList.includes("shopify") ||
          techList.includes("wordpress") ||
          techList.includes("woocommerce");
        return cat === "other" || (!isStandard && cat !== "");
      }

      return cat === target;
    });
  }, [projects, activeCategory]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  return (
    <section id="projects" className="py-16 sm:py-20 border-b-2 border-[#191712] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="retro-eyebrow">
              {eyebrow}
            </p>
            <h2 className="font-script font-bold text-4xl sm:text-5xl lg:text-6xl text-[#191712]">
              {title.includes("Projects") ? (
                <>
                  {title.split("Projects")[0]}
                  <span className="marked">Projects</span>
                  {title.split("Projects")[1]}
                </>
              ) : (
                title
              )}
            </h2>
            <p className="font-hand text-lg sm:text-xl text-[#57534E] mt-2 max-w-xl">
              {desc}
            </p>
          </div>

          <div className="font-typewriter text-xs text-[#191712] bg-[#FFFFFF] border-2 border-[#191712] px-3.5 py-1.5 shadow-[3px_3px_0px_#191712]">
            {filteredProjects.length > INITIAL_VISIBLE_COUNT
              ? `SHOWING ${displayedProjects.length} OF ${filteredProjects.length} DOSSIERS`
              : `COUNT: ${filteredProjects.length} DOSSIERS`}
          </div>
        </div>

        {/* Category Tabs: All, MERN, Shopify, WordPress, Designs, Landing Page, Other */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 border-2 border-[#191712] rounded-full font-hand text-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FFE45E] text-[#191712] font-bold shadow-[2px_2px_0px_#191712] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-[#FFFFFF] text-[#191712] hover:bg-[#FAF7EE] hover:border-[#191712]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid (Showing up to visibleCount cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full hand-box p-10 bg-[#FFFFFF] text-center">
              <span className="font-typewriter text-xs text-[#C2410C] font-bold uppercase tracking-wider block mb-2">
                ARCHIVE · {activeCategory.toUpperCase()}
              </span>
              <h3 className="font-script font-bold text-3xl text-[#191712] mb-2">
                No projects cataloged under &ldquo;{activeCategory}&rdquo; yet.
              </h3>
              <p className="font-hand text-lg text-[#57534E] max-w-md mx-auto">
                New {activeCategory} case studies and deployments will appear here once published from the Admin Hub.
              </p>
            </div>
          ) : (
            displayedProjects.map((project, idx) => {
              const docketNumber = `PROJ-${String(idx + 1).padStart(3, "0")}`;
              const displayImg = project.img || project.screenshot || "/assets/images/portfolio/portfolio-1.jpg";

              return (
                <article
                  key={project.id || idx}
                  className="hand-box flex flex-col bg-[#FFFFFF] overflow-hidden"
                >
                  {/* Docket Header */}
                  <div className="flex items-center justify-between border-b-2 border-[#191712] px-5 py-3 bg-[#FAF7EE]">
                    <span className="font-typewriter font-bold text-xs text-[#191712]">
                      {docketNumber}
                    </span>
                    {(() => {
                      const displayCat = (() => {
                        if (project.category && project.category !== "undefined") return project.category;
                        const tech = (project.tech || []).map((t) => t.toLowerCase());
                        if (tech.includes("shopify")) return "Shopify";
                        if (tech.includes("wordpress") || tech.includes("woocommerce")) return "WordPress";
                        if (tech.includes("landing page") || tech.includes("landing")) return "Landing Page";
                        if (tech.includes("designs") || tech.includes("figma") || tech.includes("ui/ux design")) return "Designs";
                        return "MERN";
                      })();
                      return (
                        <span className="font-typewriter text-xs font-bold bg-[#FFE45E] border border-[#191712] px-2.5 py-0.5 rounded text-[#191712] shadow-[1px_1px_0px_#191712]">
                          {displayCat}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Project Screenshot */}
                  <div className="relative border-b-2 border-[#191712] bg-[#191712]/5 overflow-hidden group">
                    <img
                      src={displayImg}
                      alt={project.title}
                      className="w-full h-52 sm:h-60 object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      onError={(e) => {
                        if (project.screenshot && e.currentTarget.src !== project.screenshot) {
                          e.currentTarget.src = project.screenshot;
                        }
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-script font-bold text-2xl sm:text-3xl text-[#191712] mb-2 leading-tight">
                        {project.title}
                      </h3>

                      <p className="font-hand text-base sm:text-lg text-[#57534E] leading-relaxed mb-4">
                        {project.desc}
                      </p>

                      {/* Tech Badges */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="font-typewriter text-[11px] bg-[#FAF7EE] border border-[#191712] px-2 py-0.5 text-[#191712]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#191712]/20">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-small gap-1.5"
                        >
                          <span>Launch Live</span>
                          <FaExternalLinkAlt size={11} />
                        </a>
                      )}
                      {project.client && (
                        <a
                          href={project.client}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-hand-white text-sm py-1.5 px-3.5 gap-1.5"
                        >
                          <FaGithub size={13} />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Load More Button (Shown when more projects exist than currently visible) */}
        {filteredProjects.length > visibleCount && (
          <div className="flex flex-col items-center justify-center mt-12 pt-6 border-t-2 border-[#191712]/15">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="btn-hand-black text-xl py-3 px-8 flex items-center gap-3 shadow-[4px_4px_0px_#191712] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-pointer"
            >
              <span>Load More Projects</span>
              <span className="font-typewriter text-xs bg-[#FFE45E] text-[#191712] px-2.5 py-0.5 rounded font-bold shadow-[1px_1px_0px_#191712]">
                +{Math.min(6, filteredProjects.length - visibleCount)}
              </span>
            </button>
            <p className="font-hand text-base text-[#57534E] mt-3">
              Showing {displayedProjects.length} of {filteredProjects.length} dossiers in &ldquo;{activeCategory}&rdquo;
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
