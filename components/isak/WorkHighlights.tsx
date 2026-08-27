"use client";

const projects = [
  {
    num: "01",
    title: "Drone SaaS Platform",
    img: "/assets/images/section/work-1.jpg",
    desc: "Autonomous drone telemetry platform and dashboard blending real-time websockets with Next.js and MongoDB.",
    year: "2024",
    role: "Full-Stack Lead Engineer",
    tags: ["Next.js", "React", "MongoDB", "TailwindCSS"],
  },
  {
    num: "02",
    title: "Durotan E-Commerce",
    img: "/assets/images/section/work-2.jpg",
    desc: "High-performance headless e-commerce store with dynamic inventory management and seamless Stripe checkout.",
    year: "2024",
    role: "Full-Stack Developer",
    tags: ["React", "Node.js", "MongoDB", "Stripe API"],
  },
  {
    num: "03",
    title: "Nike Campaign Experience",
    img: "/assets/images/section/work-3.jpg",
    desc: "High-impact interactive urban campaign landing experience built for mobile responsiveness and fast load times.",
    year: "2024",
    role: "Frontend Engineer",
    tags: ["React", "TypeScript", "Framer Motion"],
  },
];

export default function WorkHighlights() {
  return (
    <div id="work" className="section-work flat-spacing">
      <div className="sect-tag text-caption fw-medium">
        <i className="icon icon-high-light"></i>Work Highlights
      </div>

      <div className="work-list element-sticky">
        {projects.map((project) => (
          <div key={project.num} className="sticky-item mb-8">
            <div className="wg-work">
              {/* Main Project Mockup Image */}
              <div className="work-image rounded-2xl overflow-hidden mb-4">
                <img
                  alt={project.title}
                  loading="lazy"
                  width={700}
                  height={427}
                  src={project.img}
                  className="w-full object-cover rounded-2xl"
                />
              </div>

              {/* Inline Project Details Card */}
              <div className="wg-work-card-inline p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="w-title letter-space--2 text-white font-semibold text-2xl mb-2">
                      {project.title}
                    </h4>
                    <p className="w-desc text-white/70 text-sm leading-relaxed mb-4 max-w-xl">
                      {project.desc}
                    </p>
                  </div>
                  <p className="text-white/40 text-sm font-mono shrink-0 ml-4">
                    <span className="text-white font-bold">{project.num}</span> / 03
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Year</p>
                    <p className="text-sm font-semibold text-white">{project.year}</p>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10"></div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Role</p>
                    <p className="text-sm font-semibold text-white">{project.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <a href="#contact" className="tf-btn-action style-white">
                    <span className="ic-wrap">
                      <i className="icon icon-arrow-right-top"></i>
                    </span>
                    <span className="text text-body-3 letter-space--05 fw-medium">
                      Let’s talk
                    </span>
                    <span className="ic-wrap">
                      <i className="icon icon-arrow-right-top"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
