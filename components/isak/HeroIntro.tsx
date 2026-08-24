"use client";
import Marquee from "react-fast-marquee";

const clientLogos = [
  "Tempo", "Horizon", "Flowly", "Framer", "Stripe", "Linear", "Vercel", "Webflow"
];

export default function HeroIntro() {
  return (
    <div id="home" className="section-intro flat-spacing">
      {/* Intro Author Badge */}
      <div className="intro-author effectFade fadeUp no-div">
        <div className="author-image">
          <img
            loading="lazy"
            width={23}
            height={31}
            src="/assets/images/avatar/avatar-boy.png"
            alt="Avatar"
          />
        </div>
        <div className="author-info letter-space--05">
          <p className="info_name text-black">Alexander Isak</p>
          <p className="info_duty text-black-50 text-body-3">
            UI Designer &amp; No-Code Developer
          </p>
        </div>
      </div>

      {/* Main Hero Headline */}
      <h1 className="intro-title letter-space--2">
        I’m building <span className="is-bg">websites</span> <br />
        <span className="type-2 is-bg">&amp; brands</span> that people remember
      </h1>

      {/* Scribble SVG & Rotating Circular Badge */}
      <div className="intro-item">
        <div className="scribble-wrap">
          <svg
            className="scribble"
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
                <stop offset="0" stopColor="#F5F5F5" />
                <stop className="bred" offset="0.466346" stopColor="#00DE51" />
                <stop offset="1" stopColor="#F5F5F5" />
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
                fill="currentColor"
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
              <text fontSize="8.5" letterSpacing="2.5" fill="currentColor" fontWeight="600">
                <textPath href="#circlePath">
                  AWARD WINNING DESIGNER • 2025 •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Counters */}
      <div className="box-counter effectFade fadeUp no-div">
        <div className="wg-counter">
          <p className="counter h1 d-flex font-2 letter-space--2">
            <span className="number">10</span>+
          </p>
          <p className="text text-black-56 text-body-3">Year of experience</p>
        </div>
        <div className="wg-counter">
          <p className="counter h1 d-flex font-2 letter-space--2">
            <span className="number">6</span>x
          </p>
          <p className="text text-black-56 text-body-3">Industry Awards</p>
        </div>
      </div>

      {/* Clients Marquee */}
      <p className="intro-client letter-space--05 text-body-3">
        <i className="icon icon-global-elip"></i>Our clients (2015-25©)
      </p>
      <div className="infiniteSlide-brand py-2">
        <Marquee speed={35} gradient={false}>
          {clientLogos.map((client, idx) => (
            <div key={idx} className="mx-6 text-sm font-semibold tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity">
              {client}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
