"use client";

interface HeroRetroProps {
  content?: Record<string, string>;
}

export default function HeroRetro({ content }: HeroRetroProps) {
  const eyebrow = content?.["hero.eyebrow"] || "FULL-STACK ENGINEER & SHOPIFY DEVELOPER";
  const headline =
    content?.["hero.headline"] ||
    "Engineering High-Impact Web Applications & Scalable Platforms.";
  const tagline =
    content?.["hero.tagline"] ||
    "I build scalable full-stack web applications, custom Shopify stores, and modern digital platforms. Specialized in React, Next.js, Node.js, and MongoDB with clean architecture and pixel-perfect design.";
  const cta = content?.["hero.cta"] || "Explore My Work →";
  const ctaSecondary = content?.["hero.ctaSecondary"] || "Start a Project";
  const subtext =
    content?.["hero.subtext"] ||
    "Available for freelance projects, full-stack contracts, and remote engineering roles.";
  const subtextLink =
    content?.["hero.subtextLink"] || "View selected production cases and live deployments.";
  
  const check1 = content?.["hero.check1"] || "FAST PERFORMANCE";
  const check2 = content?.["hero.check2"] || "CLEAN ARCHITECTURE";
  const check3 = content?.["hero.check3"] || "MODERN TECH STACK";
  const check4 = content?.["hero.check4"] || "ON-TIME DELIVERY";

  const stickerRound = content?.["hero.stickerRound"] || "100%";
  const stickerOval = content?.["hero.stickerOval"] || "PRODUCTION READY";

  const name = content?.["hero.name"] || "Juwel Hossain";
  const avatar = content?.["hero.avatar"] || "/assets/images/avatar/juwel_retro.png";
  const certIssuer = content?.["hero.certIssuer"] || "JUWELMAFI.DEV";
  const certSerial = content?.["hero.certSerial"] || "JH-ENG-001";
  const certTitle = content?.["hero.certTitle"] || "Verified Engineer Dossier";
  const certSubtitle = content?.["hero.certSubtitle"] || "Full-Stack Web & E-Commerce Developer";
  const certStatus = content?.["hero.certStatus"] || "STATUS: AVAILABLE";
  const certIssued = content?.["hero.certIssued"] || "01 OCT 2026";
  const certExpires = content?.["hero.certExpires"] || "INDEFINITE";
  const certStatement =
    content?.["hero.certStatement"] ||
    "Proven expertise in end-to-end full-stack architectures, custom Shopify solutions, responsive frontends, and database optimization.";
  const certStamp = content?.["hero.certStamp"] || "VERIFIED ENGINEER";
  const certMrz =
    content?.["hero.certMrz"] ||
    "SWE<MERN000001<JUWEL<HOSSAIN<<<<<<<<<<<<<<<<<<\nSTATUS<ACTIVE<20261001<NEXTJS<REACT<NODE<MONGO<<<<";

  // Dynamic headline highlighter
  const renderHeadline = () => {
    // 1. Support custom markdown: **yellow highlight** and __underline__
    if (headline.includes("**") || headline.includes("__")) {
      const regex = /(\*\*[^*]+\*\*|__[^\_]+__)/g;
      const parts = headline.split(regex);
      return (
        <span className="whitespace-pre-line">
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <span key={i} className="marked">
                  {part.slice(2, -2)}
                </span>
              );
            }
            if (part.startsWith("__") && part.endsWith("__")) {
              return (
                <span key={i} className="underlined">
                  {part.slice(2, -2)}
                </span>
              );
            }
            return part;
          })}
        </span>
      );
    }

    // 2. Dynamic split on "&" if present, styling the terminal words with mark & underline
    if (headline.includes("&")) {
      const parts = headline.split("&");
      const firstPart = parts[0].trim();
      const secondPart = parts.slice(1).join("&").trim();

      const firstWords = firstPart.split(" ");
      let prefix = "";
      let markedTerm = "";
      if (firstWords.length > 2) {
        markedTerm = firstWords.slice(-2).join(" ");
        prefix = firstWords.slice(0, -2).join(" ");
      } else if (firstWords.length === 2) {
        prefix = firstWords[0];
        markedTerm = firstWords[1];
      } else {
        markedTerm = firstPart;
      }

      return (
        <>
          {prefix && <>{prefix} </>}
          {markedTerm && <span className="marked">{markedTerm}</span>}
          <br />
          &amp; <span className="underlined">{secondPart}</span>
        </>
      );
    }

    return <span className="whitespace-pre-line">{headline}</span>;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 border-b-2 border-[#191712] relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow */}
        <div className="mb-4 sm:mb-6">
          <p className="retro-eyebrow">
            {eyebrow}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (7 cols): Handwritten Headline, Lede, Buttons & Trust Row */}
          <div className="lg:col-span-7">
            <h1 className="font-script font-bold text-5xl sm:text-6xl lg:text-7xl text-[#191712] leading-[1.05] mb-6">
              {renderHeadline()}
            </h1>

            <p className="font-hand text-xl sm:text-2xl text-[#292524] leading-relaxed max-w-xl mb-8">
              {tagline}
            </p>

            {/* Buttons (No Emojis) */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <a href="#projects" className="btn-hand-black">
                {cta}
              </a>
              <a href="/contact" className="btn-hand-pink">
                {ctaSecondary}
              </a>
            </div>

            {/* Subtext under buttons */}
            <p className="font-hand text-base sm:text-lg text-[#57534E] mb-8">
              {subtext}{" "}
              <a href="#projects" className="underline hover:text-[#191712]">
                {subtextLink}
              </a>
            </p>

            {/* Bottom Red Checklist */}
            <div className="hero-checklist pt-4 border-t border-[#191712]/20">
              <span>✓ {check1}</span>
              <span>✓ {check2}</span>
              <span>✓ {check3}</span>
              <span>✓ {check4}</span>
            </div>
          </div>

          {/* Right Column (5 cols): The Physical Certificate with Tape & Stickers */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Certificate Container with Slight Tilt */}
            <div className="relative w-full max-w-md rotate-[-1.8deg] hover:rotate-0 transition-transform duration-300">
              
              {/* Top Masking Tape */}
              <div className="tape tape-top" aria-hidden="true" />

              {/* Top Right Round Yellow Sticker */}
              <div className="sticker sticker-round absolute -top-5 -right-5 z-20 font-bold" aria-hidden="true">
                <span>{stickerRound}</span>
              </div>

              {/* Bottom Left Cyan Oval Sticker */}
              <div className="sticker sticker-oval absolute -bottom-4 -left-4 z-20 font-bold uppercase text-[10px] tracking-wider" aria-hidden="true">
                {stickerOval}
              </div>

              {/* The Certificate Paper Card */}
              <div className="bg-[#FAF6EC] border-2 border-[#191712] rounded-sm p-6 sm:p-7 shadow-[5px_6px_0px_#191712] relative overflow-hidden">
                
                {/* Certificate Issuer & Serial Header */}
                <div className="flex items-center justify-between border-b-2 border-[#191712] pb-2.5 mb-4 font-typewriter text-xs text-[#191712]">
                  <span className="font-bold tracking-widest uppercase">{certIssuer}</span>
                  <span className="bg-[#191712] text-[#FBF6E6] px-2 py-0.5 font-bold tracking-wider text-[11px]">
                    {certSerial}
                  </span>
                </div>

                {/* Avatar & Recipient Information */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Retro Ink Doodle Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#191712] bg-[#FFFFFF] overflow-hidden shrink-0 shadow-[2px_2px_0px_#191712]">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Certificate Information */}
                  <div className="flex-1 min-w-0">
                    <p className="font-typewriter text-[11px] uppercase tracking-widest text-[#C2410C] font-bold">
                      {certTitle}
                    </p>
                    <h2 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-none my-1 truncate">
                      {name}
                    </h2>
                    <p className="font-hand text-sm sm:text-base text-[#57534E] leading-tight">
                      {certSubtitle}
                    </p>

                    <div className="flex flex-wrap gap-x-2.5 gap-y-1 mt-2.5 font-typewriter text-[10px] text-[#78716C] border-t border-[#191712]/20 pt-1.5">
                      <span>{certStatus}</span>
                      <span>•</span>
                      <span>ISSUED: {certIssued}</span>
                      <span>•</span>
                      <span>EXPIRES: {certExpires}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Statement & Rubber Stamp */}
                <div className="relative border-t border-[#191712]/30 py-3 my-2 flex items-center justify-between gap-2">
                  <p className="font-hand text-xs sm:text-sm text-[#292524] leading-snug max-w-[220px]">
                    {certStatement}
                  </p>

                  {/* Rubber Stamp */}
                  <div className="stamp-gold-cert shrink-0">
                    <span className="font-bold">
                      {certStamp.split(" ")[0] || "VERIFIED"}
                    </span>
                    <span>
                      {certStamp.split(" ").slice(1).join(" ") || "ENGINEER"}
                    </span>
                  </div>
                </div>

                {/* Passport MRZ Barcode line */}
                <div className="mt-2">
                  <p className="retro-mrz whitespace-pre-line">
                    {certMrz}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
