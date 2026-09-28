/**
 * Utility functions for YouTube video extraction and custom player URLs
 */

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();

  // If already an 11-char ID without slashes/dots
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Handle youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Handle youtube.com/embed/ID
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // Handle youtube.com/shorts/ID
  const shortsMatch = trimmed.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  return trimmed;
}

export function getYouTubeThumbnail(videoIdOrUrl: string, quality: "hq" | "max" = "hq"): string {
  const id = extractYouTubeId(videoIdOrUrl);
  if (!id) return "/hero-bg.jpg";
  if (quality === "max") {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getCleanYouTubeEmbedUrl(
  videoIdOrUrl: string,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    loop?: boolean;
    controls?: boolean;
  } = {}
): string {
  const id = extractYouTubeId(videoIdOrUrl);
  if (!id) return "";

  const params = new URLSearchParams({
    enablejsapi: "1",
    origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    playsinline: "1",
    controls: options.controls ? "1" : "0",
    autoplay: options.autoplay ? "1" : "0",
    mute: options.mute ? "1" : "0",
  });

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
