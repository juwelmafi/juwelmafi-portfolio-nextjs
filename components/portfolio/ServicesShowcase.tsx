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
    <div className="w-full">
      {/* Services List (Separated with generous spacing) */}
      <div className="flex flex-col" style={{ gap: "2rem" }}>
        {initialServices.map((srv, idx) => {
          const isOpen = activeId === (srv.id || String(idx));
          const serviceId = srv.id || String(idx);

          return (
            <div
              key={serviceId}
              className={`glass-drop-card rounded-3xl transition-all duration-300 overflow-hidden ${
                isOpen ? "shadow-2xl shadow-[#00DE51]/20" : ""
              }`}
              style={{
                border: "none",
                outline: "none",
                marginBottom: "2rem",
              }}
            >
              {/* Header Toggle */}
              <button
                type="button"
                onClick={() => toggleAccordion(serviceId)}
                className="w-full text-start flex justify-between items-center p-6 sm:p-8 cursor-pointer gap-4 border-none outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1">
                  <div
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 text-[#00DE51]"
                    style={{
                      background: "rgba(0, 222, 81, 0.12)",
                      border: "none",
                    }}
                  >
                    {idx === 0 ? <FaCode className="text-xl" /> : idx === 1 ? <FaRocket className="text-xl" /> : <FaShieldAlt className="text-xl" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="heading-font text-white font-bold text-lg sm:text-xl md:text-2xl transition-colors truncate sm:whitespace-normal">
                      {srv.title}
                    </h3>
                    {!isOpen && (
                      <p className="text-white/50 text-xs sm:text-sm mt-1 line-clamp-1">
                        {srv.desc}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full shrink-0 ml-2 shadow-sm"
                  style={{
                    background: isOpen ? "rgba(0, 222, 81, 0.18)" : "rgba(255, 255, 255, 0.08)",
                    color: isOpen ? "#00DE51" : "#FFFFFF",
                    border: "none",
                  }}
                >
                  <span className="font-mono text-xl font-bold leading-none">{isOpen ? "−" : "+"}</span>
                </div>
              </button>

              {/* Accordion Expandable Content */}
              {isOpen && (
                <div
                  className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 animate-fadeIn"
                  style={{ border: "none !important" }}
                >
                  {/* Detailed Description */}
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
                    {srv.desc}
                  </p>

                  {/* Dual Images Preview */}
                  {(srv.img1 || srv.img2) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                      {srv.img1 && (
                        <div
                          className="rounded-2xl overflow-hidden aspect-video shadow-lg"
                          style={{
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "none !important",
                          }}
                        >
                          <img
                            alt={srv.title}
                            loading="lazy"
                            src={srv.img1}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {srv.img2 && (
                        <div
                          className="rounded-2xl overflow-hidden aspect-video shadow-lg"
                          style={{
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "none !important",
                          }}
                        >
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

                  {/* Feature Deliverables Checklist (Borderless Glass Drop Card) */}
                  {srv.features && srv.features.length > 0 && (
                    <div
                      className="mb-8 p-6 sm:p-7 rounded-2xl shadow-inner"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "none !important",
                      }}
                    >
                      <h4 className="text-xs uppercase tracking-widest text-[#00DE51] font-bold mb-4">
                        Key Deliverables &amp; Scope
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {srv.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                            <FaCheckCircle className="text-[#00DE51] text-xs shrink-0 mt-1" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Tags & Inquire CTA Button */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-4"
                    style={{ border: "none !important" }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {(srv.tags || []).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3.5 py-1.5 text-xs font-medium rounded-full"
                          style={{
                            background: "rgba(255, 255, 255, 0.06)",
                            color: "rgba(255, 255, 255, 0.85)",
                            border: "none !important",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/contact?service=${encodeURIComponent(srv.title)}`}
                      className="service-cta-btn shrink-0"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.6rem",
                        padding: "12px 28px",
                        borderRadius: "14px",
                        background: "#00DE51",
                        color: "#0A0A14",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        border: "none",
                        outline: "none",
                        textDecoration: "none",
                        boxShadow: "0 6px 20px rgba(0, 222, 81, 0.35)",
                      }}
                    >
                      <span>Inquire Service</span>
                      <FaArrowRight className="text-xs ml-0.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner (Borderless Ambient Glass Drop) */}
      <div
        className="p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden shadow-2xl"
        style={{
          background: "radial-gradient(130% 130% at 50% 10%, rgba(0, 222, 81, 0.08) 0%, rgba(20, 24, 38, 0.95) 100%)",
          border: "none",
          outline: "none",
          marginTop: "4rem",
        }}
      >
        <div className="max-w-xl mx-auto relative z-10">
          <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-black bg-[#00DE51] inline-block mb-3 shadow-sm">
            Let&apos;s Build Together
          </span>
          <h3 className="heading-font text-2xl sm:text-3xl font-bold text-white mb-3">
            Have a Custom Project in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mb-8 leading-relaxed max-w-lg mx-auto">
            Whether you need a full-scale web application, architectural consultation, or frontend UI modernization, I’m available for freelance and contractual collaborations.
          </p>
          <Link
            href="/contact"
            className="service-cta-btn-lg"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "16px 36px",
              borderRadius: "16px",
              background: "#00DE51",
              color: "#0A0A14",
              fontWeight: 700,
              fontSize: "1rem",
              border: "none",
              outline: "none",
              textDecoration: "none",
              boxShadow: "0 8px 30px rgba(0, 222, 81, 0.45)",
            }}
          >
            <span>Get a Free Consultation</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}
