"use client";

const education = [
  {
    degree: "B.Sc in Physics",
    institution: "National University, Gazipur",
    period: "2024 – 2027 (expected)",
    desc: "Pursuing a science degree while building a parallel career in software development.",
    type: "current",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Govt. Barhamgonj College, Shibchar",
    period: "2022",
    desc: "Completed HSC in Science background, laying a strong analytical foundation.",
    type: "completed",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--bg-elevated)" }}
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="section-label">Education</span>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
            Academic Background
          </h2>
          <div className="section-divider mx-auto mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, var(--accent), transparent)" }}
          />

          <div className="space-y-8">
            {education.map((item, i) => (
              <div key={i} className="relative pl-16 group">
                {/* Dot */}
                <div
                  className="absolute left-0 top-6 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold heading-font transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: item.type === "current" ? "var(--accent)" : "var(--bg-surface)",
                    color: item.type === "current" ? "#0A0A14" : "var(--accent)",
                    border: `2px solid var(--accent)`,
                    boxShadow: item.type === "current" ? "0 0 20px rgba(253,203,110,0.3)" : "none",
                  }}
                >
                  {i + 1}
                </div>

                {/* Card */}
                <div className="glass-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="heading-font text-lg font-bold text-white">{item.degree}</h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: "var(--accent)" }}>
                        {item.institution}
                      </p>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full whitespace-nowrap"
                      style={{
                        background: item.type === "current" ? "var(--accent-glow)" : "rgba(255,255,255,0.04)",
                        color: item.type === "current" ? "var(--accent)" : "var(--text-subtle)",
                        border: `1px solid ${item.type === "current" ? "var(--border-accent)" : "var(--border)"}`,
                      }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
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
