"use client";

const projects = [
  {
    num: "01",
    title: "Drone",
    img: "/assets/images/section/work-1.jpg",
    desc: "Brand and website for a drone startup, blending futuristic visuals with trust-driven design",
    year: "2024",
    role: "Lead Product Designer",
    tags: ["Brand", "Website", "Webflow"],
  },
  {
    num: "02",
    title: "Durotan",
    img: "/assets/images/section/work-2.jpg",
    desc: "Minimal e-commerce identity and website crafted to highlight timeless fashion essentials",
    year: "2024",
    role: "Lead Product Designer",
    tags: ["Brand", "Website", "Webflow"],
  },
  {
    num: "03",
    title: "Nike Campaign",
    img: "/assets/images/section/work-3.jpg",
    desc: "Landing experience for Nike’s urban campaign, built to inspire movement and brand loyalty",
    year: "2024",
    role: "Lead Product Designer",
    tags: ["Brand", "Website", "Webflow"],
  },
];

export default function WorkHighlights() {
  return (
    <div id="work" className="section-work flat-spacing">
      <div className="sect-tag text-caption fw-medium">
        <i className="icon icon-high-light"></i>Work Highlights
      </div>

      <div className="work-list element-sticky">
        {projects.map((project) => (
          <div key={project.num} className="sticky-item">
            <div className="wg-work">
              <div className="work-image">
                <img
                  alt={project.title}
                  loading="lazy"
                  width={700}
                  height={427}
                  src={project.img}
                />
              </div>
              <div className="wrap">
                <div className="work-content">
                  <div className="w-image">
                    <img
                      alt={project.title}
                      loading="lazy"
                      width={468}
                      height={856}
                      src={project.img}
                    />
                  </div>
                  <div className="content">
                    <div className="content-top">
                      <div className="w-logo">
                        <img
                          loading="lazy"
                          width={40}
                          height={40}
                          src="/assets/images/logo/logo-2.svg"
                          alt="logo"
                        />
                      </div>
                      <h4 className="w-title letter-space--2 text-white-72">
                        {project.title}
                      </h4>
                      <p className="w-desc text-white-56 text-body-3">
                        {project.desc}
                      </p>
                      <div className="w-highlight">
                        <div className="box-high">
                          <p className="text-body-3 text-white-56">Year</p>
                          <p className="text-body-1 text-white-72">{project.year}</p>
                        </div>
                        <div className="box-high">
                          <p className="text-body-3 text-white-56">Role</p>
                          <p className="text-body-1 text-white-72">{project.role}</p>
                        </div>
                      </div>
                      <div className="w-tag-list">
                        {project.tags.map((tag, idx) => (
                          <div key={idx} className="tag">
                            <span className="text-body-3 fw-medium text-white-72">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="content-bottom">
                      <div className="br-line"></div>
                      <div className="group-action">
                        <a href="#contact" className="tf-btn-action style-white">
                          <span className="ic-wrap">
                            <i className="icon icon-arrow-right-top"></i>
                          </span>
                          <span className="text text-body-3 letter-space--05 fw-medium">
                            Let’s talk
                          </span>
                          <span className="ic-wrap">
                            <i className="icon icon-arrow-right-top"></i>
                          </span>
                        </a>
                        <p className="text-white-40">
                          <span className="text-white-72">{project.num}</span> / 03
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
