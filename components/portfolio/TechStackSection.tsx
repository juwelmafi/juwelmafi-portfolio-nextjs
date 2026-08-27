"use client";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const tools = [
  {
    name: "React & Next.js",
    duty: "Modern Frontend & Full-Stack SSR/SSG Framework",
    icon: <SiNextdotjs className="w-7 h-7 text-white" />,
    progress: 95,
  },
  {
    name: "Node.js & Express",
    duty: "Backend RESTful APIs & Serverless Microservices",
    icon: <SiNodedotjs className="w-7 h-7 text-[#68A063]" />,
    progress: 88,
  },
  {
    name: "MongoDB & Mongoose",
    duty: "NoSQL Database, Schema Modeling & Aggregation",
    icon: <SiMongodb className="w-7 h-7 text-[#47A248]" />,
    progress: 90,
  },
  {
    name: "TypeScript & JavaScript",
    duty: "Type-Safe Architecture & Modern ES6+ Standards",
    icon: <SiTypescript className="w-7 h-7 text-[#3178C6]" />,
    progress: 92,
  },
  {
    name: "TailwindCSS & UI Systems",
    duty: "Responsive Layouts, Glassmorphism & Animations",
    icon: <SiTailwindcss className="w-7 h-7 text-[#06B6D4]" />,
    progress: 94,
  },
];

export default function TechStackSection() {
  return (
    <div id="tech" className="section-tech-stack flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-tech-stack"></i>Tech Stack
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-8 font-semibold text-2xl md:text-3xl">
        See how my expertise with these <br className="d-none d-sm-block" /> technologies drives better results
      </h4>

      <ul className="tech-list space-y-4">
        {tools.map((t, idx) => (
          <li
            key={idx}
            className="wg-tech p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl shadow-2xl"
          >
            <div className="tech-infor flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="tech_image w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 shrink-0">
                  {t.icon}
                </div>
                <div className="tech_info">
                  <p className="info__name font-bold text-white text-base md:text-lg">{t.name}</p>
                  <p className="info__duty text-white/60 text-xs md:text-sm mt-0.5">{t.duty}</p>
                </div>
              </div>
              <span className="text-sm md:text-base font-mono text-[#00DE51] font-bold shrink-0">{t.progress}%</span>
            </div>

            {/* Glowing Active Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${t.progress}%`,
                  background: "linear-gradient(90deg, #00DE51 0%, #33FF77 100%)",
                  boxShadow: "0 0 16px rgba(0, 222, 81, 0.6)",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
