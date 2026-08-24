"use client";
import { useState } from "react";

const testimonials = [
  {
    img: "/assets/images/section/tes-1.jpg",
    quote: "Working with Isak was seamless. The website came out fast, modern, and easy to update—exactly what our team needed.",
    author: "Daniel Ruiz",
    role: "Head of Product, Tempo App",
  },
  {
    img: "/assets/images/section/tes-2.jpg",
    quote: "Isak shaped our vision into a strong brand. The process was clear, fast, and the result gave our startup the professional edge we needed.",
    author: "Sophia Lee",
    role: "Co-Founder, Horizon Finance",
  },
  {
    img: "/assets/images/section/tes-3.jpg",
    quote: "Despite a tight launch schedule, Isak delivered a clean, flexible site in Framer. It’s modern, easy to manage, and fits our needs perfectly.",
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

      <div className="heading overflow-hidden flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="head-left">
          <h4 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
            Here&apos;s what <br className="d-none d-lg-block" />
            people are saying
          </h4>
          <div className="box-counter effectFade fadeUp no-div">
            <div className="wg-counter">
              <p className="counter h1 d-flex font-2 letter-space--2 text-black-72">
                <span className="number">26</span>+
              </p>
              <p className="text text-black-56">Finalized projects</p>
            </div>
            <div className="wg-counter">
              <p className="counter h1 d-flex font-2 letter-space--2 text-black-72">
                <span className="number">98</span>%
              </p>
              <p className="text text-black-56">Client satisfaction</p>
            </div>
          </div>
        </div>

        {/* Client Photo with subtle fade */}
        <div className="head-image relative overflow-hidden rounded-2xl">
          <div className="wrap-image">
            <img
              alt={item.author}
              loading="lazy"
              width={236}
              height={297}
              src={item.img}
              className="object-cover rounded-2xl transition-opacity duration-500"
            />
          </div>
        </div>
      </div>

      {/* Quote & Author Carousel */}
      <div className="swiper-testimonial_wrap effectFade fadeUp no-div mt-8">
        <div className="testimonial-v01">
          <div className="tes-icon">
            <i className="icon icon-quote"></i>
          </div>
          <h5 className="tes-text letter-space--2 text-black-72 min-h-[90px] transition-all duration-300">
            {item.quote}
          </h5>
          <div className="tes-author mt-4">
            <p className="author_name fw-medium text-black-72">{item.author}</p>
            <p className="text-body-3 text-black-56">{item.role}</p>
          </div>
        </div>

        {/* Pagination and Arrows */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-body-3 text-black-56">
            <span className="text-black-72 font-semibold">0{current + 1}</span> / 0{testimonials.length}
          </p>
          <div className="group-btn flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="sw-nav sw-nav-prev link p-3 rounded-full border border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <i className="icon icon-arrow-caret-left"></i>
            </button>
            <button
              type="button"
              onClick={next}
              className="sw-nav sw-nav-next link p-3 rounded-full border border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30 transition-colors"
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
