"use client";
import { useState } from "react";

const highlights = [
  { name: "Full-Stack Development", desc: "React, Next.js, Node.js & MongoDB", year: "Core", img: "/assets/images/section/award-1.jpg" },
  { name: "Clean & Reusable Code",  desc: "Component architecture & modular APIs", year: "Focus", img: "/assets/images/section/award-2.jpg" },
  { name: "Content Creation",       desc: "YouTube Developer & Self-Growth Videos", year: "@juwelmafi", img: "/assets/images/section/award-3.jpg" },
  { name: "Computer Science & Eng", desc: "Sonargaon University (CSE)", year: "Active", img: "/assets/images/section/award-4.jpg" },
  { name: "Continuous Learning",    desc: "1% Better Every Single Day", year: "Mindset", img: "/assets/images/section/award-5.jpg" },
];

export default function AboutSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div id="about" className="section-about flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle"></i>About Me
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-6 font-semibold text-2xl md:text-3xl">
        Passionate MERN Stack Developer <br className="d-none d-lg-block" />
        crafting scalable web applications <br className="d-none d-lg-block" />
        with clean architecture &amp; speed
      </h4>
      <div className="s-desc text-white/80 space-y-4 leading-relaxed mb-8 text-sm md:text-base">
        <p>
          I’m a passionate <strong className="text-white">MERN Stack Developer</strong> based in Bangladesh with a strong focus on frontend and full-stack solutions. I enjoy crafting interactive, accessible, and scalable web applications.
        </p>
        <p>
          I’m currently studying <strong className="text-[#00DE51]">Computer Science &amp; Engineering (CSE) at Sonargaon University</strong>, channeling my deep love for coding into building modern web experiences that solve real-world problems.
        </p>
        <p>
          Beyond writing clean code, I believe in focused learning, self-discipline, and improving 1% every day. I also create self-development and tech content on <strong className="text-white">YouTube (@juwelmafi)</strong> to help aspiring learners grow with structure.
        </p>
      </div>

      {/* Highlights & Values List */}
      <ul className="award-list divide-y divide-white/10">
        {highlights.map((item, index) => (
          <li
            key={index}
            className="award-item relative flex items-center justify-between py-4 cursor-pointer group"
            onMouseEnter={() => setHoveredIdx(index)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="left">
              <h6 className="award_name letter-space--2 text-white font-medium text-base md:text-lg group-hover:text-[#00DE51] transition-colors">
                {item.name}
              </h6>
              <p className="award_desc text-white/50 text-xs mt-0.5">{item.desc}</p>
            </div>
            <h6 className="award_year text-white/70 font-mono text-xs md:text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10">{item.year}</h6>
            <div
              className="award_img hover-image absolute right-32 top-1/2 -translate-y-1/2 pointer-events-none rounded-xl overflow-hidden shadow-2xl z-30 transition-all duration-300 border border-white/20"
              style={{
                opacity: hoveredIdx === index ? 1 : 0,
                transform: hoveredIdx === index ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0.8)",
              }}
            >
              <img
                loading="lazy"
                width={158}
                height={224}
                src={item.img}
                alt={item.name}
                className="rounded-xl object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
