"use client";

export default function FooterSection() {
  return (
    <div id="footer" className="tf-footer flat-spacing">
      {/* Steve Jobs Quote */}
      <div className="block-quote effectFade fadeUp no-div">
        <h5 className="quote-text font-3 fw-normal text-black-72">
          <span className="text-black-56">“</span>Design is not just what it looks like and feels like. Design is how it works.<span className="text-black-56">“</span>
        </h5>
        <p className="quote-author font-3 text-black-56 h6 text-end">Steve Jobs</p>
      </div>

      <div className="br-line"></div>

      {/* Stylized Typography Graphic & Logo */}
      <div className="foot-inner">
        <div className="isak effectFade fadeUp no-div">
          <svg viewBox="0 0 354 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 157.225V6.93641H19.4068V157.225H0Z" fill="currentColor" fillOpacity="0.72" />
            <path d="M85.0002 160C57.2763 160 36.9454 144.277 35.0971 123.006L55.428 117.457C56.3521 131.329 69.29 142.428 85.9243 142.428C98.8622 142.428 109.028 135.491 109.028 125.78C109.028 99.8844 40.6419 110.058 40.6419 71.2139C40.6419 52.2543 57.2763 38.8439 81.3037 38.8439C105.331 38.8439 123.121 52.0231 125.662 70.289L106.255 75.3757C105.793 64.0462 95.6277 55.9538 81.7658 55.9538C69.29 55.9538 60.5107 62.4277 60.5107 71.2139C60.5107 96.185 129.359 86.0116 129.359 125.78C129.359 145.665 110.876 160 85.0002 160Z" fill="currentColor" fillOpacity="0.72" />
            <path d="M175.578 160C152.705 160 137.688 146.821 137.688 126.705C137.688 110.751 150.395 97.8035 170.033 94.3353L205.612 87.8613C209.54 87.1676 212.543 84.1618 212.543 80.4624C212.543 65.896 202.609 55.4913 188.516 55.4913C173.729 55.4913 162.64 66.1272 161.716 82.3121L141.385 80C143.695 55.9538 162.871 38.8439 187.591 38.8439C213.005 38.8439 231.026 56.6474 231.026 81.3873V134.104L231.488 157.225H216.702L213.467 139.653C206.305 152.139 192.443 160 175.578 160ZM158.019 125.78C158.019 135.491 166.336 141.965 179.274 141.965C198.681 141.965 212.543 128.555 212.543 110.058V101.965C210.464 102.428 207.922 103.121 205.15 103.584L174.654 109.133C164.488 110.983 158.019 117.457 158.019 125.78Z" fill="currentColor" fillOpacity="0.72" />
            <path d="M330.897 157.225L292.083 104.277L271.752 126.243V157.225H253.27V0H271.752V101.04L324.428 41.6185H349.379L304.559 90.6358L354 157.225H330.897Z" fill="currentColor" fillOpacity="0.72" />
          </svg>
        </div>
        <a href="#home" className="f-logo effectFade fadeZoom">
          <div className="logo">
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
      <div className="foot-bottom">
        <p className="text-nocopy text-black-56 effectFade fadeUp no-div">
          All rights reserved <br />© 2025 Isak Portfolio
        </p>
        <div className="isak effectFade fadeUp no-div">
          <svg viewBox="0 0 428 162" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M267.304 41.4092C233.789 41.4092 209.924 66.4273 209.924 101.454C209.924 136.481 233.789 161.5 267.304 161.5C300.819 161.5 324.683 136.481 324.683 101.454C324.682 66.4274 300.819 41.4094 267.304 41.4092ZM57.8799 41.4092C24.3648 41.4092 0.500204 66.4273 0.5 101.454C0.5 136.481 24.3647 161.5 57.8799 161.5C91.395 161.5 115.259 136.481 115.259 101.454C115.259 66.4274 91.3948 41.4093 57.8799 41.4092ZM326.392 10.0459V29.2275H407.389V76.8633H334.582V96.0459H407.389V158.772H427.5V10.0459H326.392ZM174.328 3.22754V158.772H193.529V3.22754H174.328ZM131.553 44.1367V158.772H150.754V44.1367H131.553ZM267.304 60.1367C289.049 60.1369 304.571 77.3623 304.571 101.454C304.571 125.313 289.054 142.318 267.304 142.318C245.553 142.318 230.035 125.313 230.035 101.454C230.035 77.3622 245.558 60.1367 267.304 60.1367ZM57.8799 60.1367C79.6252 60.1368 95.1473 77.3623 95.1475 101.454C95.1475 125.313 79.6305 142.318 57.8799 142.318C36.1291 142.318 20.6113 125.313 20.6113 101.454C20.6115 77.3622 36.1344 60.1367 57.8799 60.1367ZM141.153 0.5C132.671 0.5 126.547 6.87608 126.547 15.5459C126.547 24.2155 132.671 30.5908 141.153 30.5908C149.635 30.5907 155.76 24.2154 155.76 15.5459C155.76 6.87613 149.635 0.500076 141.153 0.5Z" stroke="currentColor" strokeOpacity="0.56" />
          </svg>
        </div>
      </div>
    </div>
  );
}
