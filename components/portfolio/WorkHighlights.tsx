import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { getProjects } from "@/lib/data";
import { Project } from "@/types";

export default async function WorkHighlights() {
  let allProjects: Project[] = [];
  try {
    allProjects = await getProjects();
  } catch (err) {
    console.warn("Failed to load projects from DB:", err);
    allProjects = [];
  }

  if (allProjects.length === 0) return null;

  // Show latest 4 on homepage
  const projects = allProjects.slice(0, 4);

  return (
    <div id="work" className="flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-high-light"></i>Featured Projects
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade font-bold text-2xl md:text-3xl">
          Recent Works &amp; Deployments
        </h4>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 shrink-0"
          style={{
            background: "rgba(0, 222, 81, 0.12)",
            color: "var(--accent)",
            border: "1px solid rgba(0, 222, 81, 0.3)",
          }}
        >
          Browse All →
        </Link>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="project-2col-grid grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {projects.map((project, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          const totalStr = String(allProjects.length).padStart(2, "0");
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
              className="water-drop-card juwel-project-card transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Project Image with subtle gradient overlay */}
                <div className="rounded-xl overflow-hidden mb-3 aspect-video bg-black/40 relative shadow-md">
                  <img
                    alt={project.title}
                    loading="lazy"
                    width={500}
                    height={280}
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
                  <h5 className="text-white font-bold text-xs sm:text-[13px] leading-snug line-clamp-2 min-h-[2.2rem] group-hover:text-[#00DE51] transition-colors">
                    {project.title}
                  </h5>
                  <div className="flex items-center justify-between text-[10px] text-white/50 mt-1">
                    <span className="text-white/70 font-medium">{role}</span>
                    <span className="font-mono text-white/60 font-semibold">{year}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 text-[10.5px] sm:text-[11px] leading-relaxed mb-3 line-clamp-2">
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

              {/* Bottom Actions - Responsive Layout (100% Mobile Safe, 1 Row on Tablet/Desktop) */}
              <div className="pt-3 border-t border-white/10 mt-auto grid grid-cols-2 sm:flex sm:items-center gap-2 w-full">
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
            </div>
          );
        })}
      </div>

      {/* Explore More Button */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-extrabold text-xs sm:text-sm !text-black transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00DE51]/25 no-underline"
          style={{ background: "var(--accent)", color: "#000" }}
        >
          <span className="!text-black font-extrabold">Explore All Projects ({allProjects.length})</span>
          <span className="text-base font-extrabold !text-black ml-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}


