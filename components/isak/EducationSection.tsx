"use client";

const timelineItems = [
  {
    date: "2023 - Now",
    logoLight: "/assets/images/logo/logo-3.svg",
    logoDark: "/assets/images/logo/logo-4.svg",
    logoWidth: 32,
    role: "Full-Stack Developer & Next.js Specialist",
    desc: "Architecting scalable web applications, SaaS dashboards, and modern headless websites using Next.js, TypeScript, and MongoDB.",
  },
  {
    date: "2021 - 2023",
    logoLight: "/assets/images/item/edu-2.svg",
    logoDark: "/assets/images/item/edu-2_dark.svg",
    logoWidth: 29,
    role: "MERN Stack Developer at Digital Agency",
    desc: "Developed responsive React interfaces and secure Node.js/Express backend APIs with MongoDB database integrations.",
  },
  {
    date: "2019 - 2021",
    logoLight: "/assets/images/item/edu-3.svg",
    logoDark: "/assets/images/item/edu-3_dark.svg",
    logoWidth: 120,
    role: "Frontend Developer & Computer Science Studies",
    desc: "Built modern interactive UI components, mastered responsive design patterns, and collaborated on open source web projects.",
  },
];

export default function EducationSection() {
  return (
    <div id="education" className="section-education-experience flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-edu"></i>Education &amp; Experience
      </div>

      <div className="timeline scroll-down">
        <div className="timeline-line">
          <div className="prg-line"></div>
        </div>

        {timelineItems.map((item, idx) => (
          <div key={idx} className="timeline-item effectFade fadeUp no-div">
            <p className="timeline-date text-black-56">{item.date}</p>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="icon">
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
              <p className="timeline-role fw-medium text-black-72">{item.role}</p>
              <p className="timeline-desc text-body-3 text-black-56">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
