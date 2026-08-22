"use client";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaBootstrap,
} from "react-icons/fa";
import {
  SiTailwindcss, SiJavascript, SiMongodb, SiFirebase,
  SiTypescript, SiNextdotjs, SiExpress, SiFigma,
} from "react-icons/si";

interface Skill {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  color: string;
  glow: string;
  level: string;
}

const skills: Skill[] = [
  { icon: FaHtml5,       name: "HTML5",       color: "#E44D26", glow: "rgba(228,77,38,0.2)",   level: "Expert" },
  { icon: FaCss3Alt,     name: "CSS3",        color: "#264de4", glow: "rgba(38,77,228,0.2)",   level: "Expert" },
  { icon: SiJavascript,  name: "JavaScript",  color: "#F7DF1E", glow: "rgba(247,223,30,0.2)",  level: "Advanced" },
  { icon: SiTypescript,  name: "TypeScript",  color: "#3178C6", glow: "rgba(49,120,198,0.2)",  level: "Intermediate" },
  { icon: FaReact,       name: "React.js",    color: "#61DAFB", glow: "rgba(97,218,251,0.2)",  level: "Advanced" },
  { icon: SiNextdotjs,   name: "Next.js",     color: "#FFFFFF", glow: "rgba(255,255,255,0.1)", level: "Intermediate" },
  { icon: SiTailwindcss, name: "Tailwind",    color: "#38BDF8", glow: "rgba(56,189,248,0.2)",  level: "Advanced" },
  { icon: FaBootstrap,   name: "Bootstrap",   color: "#7952B3", glow: "rgba(121,82,179,0.2)",  level: "Advanced" },
  { icon: FaNodeJs,      name: "Node.js",     color: "#3C873A", glow: "rgba(60,135,58,0.2)",   level: "Intermediate" },
  { icon: SiExpress,     name: "Express",     color: "#999999", glow: "rgba(153,153,153,0.15)", level: "Intermediate" },
  { icon: SiMongodb,     name: "MongoDB",     color: "#4DB33D", glow: "rgba(77,179,61,0.2)",   level: "Intermediate" },
  { icon: SiFirebase,    name: "Firebase",    color: "#FFCA28", glow: "rgba(255,202,40,0.2)",  level: "Advanced" },
  { icon: FaGithub,      name: "GitHub",      color: "#FFFFFF", glow: "rgba(255,255,255,0.1)", level: "Advanced" },
  { icon: SiFigma,       name: "Figma",       color: "#A259FF", glow: "rgba(162,89,255,0.2)",  level: "Beginner" },
];

const levelWidth: Record<string, string> = {
  Expert: "100%",
  Advanced: "80%",
  Intermediate: "60%",
  Beginner: "35%",
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="section-label">Skills</span>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
            Tools & Technologies
          </h2>
          <div className="section-divider mx-auto mt-4" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {skills.map(({ icon: Icon, name, color, glow, level }) => (
            <div
              key={name}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = color;
                el.style.boxShadow = `0 0 24px ${glow}, 0 4px 20px rgba(0,0,0,0.3)`;
                el.style.transform = "translateY(-4px)";
                el.style.background = `${glow}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
                el.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              {/* Icon */}
              <div
                className="text-4xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                style={{ color }}
              >
                <Icon />
              </div>

              {/* Name */}
              <span
                className="heading-font text-xs font-semibold text-center leading-tight"
                style={{ color: "var(--text-muted)" }}
              >
                {name}
              </span>

              {/* Level bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl overflow-hidden"
                style={{ background: "var(--border)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 group-hover:opacity-100 opacity-0"
                  style={{
                    width: levelWidth[level],
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }}
                />
              </div>

              {/* Tooltip */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
