"use client";

import Link from "next/link";

interface ExploreCtaRetroProps {
  content?: Record<string, string>;
}

export default function ExploreCtaRetro({ content }: ExploreCtaRetroProps) {
  const ticketNumber = content?.["explore.ticketNumber"] || "TICKET #EXP-2026";
  const heading = content?.["explore.heading"] || "Want to explore more?";
  const desc =
    content?.["explore.desc"] ||
    "Read comprehensive technical breakdowns, study MERN stack architectures, watch full YouTube masterclasses, and browse continuous learning guides.";
  const btnText =
    content?.["explore.btnText"] || "Explore More (Blogs & Courses) →";
  const stickyNote =
    content?.["explore.stickyNote"] ||
    "“No gatekeeping. Every tutorial, course, and essay is open for everyone to learn.”";

  return (
    <section className="py-20 sm:py-24 border-b-2 border-[#191712] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Retro Boarding Pass / Ticket Container */}
        <div className="hand-box p-8 sm:p-12 bg-[#FFFFFF] relative">
          
          {/* Top Perforation / Ticket Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-[#191712] pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-typewriter text-xs font-bold uppercase bg-[#FFE45E] border border-[#191712] px-3 py-1 text-[#191712]">
                {ticketNumber}
              </span>
              <span className="font-typewriter text-xs text-[#78716C]">
                GATEWAY TO THE KNOWLEDGE BASE
              </span>
            </div>
            <div className="stamp-gold-cert text-[10px] w-auto h-auto py-1 px-3 rounded border-[#191712] text-[#191712] bg-[#FFE45E]/30 font-bold">
              FREE ADMISSION
            </div>
          </div>

          {/* Ticket Content */}
          <div className="max-w-2xl">
            <h2 className="font-script font-bold text-4xl sm:text-5xl lg:text-6xl text-[#191712] leading-tight">
              {heading.includes("explore more") ? (
                <>
                  {heading.split("explore more")[0]}
                  <span className="marked">explore more</span>
                  {heading.split("explore more")[1]}
                </>
              ) : (
                heading
              )}
            </h2>

            <p className="font-hand text-xl sm:text-2xl text-[#57534E] mt-4 leading-relaxed">
              {desc}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/explore"
                className="btn-hand-black text-lg py-3 px-8 inline-flex items-center gap-3"
              >
                <span>{btnText}</span>
              </Link>
            </div>
          </div>

          {/* Pinned Yellow Sticky Note */}
          <div className="hidden md:block absolute -top-5 right-8 w-60 p-4 bg-[#FFEAA0] border-2 border-[#191712] shadow-[3px_4px_0px_#191712] rotate-[3deg]">
            <p className="font-hand text-lg text-[#191712] leading-snug">
              {stickyNote}
            </p>
          </div>

          {/* Barcode bottom line */}
          <div className="mt-10 pt-4 border-t border-[#191712]/20 flex flex-wrap items-center justify-between gap-2 font-typewriter text-xs text-[#78716C]">
            <span>CLASS: ALL ACCESS PASS</span>
            <span>DESTINATION: /EXPLORE HUB</span>
            <span>BARCODE: ||||| | ||||| || |||||| | |||</span>
          </div>

        </div>

      </div>
    </section>
  );
}
