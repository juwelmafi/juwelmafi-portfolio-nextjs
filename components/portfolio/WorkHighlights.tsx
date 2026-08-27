"use client";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    num: "01",
    title: "Talkademic – Tutor Booking Platform",
    img: "https://i.ibb.co/Vrzv1vt/talkademic-mock.png",
    desc: "An online global tutor booking platform featuring category-based tutor search, real-time availability, secure booking, reviews, and role-based routes with multi-country support.",
    year: "2024",
    role: "Full-Stack Developer",
    tech: ["React", "Tailwind CSS", "Firebase", "Node.js", "MongoDB"],
    live: "https://talkademic.web.app/",
    client: "https://github.com/juwelmafi/talkademic",
    server: "https://github.com/juwelmafi/talkademic-server",
  },
  {
    num: "02",
    title: "Scholar Link – Scholarship Management System",
    img: "https://i.ibb.co.com/Y7gYdDdK/scholar-mock.jpg",
    desc: "Role-based scholarship management platform with student application workflows, Stripe payments, review systems, and administrative analytics dashboards.",
    year: "2024",
    role: "Full-Stack Developer",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Firebase"],
    live: "https://scholar-link.web.app/",
    client: "https://github.com/juwelmafi/scholar-link-client",
    server: "https://github.com/juwelmafi/scholar-link-server",
  },
  {
    num: "03",
    title: "Easy House – House Rental Platform (Next.js)",
    img: "https://i.ibb.co.com/7dVs27jC/easy-house.jpg",
    desc: "A full-stack house rental platform built on Next.js featuring property exploration, NextAuth multi-provider authentication, user booking dashboard, and MongoDB database.",
    year: "2024",
    role: "Full-Stack Lead",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB", "NextAuth"],
    live: "https://easy-house.vercel.app/",
    client: "https://github.com/juwelmafi/easy-house",
    server: "",
  },
  {
    num: "04",
    title: "Freeleza – Freelance Service Marketplace",
    img: "https://i.ibb.co/9H2xD2Yv/freeleza-mock.png",
    desc: "Dynamic freelance task management and bidding marketplace connecting clients with freelancers through deadline-prioritized task dashboards and custom proposals.",
    year: "2024",
    role: "MERN Developer",
    tech: ["React", "Tailwind CSS", "Firebase", "Node.js", "MongoDB"],
    live: "https://fleeleza.web.app/",
    client: "https://github.com/juwelmafi/freeleza",
    server: "https://github.com/juwelmafi/freeleza-server",
  },
  {
    num: "05",
    title: "App-Store – App Discovery Platform",
    img: "https://i.ibb.co/9m5KQrp0/app-store-mock.png",
    desc: "A mobile app discovery platform simulating real-world trending apps, category-wise exploration, detailed app profiles, and user review/rating workflows.",
    year: "2024",
    role: "Frontend Developer",
    tech: ["React", "Tailwind CSS", "JavaScript", "Firebase"],
    live: "https://my-app-store-bfe0d.web.app/",
    client: "https://github.com/juwelmafi/app-store",
    server: "",
  },
];

export default function WorkHighlights() {
  return (
    <div id="work" className="flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-high-light"></i>Featured Projects
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-10 font-bold text-2xl md:text-3xl">
        Recent Works &amp; Live Deployments
      </h4>

      {/* Standalone Project Cards with Luxurious Padding */}
      <div className="space-y-12">
        {projects.map((project) => (
          <div
            key={project.num}
            className="juwel-project-card p-7 sm:p-9 pb-9 sm:pb-11 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Main Project Mockup Image */}
            <div className="rounded-2xl overflow-hidden mb-8 aspect-video bg-black/50 border border-white/10 relative group shadow-lg">
              <img
                alt={project.title}
                loading="lazy"
                width={700}
                height={427}
                src={project.img}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Project Details */}
            <div className="px-1 sm:px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                <h4 className="text-white font-bold text-xl sm:text-2xl leading-tight">
                  {project.title}
                </h4>
                <p className="text-white/60 text-xs sm:text-sm font-mono shrink-0">
                  <span className="text-[#00DE51] font-bold">{project.num}</span> / 0{projects.length}
                </p>
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-6 text-xs sm:text-sm">
                <div>
                  <span className="text-white/50 uppercase tracking-wider block mb-1 text-xs font-semibold">Year</span>
                  <span className="font-semibold text-white">{project.year}</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10"></div>
                <div>
                  <span className="text-white/50 uppercase tracking-wider block mb-1 text-xs font-semibold">Role</span>
                  <span className="font-semibold text-white">{project.role}</span>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-8">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 text-xs font-medium text-white/90 bg-white/10 rounded-full border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons with High-Contrast Text & Generous Padding */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl bg-[#00DE51] text-black font-bold text-xs sm:text-sm hover:bg-[#33FF77] hover:scale-105 transition-all shadow-lg shadow-[#00DE51]/20"
                    >
                      <FaExternalLinkAlt className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                  {project.client && (
                    <a
                      href={project.client}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all hover:scale-105"
                    >
                      <FaGithub className="w-4 h-4" /> Client Code
                    </a>
                  )}
                  {project.server && (
                    <a
                      href={project.server}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all hover:scale-105"
                    >
                      <FaGithub className="w-4 h-4" /> Server Code
                    </a>
                  )}
                </div>

                <a
                  href="#contact"
                  className="text-white hover:text-[#00DE51] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 py-2 px-1"
                >
                  <span>Discuss Project</span>
                  <span className="text-[#00DE51] font-bold">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
