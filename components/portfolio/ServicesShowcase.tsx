"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight, FaCode, FaRocket, FaShieldAlt } from "react-icons/fa";
import { Service } from "@/types";

interface ServicesShowcaseProps {
  initialServices: Service[];
}

export default function ServicesShowcase({ initialServices }: ServicesShowcaseProps) {
  const [activeId, setActiveId] = useState<string>(initialServices[0]?.id || "");

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <div>
      {/* Services List */}
      <div className="space-y-6">
        {initialServices.map((srv, idx) => {
          const isOpen = activeId === (srv.id || String(idx));
          const serviceId = srv.id || String(idx);

          return (
            <div
              key={serviceId}
              className={`water-drop-card rounded-3xl transition-all duration-300 overflow-hidden border ${
                isOpen ? "border-[#00DE51]/40 shadow-xl shadow-[#00DE51]/10" : "border-white/10"
              }`}
            >
              {/* Header Toggle */}
              <button
                type="button"
                onClick={() => toggleAccordion(serviceId)}
                className="w-full text-start flex justify-between items-center p-6 sm:p-8 cursor-pointer gap-4"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#00DE51]/10 border border-[#00DE51]/20 flex items-center justify-center shrink-0 text-[#00DE51]">
                    {idx === 0 ? <FaCode className="text-lg" /> : idx === 1 ? <FaRocket className="text-lg" /> : <FaShieldAlt className="text-lg" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="heading-font text-white font-bold text-base sm:text-xl md:text-2xl group-hover:text-[#00DE51] transition-colors truncate sm:whitespace-normal">
                      {srv.title}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm mt-0.5 line-clamp-1">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 text-white shrink-0 ml-2 border border-white/10">
                  <span className="font-mono text-xl font-bold leading-none">{isOpen ? "−" : "+"}</span>
                </div>
              </button>

              {/* Accordion Expandable Content */}
              {isOpen && (
                <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-0 border-t border-white/10 animate-fadeIn">
                  {/* Detailed Description */}
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mt-6 mb-6">
                    {srv.desc}
                  </p>

                  {/* Dual Images Preview */}
                  {(srv.img1 || srv.img2) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {srv.img1 && (
                        <div className="rounded-2xl overflow-hidden aspect-video bg-white/5 border border-white/10">
                          <img
                            alt={srv.title}
                            loading="lazy"
                            src={srv.img1}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {srv.img2 && (
                        <div className="rounded-2xl overflow-hidden aspect-video bg-white/5 border border-white/10">
                          <img
                            alt={srv.title}
                            loading="lazy"
                            src={srv.img2}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feature Deliverables Checklist */}
                  {srv.features && srv.features.length > 0 && (
                    <div className="mb-6 bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/10">
                      <h4 className="text-xs uppercase tracking-widest text-[#00DE51] font-bold mb-3">
                        Key Deliverables &amp; Scope
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {srv.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                            <FaCheckCircle className="text-[#00DE51] text-xs shrink-0 mt-1" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Tags & CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {(srv.tags || []).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/contact?service=${encodeURIComponent(srv.title)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm !text-black transition-all hover:scale-105 shadow-md shadow-[#00DE51]/20 shrink-0 no-underline whitespace-nowrap"
                      style={{ background: "var(--accent)", color: "#000" }}
                    >
                      <span className="!text-black font-extrabold whitespace-nowrap">Inquire Service</span>
                      <FaArrowRight className="text-xs !text-black ml-0.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto relative z-10">
          <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-black bg-[#00DE51] inline-block mb-3">
            Let&apos;s Build Together
          </span>
          <h3 className="heading-font text-2xl sm:text-3xl font-bold text-white mb-3">
            Have a Custom Project in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mb-6 leading-relaxed">
            Whether you need a full-scale web application, architectural consultation, or frontend UI modernization, I’m available for freelance and contractual collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-sm !text-black shadow-xl shadow-[#00DE51]/25 hover:scale-105 transition-all no-underline"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            <span className="!text-black font-extrabold">Get a Free Consultation</span>
            <FaArrowRight className="text-xs !text-black" />
          </Link>
        </div>
      </div>
    </div>
  );
}
