"use client";
import { useState } from "react";

const awards = [
  { name: "Website of the Day", desc: "CSSDA", year: "2019", img: "/assets/images/section/award-1.jpg" },
  { name: "Public Awards - UI",  desc: "CSSDA", year: "2019", img: "/assets/images/section/award-2.jpg" },
  { name: "Public Awards - INN", desc: "CSSDA", year: "2019", img: "/assets/images/section/award-3.jpg" },
  { name: "Site of the Month",   desc: "Awwwards", year: "2018", img: "/assets/images/section/award-4.jpg" },
  { name: "Site of the Day",     desc: "Awwwards", year: "2017", img: "/assets/images/section/award-5.jpg" },
];

export default function AboutSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div id="about" className="section-about flat-spacing" onMouseMove={handleMouseMove}>
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle"></i>About
      </div>
      <h4 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        Designing brands and <br className="d-none d-lg-block" />
        websites with clarity, creativity, <br className="d-none d-lg-block" />
        and no-code speed
      </h4>
      <p className="s-desc text-black-56 scrolling-effect effectTop">
        I combine web design, brand identity, and no-code development to help
        <br className="d-none d-lg-block" /> businesses move faster while staying true to their personality.
        <br /><br />
        Every project is approached with both strategy and style—making sure
        <br className="d-none d-lg-block" /> design isn’t just good-looking, but also purposeful and effective.
      </p>

      {/* Award List with Interactive Image Hover */}
      <ul className="award-list">
        {awards.map((award, index) => (
          <li
            key={index}
            className="award-item hover-cursor-img"
            onMouseEnter={() => setHoveredIdx(index)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="left">
              <h6 className="award_name letter-space--2 text-black-72">{award.name}</h6>
              <p className="award_desc text-black-56">{award.desc}</p>
            </div>
            <h6 className="award_year text-black-72">{award.year}</h6>
            <div
              className={`award_img hover-image ${hoveredIdx === index ? "visible" : ""}`}
              style={{
                opacity: hoveredIdx === index ? 1 : 0,
                transform: hoveredIdx === index ? "scale(1)" : "scale(0.8)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <img
                loading="lazy"
                width={158}
                height={224}
                src={award.img}
                alt={award.name}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
