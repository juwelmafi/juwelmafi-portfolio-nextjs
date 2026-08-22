"use client";
import { FaCode, FaBrain, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";

const highlights = [
  {
    icon: FaCode,
    title: "Work Style",
    desc: "Clean, minimal designs. Reusable code. Simplicity over complexity.",
  },
  {
    icon: FaBrain,
    title: "Mindset",
    desc: "Focused learning, self-discipline, and improving 1% every day.",
  },
  {
    icon: FaYoutube,
    title: "Content Creator",
    desc: "Self-development videos on YouTube to help learners grow with clarity.",
  },
];

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "1+", label: "Year Experience" },
  { value: "5+", label: "Tech Stacks" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--bg-elevated)" }}
    >
      {/* Subtle top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14">
          <span className="section-label">About Me</span>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2 mb-0">
            Who I Am
          </h2>
          <div className="section-divider mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — Text */}
          <div className="space-y-6">
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              I&apos;m a passionate{" "}
              <span className="text-white font-semibold">MERN Stack Developer</span>{" "}
              based in Bangladesh with a strong focus on frontend. I enjoy crafting interactive,
              accessible, and scalable web applications.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              I&apos;m currently studying{" "}
              <span className="text-white font-semibold">BSc in Physics</span>, but coding is my true
              passion. That&apos;s why I chose{" "}
              <span className="text-white font-semibold">frontend development</span> as my
              career — because we should all do what we love.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-subtle)" }}>
              <FaMapMarkerAlt style={{ color: "var(--accent)" }} />
              <span>Madaripur, Bangladesh</span>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="heading-font text-3xl font-extrabold"
                    style={{ color: "var(--accent)" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Cards */}
          <div className="space-y-4">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-5 flex gap-4 items-start group">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                >
                  <Icon className="text-base" />
                </div>
                <div>
                  <h4 className="heading-font font-semibold text-white text-sm mb-1">{title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
