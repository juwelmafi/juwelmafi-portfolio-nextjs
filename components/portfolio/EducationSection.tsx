"use client";

const timelineItems = [
  {
    date: "2024 - Present",
    logoLight: "/assets/images/logo/logo-3.svg",
    logoDark: "/assets/images/logo/logo-4.svg",
    logoWidth: 32,
    role: "Sonargaon University",
    sub: "B.Sc in Computer Science and Engineering (CSE)",
    desc: "Currently pursuing B.Sc in CSE, deepening knowledge in algorithms, software architecture, data structures, and advanced full-stack development.",
  },
  {
    date: "2023 - 2024",
    logoLight: "/assets/images/item/edu-2.svg",
    logoDark: "/assets/images/item/edu-2_dark.svg",
    logoWidth: 29,
    role: "National University, Gazipur",
    sub: "Department of Physics",
    desc: "Engaged in foundational scientific problem solving, analytical modeling, and mathematical logic.",
  },
  {
    date: "2020 - 2022",
    logoLight: "/assets/images/item/edu-3.svg",
    logoDark: "/assets/images/item/edu-3_dark.svg",
    logoWidth: 120,
    role: "Government Barhamgonj College, Shibchar",
    sub: "Higher Secondary Certificate (HSC) — Science Background",
    desc: "Completed Higher Secondary Certificate in Science with a strong academic foundation in mathematics and computing principles.",
  },
];

export default function EducationSection() {
  return (
    <div id="education" className="section-education-experience flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-edu"></i>Education
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-8 font-semibold text-2xl md:text-3xl">
        Academic Qualifications &amp; Learning Journey
      </h4>

      <div className="timeline scroll-down">
        <div className="timeline-line">
          <div className="prg-line"></div>
        </div>

        {timelineItems.map((item, idx) => (
          <div key={idx} className="timeline-item effectFade fadeUp no-div mb-8">
            <p className="timeline-date text-white/50 font-mono text-xs md:text-sm">{item.date}</p>
            <div className="timeline-dot"></div>
            <div className="timeline-content p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="icon mb-3">
                <img
                  className="image-switch"
                  data-light={item.logoLight}
                  data-dark={item.logoDark}
                  loading="lazy"
                  width={item.logoWidth}
                  height={32}
                  src={item.logoLight}
                  alt={item.role}
                />
              </div>
              <p className="timeline-role font-bold text-white text-lg">{item.role}</p>
              <p className="text-[#00DE51] text-xs md:text-sm font-medium mb-2">{item.sub}</p>
              <p className="timeline-desc text-body-3 text-white/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
