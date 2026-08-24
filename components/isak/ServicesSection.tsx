"use client";
import { useState } from "react";

const services = [
  {
    id: "service-1",
    title: "Web Design",
    img1: "/assets/images/section/service-1.jpg",
    img2: "/assets/images/section/service-2.jpg",
    tags: ["Visual Design", "Interaction Design", "Responsive Layouts"],
    desc: "I design modern, responsive websites that balance creativity with usability, making sure your digital presence feels seamless and memorable.",
  },
  {
    id: "service-2",
    title: "No-Code Development",
    img1: "/assets/images/section/service-3.jpg",
    img2: "/assets/images/section/service-4.jpg",
    tags: ["Framer Builds", "Webflow Sites", "Scalable Launches"],
    desc: "Build fast, scalable websites using tools like Framer and Webflow—helping you launch quickly with designs that are easy to edit and maintain.",
  },
  {
    id: "service-3",
    title: "Brand Identity",
    img1: "/assets/images/section/service-5.jpg",
    img2: "/assets/images/section/service-6.jpg",
    tags: ["Logo Design", "Visual Systems", "Brand Guidelines"],
    desc: "I craft cohesive brand systems with logos, colors, and typography that reflect your values—making your business recognizable and trusted.",
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("service-1");

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <div id="service" className="section-service flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div mb-0">
        <i className="icon icon-service"></i>Services
      </div>

      <div id="accordion-service">
        {services.map((srv) => {
          const isOpen = activeId === srv.id;
          return (
            <div key={srv.id} className="service-accordion_item scrolling-effect effectBottom">
              <button
                type="button"
                onClick={() => toggleAccordion(srv.id)}
                className={`accordion-action w-full text-start flex justify-between items-center ${!isOpen ? "collapsed" : ""}`}
                aria-expanded={isOpen}
              >
                <h4 className="text letter-space--2 text-black-72">{srv.title}</h4>
                <div className="ic-wrap">
                  <span className="ic-accordion-custom"></span>
                </div>
              </button>

              <div
                className={`collapse ${isOpen ? "show" : ""}`}
                style={{
                  display: isOpen ? "block" : "none",
                  transition: "all 0.35s ease",
                }}
              >
                <div className="accordion-content">
                  <div className="tf-grid-layout sm-col-2">
                    <div className="service-image">
                      <div className="wrap_image">
                        <img
                          alt={srv.title}
                          loading="lazy"
                          width={340}
                          height={206}
                          src={srv.img1}
                        />
                      </div>
                    </div>
                    <div className="service-image">
                      <div className="wrap_image">
                        <img
                          alt={srv.title}
                          loading="lazy"
                          width={340}
                          height={206}
                          src={srv.img2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="service-tag">
                    {srv.tags.map((tag, idx) => (
                      <span key={idx} className="tag-item text-body-3 fw-medium text-black-72 link">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="service-desc text-black-56">{srv.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
