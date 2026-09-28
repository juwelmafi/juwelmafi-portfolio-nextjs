"use client";

const timelineItems = [
  {
    date: "2026 - Present",
    logo: "/assets/images/logo/logo-3.svg",
    role: "Sonargaon University",
    sub: "B.Sc in Computer Science and Engineering (CSE)",
    desc: "Currently pursuing B.Sc in CSE, deepening knowledge in algorithms, software architecture, data structures, and advanced full-stack development.",
  },
  {
    date: "2020 - 2022",
    logo: "/assets/images/item/edu-3.svg",
    role: "Government Barhamgonj College, Shibchar",
    sub: "Higher Secondary Certificate (HSC) — Science Background",
    desc: "Completed Higher Secondary Certificate in Science with a strong academic foundation in mathematics and computing principles.",
  },
];

export default function EducationSection() {
  return (
    <div id="education" className="flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-edu"></i>Education
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-6 font-bold text-2xl md:text-3xl">
        Academic Qualifications &amp; Learning Journey
      </h4>

      <div className="space-y-3">
        {timelineItems.map((item, idx) => (
          <div
            key={idx}
            className="water-drop-card juwel-edu-card w-full transition-all duration-300 group"
          >
            {/* Top Row: Responsive layout - stacks cleanly on small screens, side-by-side on tablet/desktop */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                {/* <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1.5 shrink-0 shadow-inner group-hover:scale-105 transition-transform mt-0.5">
                  <img
                    loading="lazy"
                    width={18}
                    height={18}
                    src={item.logo}
                    alt={item.role}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-95"
                  />
                </div> */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 sm:block">
                    <h5 className="font-semibold text-white text-xs sm:text-[13px] leading-snug">
                      {item.role}
                    </h5>
                    {/* Mobile Date Pill: sits inline or wraps cleanly without overlapping */}
                    <span className="edu-date-pill inline-flex sm:hidden items-center px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono text-[9px] font-medium border border-white/5 shadow-sm shrink-0 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-[#00DE51] text-[10.5px] sm:text-[11.5px] font-medium mt-1">
                    {item.sub}
                  </p>
                </div>
              </div>

              {/* Desktop Date Pill cleanly anchored at top-right */}
              <span className="edu-date-pill hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-mono text-[10.5px] font-medium border border-white/5 shadow-sm shrink-0 whitespace-nowrap mt-0.5">
                {item.date}
              </span>
            </div>

            {/* Description indented under the text */}
            <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed mt-2.5 pl-[38px] sm:pl-[42px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

