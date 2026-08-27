"use client";
import { useState } from "react";

const testimonials = [
  {
    img: "/assets/images/section/tes-1.jpg",
    quote: "Working with Juwel was seamless. The web application came out fast, modern, and easy to maintain—exactly what our team needed.",
    author: "Daniel Ruiz",
    role: "Head of Product, Tempo App",
  },
  {
    img: "/assets/images/section/tes-2.jpg",
    quote: "Juwel shaped our vision into a robust full-stack platform. The development was fast, and the result gave our startup the edge we needed.",
    author: "Sophia Lee",
    role: "Co-Founder, Horizon Finance",
  },
  {
    img: "/assets/images/section/tes-3.jpg",
    quote: "Despite a tight launch schedule, Juwel delivered a clean, scalable site with Next.js. It’s performant, secure, and fits our needs perfectly.",
    author: "Michael Anders",
    role: "Marketing Director, Flowly",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const item = testimonials[current];

  return (
    <div id="testimonial" className="section-testimonial flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-tes"></i>Testimonials
      </div>

      <div className="heading overflow-hidden flex flex-col lg:flex-row justify-between items-start gap-8 mb-6">
        <div className="head-left">
          <h4 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
            Here&apos;s what <br className="d-none d-lg-block" />
            people are saying
          </h4>
          <div className="box-counter effectFade fadeUp no-div flex gap-6 mt-4">
            <div className="wg-counter">
              <p className="counter h1 d-flex font-2 letter-space--2 text-white font-bold">
                <span className="number">20</span>+
              </p>
              <p className="text text-white/60 text-xs">Completed projects</p>
            </div>
            <div className="wg-counter">
              <p className="counter h1 d-flex font-2 letter-space--2 text-white font-bold">
                <span className="number">99</span>%
              </p>
              <p className="text text-white/60 text-xs">Client satisfaction</p>
            </div>
          </div>
        </div>

        {/* Client Photo */}
        <div className="head-image relative overflow-hidden rounded-2xl w-48 h-56 shrink-0 bg-white/5 border border-white/10">
          <img
            alt={item.author}
            loading="lazy"
            width={236}
            height={297}
            src={item.img}
            className="w-full h-full object-cover rounded-2xl transition-opacity duration-500"
          />
        </div>
      </div>

      {/* Quote & Author Carousel */}
      <div className="swiper-testimonial_wrap effectFade fadeUp no-div p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="testimonial-v01">
          <div className="tes-icon text-[#00DE51] text-3xl mb-4">
            <i className="icon icon-quote"></i>
          </div>
          <h5 className="tes-text letter-space--2 text-white text-lg leading-relaxed min-h-[80px]">
            &ldquo;{item.quote}&rdquo;
          </h5>
          <div className="tes-author mt-4 pt-4 border-t border-white/10">
            <p className="author_name fw-medium text-white font-semibold">{item.author}</p>
            <p className="text-body-3 text-white/60 text-xs">{item.role}</p>
          </div>
        </div>

        {/* Pagination and Navigation */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-body-3 text-white/60 text-xs font-mono">
            <span className="text-white font-bold">0{current + 1}</span> / 0{testimonials.length}
          </p>
          <div className="group-btn flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="p-3 rounded-full border border-white/20 hover:border-white/50 text-white transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <i className="icon icon-arrow-caret-left"></i>
            </button>
            <button
              type="button"
              onClick={next}
              className="p-3 rounded-full border border-white/20 hover:border-white/50 text-white transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <i className="icon icon-arrow-caret-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
