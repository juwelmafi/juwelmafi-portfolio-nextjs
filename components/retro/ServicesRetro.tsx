"use client";

import { useState } from "react";
import Link from "next/link";
import { Service } from "@/types";
import { FaPlus, FaCheck, FaArrowRight } from "react-icons/fa";

interface ServicesRetroProps {
  services?: Service[];
  content?: Record<string, string>;
}

const DEFAULT_FALLBACK_SERVICES: Service[] = [
  {
    id: "s-1",
    title: "MERN Website",
    kicker: "FULL-STACK DEVELOPMENT",
    desc: "Complete custom web platforms built with React, Next.js, Node.js, Express, and MongoDB. Fast, responsive, and secure.",
    deliverables: "Next.js 15 · MongoDB Atlas · REST & GraphQL · NextAuth",
    ribbon: "Most requested",
    order: 0,
    published: true,
  },
  {
    id: "s-2",
    title: "Shopify Website",
    kicker: "E-COMMERCE SOLUTION",
    desc: "High-converting custom Shopify storefronts, theme customization, Liquid development, and seamless app integrations.",
    deliverables: "Custom Liquid Theme · Speed Optimization · App Integrations",
    ribbon: "Popular",
    order: 1,
    published: true,
  },
  {
    id: "s-3",
    title: "Landing Page",
    kicker: "HIGH CONVERSION",
    desc: "High-impact single-page experiences tailored for products, SaaS launches, and marketing campaigns.",
    deliverables: "Pixel-Perfect Layout · Mobile-First · SEO Structured · Fast",
    ribbon: "",
    order: 2,
    published: true,
  },
  {
    id: "s-4",
    title: "Graphic Design & UI/UX",
    kicker: "DESIGN & BRANDING",
    desc: "Bespoke interface designs, interactive Figma prototypes, wireframing, and design-to-code implementations.",
    deliverables: "Figma Prototypes · Design System · Component Libraries",
    ribbon: "",
    order: 3,
    published: true,
  },
  {
    id: "s-5",
    title: "WordPress & CMS",
    kicker: "CONTENT PLATFORMS",
    desc: "Custom WordPress themes, WooCommerce stores, and Headless CMS architectures designed for easy client management.",
    deliverables: "Custom Theme · WooCommerce · ACF Pro · Easy Dashboard",
    ribbon: "",
    order: 4,
    published: true,
  },
  {
    id: "s-6",
    title: "API & Backend Architecture",
    kicker: "SYSTEM ENGINEERING",
    desc: "Robust REST and GraphQL API design, database modeling, authentication pipelines, and third-party integrations.",
    deliverables: "Node.js · Express · MongoDB · Cloudinary · Stripe Payments",
    ribbon: "",
    order: 5,
    published: true,
  },
];

export default function ServicesRetro({ services, content }: ServicesRetroProps) {
  const eyebrow = content?.["services.eyebrow"] || "SERVICES & SOLUTIONS";
  const title =
    content?.["services.title"] || "Handcrafted Engineering Services.";
  const desc =
    content?.["services.desc"] ||
    "Choose the exact service your project needs. Every solution is engineered from scratch with clean architecture, zero bloat, and full production care.";
  const bottomNote =
    content?.["services.bottomNote"] ||
    "Need a custom project or have a unique requirement? Send an inquiry through the contact form and I will review your specifications within 24 hours.";

  // Filter published services or fallback
  const activeServices =
    services && services.length > 0
      ? services.filter((s) => s.published !== false)
      : DEFAULT_FALLBACK_SERVICES;

  // 2 rows on desktop (3 cols * 2 = 6 cards initially)
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const displayedServices = activeServices.slice(0, visibleCount);
  const hasMore = activeServices.length > visibleCount;

  const handleLoadMore = () => {
    // Reveal next batch (or all remaining)
    setVisibleCount((prev) => prev + 6);
  };

  // Alternating card tilt styles matching retro paper aesthetic
  const tilts = [
    "rotate-[-1.2deg]",
    "rotate-[0.6deg]",
    "rotate-[-0.8deg]",
    "rotate-[1.1deg]",
    "rotate-[-0.5deg]",
    "rotate-[0.9deg]",
  ];

  return (
    <section id="services" className="py-16 sm:py-24 border-b-2 border-[#191712] relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="retro-eyebrow mb-2">
            {eyebrow}
          </p>
          <h2 className="font-script font-bold text-4xl sm:text-5xl lg:text-6xl text-[#191712] leading-tight mb-4">
            {title.includes("Engineering") ? (
              <>
                {title.split("Engineering")[0]}
                <span className="marked">Engineering Services.</span>
                {title.split("Engineering Services.")[1]}
              </>
            ) : (
              title
            )}
          </h2>
          <p className="font-hand text-lg sm:text-xl text-[#57534E] leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Services Cards Grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12">
          {displayedServices.map((service, idx) => {
            const tilt = tilts[idx % tilts.length];
            const isFeatured = Boolean(service.ribbon);
            const extraInfo =
              service.deliverables ||
              (service.features && service.features.length > 0
                ? service.features.slice(0, 2).join(" · ")
                : "Clean Code · Fast Delivery · 100% Responsive");

            return (
              <Link
                key={service.id || idx}
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className={`price group relative flex flex-col justify-between p-7 bg-white border-2 border-[#191712] rounded-lg transition-all duration-200 shadow-[4px_5px_0px_#191712] hover:shadow-[6px_8px_0px_#191712] hover:-translate-y-1 ${tilt} hover:rotate-0 cursor-pointer ${
                  isFeatured ? "price-popular ring-2 ring-[#191712]" : ""
                }`}
                title={`Inquire about ${service.title}`}
              >
                {/* Yellow Floating Ribbon / Sticker */}
                {service.ribbon && (
                  <span className="ribbon">
                    ★ {service.ribbon}
                  </span>
                )}

                {/* Card Header & Content */}
                <div>
                  {/* Category / Kicker */}
                  <span className="price-name text-[#C2410C] font-typewriter text-xs font-bold uppercase tracking-wider block mb-2">
                    {service.kicker || "SERVICE"}
                  </span>

                  {/* Service Name (Replaces the big price) */}
                  <h3 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight mb-3 group-hover:text-[#C2410C] transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="font-hand text-base sm:text-lg text-[#57534E] leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Deliverables Box */}
                <div className="mt-auto pt-4 border-t border-dashed border-[#191712]/30">
                  <div className="text-xs font-typewriter uppercase tracking-wider text-[#78716C] mb-1">
                    Deliverables &amp; Scope:
                  </div>
                  <div className="font-hand text-sm sm:text-base text-[#191712] font-bold line-clamp-2">
                    {extraInfo}
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-5 pt-3 border-t border-[#191712]/15 flex items-center justify-between text-xs font-typewriter uppercase font-bold text-[#191712] group-hover:text-[#C2410C] transition-colors">
                    <span>Inquire Now</span>
                    <span className="flex items-center gap-1">
                      Contact <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More Button (If more than 2 rows of services) */}
        {hasMore && (
          <div className="text-center pt-2 pb-6">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#FFE45E] text-[#191712] font-typewriter text-xs sm:text-sm uppercase tracking-wider font-bold border-2 border-[#191712] rounded-md shadow-[4px_4px_0px_#191712] hover:shadow-[2px_2px_0px_#191712] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <FaPlus className="text-xs" />
              Load More Services (+{activeServices.length - visibleCount})
            </button>
            <p className="font-hand text-xs text-[#78716C] mt-2">
              Showing {displayedServices.length} of {activeServices.length} services cataloged
            </p>
          </div>
        )}

        {/* Bottom Reassurance Note */}
        <div className="hand-dashed-box max-w-3xl mx-auto p-5 sm:p-6 mt-6 text-center">
          <p className="font-hand text-base sm:text-lg text-[#191712]">
            {bottomNote.includes("contact form") ? (
              <>
                {bottomNote.split("contact form")[0]}
                <Link
                  href="/contact"
                  className="font-bold underline text-[#C2410C] hover:text-[#191712] transition-colors"
                >
                  contact form
                </Link>
                {bottomNote.split("contact form")[1]}
              </>
            ) : (
              <Link
                href="/contact"
                className="font-bold underline text-[#C2410C] hover:text-[#191712] transition-colors"
              >
                {bottomNote}
              </Link>
            )}
          </p>
        </div>

      </div>
    </section>
  );
}
