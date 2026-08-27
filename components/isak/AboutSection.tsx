"use client";
import { useState } from "react";

const awards = [
  { name: "Best Web Architecture", desc: "Dev Community", year: "2024", img: "/assets/images/section/award-1.jpg" },
  { name: "Top MERN Project",     desc: "Open Source Showcase", year: "2024", img: "/assets/images/section/award-2.jpg" },
  { name: "Frontend Excellence",   desc: "Hackathon Award", year: "2023", img: "/assets/images/section/award-3.jpg" },
  { name: "Featured App Design",   desc: "UI/UX Showcase", year: "2023", img: "/assets/images/section/award-4.jpg" },
  { name: "Full-Stack Project",    desc: "Tech Spotlight", year: "2022", img: "/assets/images/section/award-5.jpg" },
];

export default function AboutSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div id="about" className="section-about flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle"></i>About
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-6 font-semibold text-3xl">
        Engineering robust web applications <br className="d-none d-lg-block" />
        with clarity, performance, <br className="d-none d-lg-block" />
        and modern design
      </h4>
      <p className="s-desc text-white/70 scrolling-effect effectTop leading-relaxed mb-8">
        I specialize in building full-stack web solutions using React, Next.js, Node.js, and MongoDB.
        <br className="d-none d-lg-block" />
        From interactive client portals to performant dashboards and APIs, I turn complex ideas into seamless user experiences.
        <br /><br />
        Every project is built with clean architecture, robust security, and responsive design—making sure the application is scalable, maintainable, and visually captivating.
      </p>

      {/* Recognition List with Interactive Image Hover */}
      <ul className="award-list divide-y divide-white/10">
        {awards.map((award, index) => (
          <li
            key={index}
            className="award-item relative flex items-center justify-between py-5 cursor-pointer group"
            onMouseEnter={() => setHoveredIdx(index)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="left">
              <h6 className="award_name letter-space--2 text-white font-medium text-lg group-hover:text-[#00DE51] transition-colors">
                {award.name}
              </h6>
              <p className="award_desc text-white/50 text-xs mt-1">{award.desc}</p>
            </div>
            <h6 className="award_year text-white/70 font-mono text-sm">{award.year}</h6>
            <div
              className="award_img hover-image absolute right-28 top-1/2 -translate-y-1/2 pointer-events-none rounded-xl overflow-hidden shadow-2xl z-30 transition-all duration-300 border border-white/20"
              style={{
                opacity: hoveredIdx === index ? 1 : 0,
                transform: hoveredIdx === index ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0.8)",
              }}
            >
              <img
                loading="lazy"
                width={158}
                height={224}
                src={award.img}
                alt={award.name}
                className="rounded-xl object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
