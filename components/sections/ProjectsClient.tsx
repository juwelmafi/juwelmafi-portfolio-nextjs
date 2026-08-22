"use client";
import { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaServer, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Project } from "@/types";

const techColors: Record<string, { bg: string; text: string }> = {
  React:       { bg: "#61DAFB22", text: "#61DAFB" },
  "Next.js":   { bg: "#FFFFFF11", text: "#FFFFFF" },
  TypeScript:  { bg: "#3178C622", text: "#3178C6" },
  "Tailwind CSS": { bg: "#38BDF822", text: "#38BDF8" },
  Tailwind:    { bg: "#38BDF822", text: "#38BDF8" },
  "Node.js":   { bg: "#3C873A22", text: "#3C873A" },
  MongoDB:     { bg: "#4DB33D22", text: "#4DB33D" },
  Firebase:    { bg: "#FFCA2822", text: "#FFCA28" },
  Express:     { bg: "#99999922", text: "#999999" },
  JavaScript:  { bg: "#F7DF1E22", text: "#F7DF1E" },
  NextAuth:    { bg: "#7B5EA722", text: "#B39DDB" },
};

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="section-label">Portfolio</span>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
            Featured Projects
          </h2>
          <div className="section-divider mx-auto mt-4" />
        </div>

        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project, i) => (
            <div
              key={project.id ?? i}
              className="group glass-card overflow-hidden flex flex-col lg:flex-row"
              style={{ flexDirection: project.reverse ? "row-reverse" : "row" } as React.CSSProperties}
            >
              {/* Image */}
              <div className="relative w-full lg:w-1/2 h-64 lg:h-auto min-h-[300px] overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center flex-1 p-8 lg:p-10 space-y-4">
                <span
                  className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  Featured Project
                </span>
                <h3 className="heading-font text-2xl lg:text-3xl font-bold text-white leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm lg:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {project.desc}
                </p>

                {project.challenge && (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--accent)" }} className="font-semibold">Challenge: </span>
                    {project.challenge}
                  </p>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech?.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: techColors[tech]?.bg ?? "#44444422",
                        color: techColors[tech]?.text ?? "#888",
                        border: `1px solid ${techColors[tech]?.text ?? "#888"}22`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary text-xs px-4 py-2"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {project.client && (
                    <a
                      href={project.client}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline text-xs px-4 py-2"
                    >
                      <FaGithub /> Client
                    </a>
                  )}
                  {project.server && project.server !== "#" && (
                    <a
                      href={project.server}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline text-xs px-4 py-2"
                    >
                      <FaServer /> Server
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(project)}
                    className="btn-accent-outline text-xs px-4 py-2"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}
            >
              <FaTimes />
            </button>

            {selected.screenshot && (
              <div className="relative w-full h-64 lg:h-80 overflow-hidden rounded-t-2xl">
                <Image src={selected.screenshot} alt={selected.title} fill className="object-cover" />
              </div>
            )}

            <div className="p-8">
              <h3 className="heading-font text-2xl font-bold text-white mb-2">{selected.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                {selected.details}
              </p>

              {selected.goal && (
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--accent)" }} className="font-semibold">Goal: </span>
                  {selected.goal}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {selected.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: techColors[tech]?.bg ?? "#44444422",
                      color: techColors[tech]?.text ?? "#888",
                      border: `1px solid ${techColors[tech]?.text ?? "#888"}22`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
