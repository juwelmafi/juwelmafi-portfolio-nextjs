"use client";

export default function FooterSection() {
  return (
    <div id="footer" className="tf-footer flat-spacing">
      {/* Steve Jobs Quote */}
      <div className="block-quote effectFade fadeUp no-div mb-8">
        <h5 className="quote-text font-3 fw-normal text-white text-xl leading-relaxed">
          <span className="text-white/40">&ldquo;</span>Design is not just what it looks like and feels like. Design is how it works.<span className="text-white/40">&rdquo;</span>
        </h5>
        <p className="quote-author font-3 text-white/60 h6 text-end mt-2">— Steve Jobs</p>
      </div>

      <div className="br-line my-8 border-t border-white/10"></div>

      {/* Stylized Typography Graphic & Logo */}
      <div className="foot-inner flex flex-col items-center gap-6 my-8">
        <div className="effectFade fadeUp no-div text-center">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-widest text-white/20 uppercase font-sans select-none">
            JUWEL
          </h2>
        </div>
        <a href="#home" className="f-logo effectFade fadeZoom mt-2">
          <div className="logo p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
            <img
              className="image-switch"
              data-light="/assets/images/logo/logo.svg"
              data-dark="/assets/images/logo/logo-2.svg"
              loading="lazy"
              width={32}
              height={32}
              src="/assets/images/logo/logo-2.svg"
              alt="Logo"
            />
          </div>
        </a>
      </div>

      {/* Copyright Footer */}
      <div className="foot-bottom flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
        <p className="text-nocopy text-white/50 text-xs effectFade fadeUp no-div">
          All rights reserved <br />© 2025 Juwel Hossain Portfolio
        </p>
        <p className="text-white/40 text-xs font-mono">
          Built with Next.js &amp; MongoDB
        </p>
      </div>
    </div>
  );
}
