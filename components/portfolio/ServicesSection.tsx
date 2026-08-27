"use client";
import { useState } from "react";

const services = [
  {
    id: "service-1",
    title: "Full-Stack Web Development",
    img1: "/assets/images/section/service-1.jpg",
    img2: "/assets/images/section/service-2.jpg",
    tags: ["Next.js & React", "Node.js & Express", "MongoDB Integration", "REST & GraphQL APIs"],
    desc: "I build end-to-end scalable web applications using modern MERN and Next.js architectures with clean code, secure authentication, and performant databases.",
  },
  {
    id: "service-2",
    title: "Frontend Engineering & UI/UX",
    img1: "/assets/images/section/service-3.jpg",
    img2: "/assets/images/section/service-4.jpg",
    tags: ["Responsive Layouts", "TailwindCSS", "Framer Motion", "Performance Tuning"],
    desc: "Crafting fluid, high-converting interfaces that delight users. Every pixel is optimized for accessibility, cross-browser compatibility, and lightning-fast load times.",
  },
  {
    id: "service-3",
    title: "Database Architecture & Cloud Deployment",
    img1: "/assets/images/section/service-5.jpg",
    img2: "/assets/images/section/service-6.jpg",
    tags: ["MongoDB Schema Design", "NextAuth & JWT", "Vercel Hosting", "API Optimization"],
    desc: "From database schema design to serverless API routes and cloud deployments, I deliver secure and reliable web infrastructure tailored to your business needs.",
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("service-1");

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <div id="service" className="section-service flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div mb-0">
        <i className="icon icon-service"></i>Services
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-8 font-semibold text-2xl md:text-3xl">
        High-Impact Solutions I Provide
      </h4>

      <div id="accordion-service" className="space-y-6">
        {services.map((srv) => {
          const isOpen = activeId === srv.id;
          return (
            <div
              key={srv.id}
              className="service-accordion_item rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/20 p-6 md:p-8 transition-all duration-300 backdrop-blur-xl shadow-2xl"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(srv.id)}
                className="accordion-action w-full text-start flex justify-between items-center cursor-pointer"
                aria-expanded={isOpen}
              >
                <h4 className="text letter-space--2 text-white font-bold text-xl md:text-2xl">
                  {srv.title}
                </h4>
                <div className="ic-wrap w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white shrink-0 ml-4">
                  <span className="font-mono text-xl font-bold">{isOpen ? "−" : "+"}</span>
                </div>
              </button>

              {isOpen && (
                <div className="accordion-content pt-6 transition-all duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="service-image rounded-2xl overflow-hidden aspect-video bg-white/5">
                      <img
                        alt={srv.title}
                        loading="lazy"
                        width={340}
                        height={206}
                        src={srv.img1}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="service-image rounded-2xl overflow-hidden aspect-video bg-white/5">
                      <img
                        alt={srv.title}
                        loading="lazy"
                        width={340}
                        height={206}
                        src={srv.img2}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  </div>

                  <div className="service-tag flex flex-wrap gap-2 mb-4">
                    {srv.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 text-xs font-medium text-white/90 bg-white/10 rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="service-desc text-white/80 text-sm md:text-base leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
