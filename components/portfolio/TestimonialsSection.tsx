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

      <div className="heading overflow-hidden flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
        <div className="head-left">
          <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade font-bold text-2xl md:text-3xl mb-6">
            Here&apos;s what <br className="d-none d-lg-block" />
            people are saying
          </h4>
          <div className="box-counter effectFade fadeUp no-div flex gap-8">
            <div className="wg-counter">
              <p className="counter text-4xl md:text-5xl font-bold font-mono text-white flex items-center">
                <span className="number text-[#00DE51]">20</span>+
              </p>
              <p className="text-white/70 text-xs md:text-sm font-medium mt-1">Completed projects</p>
            </div>
            <div className="wg-counter">
              <p className="counter text-4xl md:text-5xl font-bold font-mono text-white flex items-center">
                <span className="number text-[#00DE51]">99</span>%
              </p>
              <p className="text-white/70 text-xs md:text-sm font-medium mt-1">Client satisfaction</p>
            </div>
          </div>
        </div>

        {/* Client Photo */}
        <div className="head-image relative overflow-hidden rounded-3xl w-48 h-56 shrink-0 bg-white/5 border border-white/10 shadow-2xl">
          <img
            alt={item.author}
            loading="lazy"
            width={236}
            height={297}
            src={item.img}
            className="w-full h-full object-cover rounded-3xl transition-opacity duration-500"
          />
        </div>
      </div>

      {/* Quote & Author Card */}
      <div className="swiper-testimonial_wrap effectFade fadeUp no-div p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl shadow-2xl">
        <div className="testimonial-v01">
          <div className="tes-icon text-[#00DE51] text-3xl mb-4">
            <i className="icon icon-quote"></i>
          </div>
          <h5 className="tes-text letter-space--2 text-white font-medium text-base md:text-xl leading-relaxed min-h-[90px]">
            &ldquo;{item.quote}&rdquo;
          </h5>
          <div className="tes-author mt-6 pt-5 border-t border-white/10">
            <p className="author_name font-bold text-white text-base md:text-lg">{item.author}</p>
            <p className="text-body-3 text-white/60 text-xs md:text-sm mt-0.5">{item.role}</p>
          </div>
        </div>

        {/* Pagination and Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
          <p className="text-body-3 text-white/60 text-xs md:text-sm font-mono">
            <span className="text-[#00DE51] font-bold">0{current + 1}</span> / 0{testimonials.length}
          </p>
          <div className="group-btn flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="p-3 rounded-full border border-white/20 hover:border-[#00DE51] hover:text-[#00DE51] text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              aria-label="Previous testimonial"
            >
              <i className="icon icon-arrow-caret-left"></i>
            </button>
            <button
              type="button"
              onClick={next}
              className="p-3 rounded-full border border-white/20 hover:border-[#00DE51] hover:text-[#00DE51] text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10"
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
