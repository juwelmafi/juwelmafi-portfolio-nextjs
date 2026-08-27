"use client";

export default function BackgroundVideo() {
  return (
    <div className="body-background">
      <div className="bg-item">
        <img
          loading="lazy"
          width={1440}
          height={900}
          src="/assets/images/item/cloud-bg.png"
          alt="background"
        />
      </div>
      <div className="bg-video video-dark">
        <video
          className="video"
          muted
          autoPlay
          loop
          playsInline
        >
          <source src="/assets/images/overlay-2.mp4" type="video/mp4" />
        </video>
        <div className="overlay-1"></div>
      </div>
    </div>
  );
}
