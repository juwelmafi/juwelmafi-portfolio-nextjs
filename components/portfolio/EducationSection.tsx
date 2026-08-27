"use client";

const timelineItems = [
  {
    date: "2024 - Present",
    logo: "/assets/images/logo/logo-3.svg",
    role: "Sonargaon University",
    sub: "B.Sc in Computer Science and Engineering (CSE)",
    desc: "Currently pursuing B.Sc in CSE, deepening knowledge in algorithms, software architecture, data structures, and advanced full-stack development.",
  },
  {
    date: "2023 - 2024",
    logo: "/assets/images/item/edu-2.svg",
    role: "National University, Gazipur",
    sub: "Department of Physics",
    desc: "Engaged in foundational scientific problem solving, analytical modeling, and mathematical logic.",
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
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-10 font-bold text-2xl md:text-3xl">
        Academic Qualifications &amp; Learning Journey
      </h4>

      <div className="space-y-8">
        {timelineItems.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            {/* Timeline Year Pill */}
            <div className="sm:w-36 shrink-0 sm:pt-3">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 font-mono text-xs font-semibold">
                {item.date}
              </span>
            </div>

            {/* Generous Padding on Education Card */}
            <div className="juwel-edu-card flex-1 w-full p-7 sm:p-9 pb-8 sm:pb-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center p-2.5 shrink-0 border border-white/10 shadow-inner">
                  <img
                    loading="lazy"
                    width={32}
                    height={32}
                    src={item.logo}
                    alt={item.role}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-95"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-white text-lg sm:text-xl leading-snug">{item.role}</h5>
                  <p className="text-[#00DE51] text-xs sm:text-sm font-semibold mt-0.5">{item.sub}</p>
                </div>
              </div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed pl-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
