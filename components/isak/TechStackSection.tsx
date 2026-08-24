"use client";

const tools = [
  {
    name: "Figma",
    duty: "Leading design tool",
    icon: "/assets/images/section/tech-1.svg",
    iconDark: "/assets/images/section/tech-1.svg",
    width: 19,
    progress: 80,
  },
  {
    name: "Framer",
    duty: "No-code website builder",
    icon: "/assets/images/section/tech-2.svg",
    iconDark: "/assets/images/section/tech-2_dark.svg",
    width: 18,
    progress: 90,
  },
  {
    name: "Adobe Photoshop",
    duty: "Raster graphics editor",
    icon: "/assets/images/section/tech-3.svg",
    iconDark: "/assets/images/section/tech-3.svg",
    width: 29,
    progress: 60,
  },
];

export default function TechStackSection() {
  return (
    <div id="tech" className="section-tech-stack flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-tech-stack"></i>Tech Stack
      </div>
      <h4 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        See how my expertise with these <br className="d-none d-sm-block" /> tools drives better results
      </h4>

      <ul className="tech-list">
        {tools.map((t, idx) => (
          <li key={idx} className="wg-tech">
            <div className="tech-infor effectFade fadeUp no-div">
              <div className="tech_image">
                <img
                  className="image-switch"
                  data-light={t.icon}
                  data-dark={t.iconDark}
                  loading="lazy"
                  width={t.width}
                  height={28}
                  src={t.icon}
                  alt={t.name}
                />
              </div>
              <div className="tech_info">
                <p className="info__name fw-medium text-black-72">{t.name}</p>
                <p className="info__duty text-black-56 text-body-3">{t.duty}</p>
              </div>
            </div>
            <div className="tech-progress">
              <div className="progress-line" style={{ width: `${t.progress}%` }}>
                <p className="progress-num text-caption">
                  <span className="counter">
                    <span className="number">{t.progress}</span>%
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
