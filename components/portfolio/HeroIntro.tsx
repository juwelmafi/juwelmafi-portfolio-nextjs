"use client";
import Marquee from "react-fast-marquee";

const techList = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind CSS", "Firebase", "Stripe"
];

export default function HeroIntro() {
  return (
    <div id="home" className="section-intro flat-spacing">
      {/* Intro Author Badge */}
      <div className="intro-author effectFade fadeUp no-div flex items-center gap-3 p-2 pr-4 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
        <div className="author-image w-8 h-8 rounded-full overflow-hidden shrink-0">
          <img
            loading="lazy"
            width={32}
            height={32}
            src="/assets/images/avatar/avatar-boy.png"
            alt="Juwel"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="author-info letter-space--05">
          <p className="info_name text-white font-semibold text-xs md:text-sm">Juwel Hossain</p>
          <p className="info_duty text-white/60 text-xs">
            MERN Stack &amp; Next.js Developer
          </p>
        </div>
      </div>

      {/* Main Hero Headline */}
      <h1 className="intro-title letter-space--2 text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
        I’m building <span className="is-bg active">websites</span> <br />
        <span className="type-2 is-bg active">&amp; platforms</span> that people remember
      </h1>

      {/* Scribble SVG & Rotating Circular Badge */}
      <div className="intro-item relative my-8">
        <div className="scribble-wrap overflow-hidden max-w-full">
          <svg
            className="scribble max-w-full h-auto"
            viewBox="0 0 772 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="paint0_linear_268_462"
                x1="12"
                y1="107"
                x2="752"
                y2="66"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.2" />
                <stop className="bred" offset="0.466346" stopColor="#00DE51" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              id="scribblePath"
              d="M12 104.315C34.6667 116.269 92.8 137.913 144 128.853C208 117.528 317 33.5324 356 27.8698C395 22.2072 502 20 530 79.1463C557.711 137.682 582 217 477 281.743C423.902 314.483 308 281.433 365 188C422 94.5672 544 65.6205 597 81.6645C650 97.7085 732 88.2708 752 64.6767"
              stroke="url(#paint0_linear_268_462)"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Rotating Circular Text Badge */}
        <div className="wg-curve-text">
          <div className="icon">
            <svg
              width="66"
              height="77"
              viewBox="0 0 66 77"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.0087 0.873025C43.5379 -1.39092 54.7025 10.7245 61.1553 28.2867L61.4572 29.1225C67.684 46.6467 66.8028 62.8769 59.3914 65.6003L59.0353 65.7187C57.4604 66.1922 55.7272 66.0345 53.9106 65.3315C52.9107 67.1734 51.5757 68.4719 49.9077 69.0848L49.5517 69.2032C47.8627 69.7111 45.9915 69.494 44.031 68.6556C43.0123 70.6987 41.611 72.1331 39.831 72.7872L39.475 72.9056C37.9 73.3792 36.1669 73.2214 34.3503 72.5184C33.3504 74.3604 32.0154 75.6588 30.3474 76.2717L29.9913 76.3901C22.4621 78.6546 11.2976 66.539 4.84471 48.9764C-1.71056 31.1351 -0.920706 14.4292 6.60864 11.6627L6.96468 11.5444C8.53922 11.071 10.2719 11.2285 12.0881 11.931C13.088 10.089 14.4242 8.79122 16.0923 8.17825L16.4483 8.05992C18.1368 7.55221 20.0078 7.76906 21.9678 8.60692C22.9864 6.56371 24.3889 5.12997 26.169 4.47585L26.525 4.35752C28.0993 3.88414 29.8323 4.04093 31.6481 4.74323C32.648 2.90144 33.9848 1.6043 35.6526 0.991355L36.0087 0.873025Z"
                fill="#00DE51"
              />
            </svg>
          </div>
          <div className="text-rotate">
            <svg viewBox="0 0 100 100" width="120" height="120" className="animate-spin-slow">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fontSize="8" letterSpacing="2.2" fill="#FFFFFF" fontWeight="600">
                <textPath href="#circlePath">
                  MERN STACK DEVELOPER • JUWEL • 2025 •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Counters */}
      <div className="box-counter effectFade fadeUp no-div flex items-center gap-10 my-8">
        <div className="wg-counter">
          <p className="counter text-4xl md:text-5xl font-bold font-mono text-white flex items-center">
            <span className="number text-[#00DE51]">3</span>+
          </p>
          <p className="text text-white/70 text-xs md:text-sm font-medium mt-1">Years of experience</p>
        </div>
        <div className="wg-counter">
          <p className="counter text-4xl md:text-5xl font-bold font-mono text-white flex items-center">
            <span className="number text-[#00DE51]">20</span>+
          </p>
          <p className="text text-white/70 text-xs md:text-sm font-medium mt-1">Projects Delivered</p>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="intro-client text-white/70 text-xs md:text-sm font-semibold mb-4 flex items-center gap-2">
          <i className="icon icon-global-elip text-[#00DE51]"></i>
          <span>Tools &amp; Technologies I Use</span>
        </p>
        <div className="infiniteSlide-brand py-3 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <Marquee speed={40} gradient={false}>
            {techList.map((tech, idx) => (
              <div key={idx} className="mx-6 text-xs md:text-sm font-semibold tracking-widest uppercase text-white/80 hover:text-[#00DE51] transition-colors">
                {tech}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
