"use client";

interface TechnologiesRetroProps {
  content?: Record<string, string>;
}

export default function TechnologiesRetro({ content }: TechnologiesRetroProps) {
  const eyebrow = content?.["stack.eyebrow"] || "TECHNICAL EXPERTISE";
  const title = content?.["stack.title"] || "Introducing The Stack.";
  const desc =
    content?.["stack.desc"] ||
    "Designed without bloat. Engineered for production. Scalable architectures powering modern full-stack web applications and custom e-commerce platforms.";
  const boxTitle = content?.["stack.boxTitle"] || "What's in my toolkit?";
  const boxDesc =
    content?.["stack.boxDesc"] ||
    "MERN Stack, Next.js 15, React 19, Shopify Themes, WordPress, TypeScript, Node.js, MongoDB Atlas. Scalable, clean, and tested for production.";
  const sticker = content?.["stack.sticker"] || "certified clean";
  const specTitle = content?.["stack.specTitle"] || "TECHNICAL SPECIFICATION";

  const specs = [
    { key: "MERN STACK", val: content?.["stack.skillMern"] || "MongoDB, Express, React & Node.js" },
    { key: "NEXT.JS & REACT", val: content?.["stack.skillNextjs"] || "Next.js 15, App Router, React 19 & SSR" },
    { key: "SHOPIFY & LIQUID", val: content?.["stack.skillShopify"] || "Custom Theme Dev, Liquid & Store Customization" },
    { key: "WORDPRESS & CMS", val: content?.["stack.skillWordpress"] || "Custom Themes, WooCommerce & Headless CMS" },
    { key: "LANGUAGES", val: content?.["stack.skillLanguages"] || "TypeScript (Strict), JavaScript ES6+, HTML5/CSS3" },
    { key: "BACKEND & DB", val: content?.["stack.skillBackend"] || "Node.js, Express API, MongoDB Atlas & REST/GraphQL" },
    { key: "OTHER TECH", val: content?.["stack.skillTools"] || "TailwindCSS, Git, Vercel, Docker & Cloudinary" },
    {
      key: "DELIVERY",
      val: content?.["stack.skillQuality"] || "Clean Architecture & Zero Bloat",
      isSpecial: true,
    },
  ];

  return (
    <section id="technologies" className="py-16 sm:py-20 border-b-2 border-[#191712] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow */}
        <div className="mb-4">
          <p className="retro-eyebrow">
            {eyebrow}
          </p>
        </div>

        {/* Two-Column Grid matching Reference Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading, Lede & "What's in the box?" dashed ASCII box */}
          <div className="lg:col-span-6">
            <h2 className="font-script font-bold text-5xl sm:text-6xl text-[#191712] leading-[1.05] mb-6">
              {title.includes("The Stack") ? (
                <>
                  {title.split("The Stack")[0]}<br />
                  <span className="marked">The Stack.</span>
                  {title.split("The Stack")[1]?.replace(".", "")}
                </>
              ) : (
                title
              )}
            </h2>

            <p className="font-hand text-xl sm:text-2xl text-[#292524] leading-relaxed mb-8">
              {desc}
            </p>

            {/* Toolkit Dashed Box */}
            <div className="hand-dashed-box flex items-start gap-4 max-w-lg mt-4">
              <div className="w-11 h-11 rounded-lg bg-[#FFE45E] border-2 border-[#191712] flex items-center justify-center font-mono font-bold text-base text-[#191712] shrink-0 shadow-[2px_2px_0px_#191712] mt-0.5">
                &lt;/&gt;
              </div>
              <div>
                <h3 className="font-script font-bold text-2xl sm:text-3xl text-[#191712] leading-tight mb-1">
                  {boxTitle}
                </h3>
                <p className="font-hand text-base sm:text-lg text-[#57534E] leading-normal">
                  {boxDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Specification Sheet with Starburst Sticker */}
          <div className="lg:col-span-6">
            <div className="relative rotate-0 sm:rotate-[-0.8deg] hover:rotate-0 transition-transform duration-300">
              
              {/* Top-Right Starburst Sticker */}
              <div className="sticker-star -top-4 -right-2 sm:-top-5 sm:-right-5 z-20 scale-75 sm:scale-100 origin-top-right" aria-hidden="true">
                <span className="whitespace-pre-line">{sticker}</span>
              </div>

              {/* Hand-drawn Card Container */}
              <div className="hand-box p-4 sm:p-7 md:p-9 bg-[#FFFFFF] relative">
                
                {/* Title */}
                <p className="font-typewriter text-[11px] sm:text-xs uppercase tracking-widest text-[#C2410C] font-bold pb-2.5 sm:pb-3 border-b-2 border-[#191712] mb-3 sm:mb-4">
                  {specTitle}
                </p>

                {/* Dotted Spec Rows */}
                <div className="space-y-1">
                  {specs.map((item, idx) => (
                    <div key={idx} className="spec-dotted-row">
                      <span className="spec-dotted-key">{item.key}</span>
                      <span
                        className={
                          item.isSpecial
                            ? "font-script font-bold text-lg sm:text-2xl text-[#191712] text-right flex-1 min-w-0 break-words leading-tight"
                            : "spec-dotted-val"
                        }
                      >
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footnote */}
                <p className="font-hand text-[11px] sm:text-xs text-[#78716C] mt-4 sm:mt-5">
                  {content?.["stack.footnote"] || "*All solutions built with clean, scalable, production-tested code."}
                </p>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
