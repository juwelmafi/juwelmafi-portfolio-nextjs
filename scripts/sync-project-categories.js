const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const PROJECTS_SEED = [
  {
    title: "Talkademic – Tutor Booking Platform",
    desc: "An online tutor booking platform featuring category-based tutor search, real-time availability, and verified reviews.",
    tech: ["React", "Tailwind CSS", "Firebase", "Node.js", "Express", "MongoDB"],
    img: "https://i.ibb.co/Vrzv1vt/talkademic-mock.png",
    screenshot: "https://i.ibb.co/sJy5GRVG/talkademic-ss.jpg",
    live: "https://talkademic.web.app/",
    client: "https://github.com/juwelmafi/talkademic",
    server: "https://github.com/juwelmafi/talkademic-server",
    details: "Talkademic is a global tutor booking platform where learners can find qualified tutors by subject or language. Features secure booking, detailed tutor profiles, reviews, and Firebase auth.",
    challenge: "Implementing role-based route access and tutor availability calendar.",
    goal: "Add real-time video tutoring and integrated payments.",
    category: "MERN",
    reverse: false,
    order: 1,
  },
  {
    title: "Scholar Link – Scholarship Management System",
    desc: "A role-based scholarship platform where students can apply, review, and track scholarships, with full admin and analytics dashboard.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Stripe", "Firebase"],
    img: "https://i.ibb.co.com/Y7gYdDdK/scholar-mock.jpg",
    screenshot: "https://i.ibb.co.com/gLb5Yvzy/scholerlink.jpg",
    live: "https://scholar-link.web.app/",
    client: "https://github.com/juwelmafi/scholar-link-client",
    server: "https://github.com/juwelmafi/scholar-link-server",
    details: "Scholar Link is a full-stack scholarship management system featuring user, moderator, and admin roles. Students apply with Stripe payments.",
    challenge: "Handling multi-tiered role authorization and real-time review workflows.",
    goal: "Add automated document verification with AI.",
    category: "MERN",
    reverse: true,
    order: 2,
  },
  {
    title: "Easy House – House Rental Platform(Next.js)",
    desc: "A full-stack house rental platform featuring property exploration, secure booking system, and real-time availability management.",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB", "NextAuth", "Node.js"],
    img: "https://i.ibb.co.com/7dVs27jC/easy-house.jpg",
    screenshot: "https://i.ibb.co.com/jktqM2xs/easy-house-ss.jpg",
    live: "https://easy-house.vercel.app/",
    client: "https://github.com/juwelmafi/easy-house",
    server: "https://github.com/juwelmafi/easy-house-api",
    details: "Easy House is a modern house rental platform that enables users to browse available properties, view detailed listings, and book their preferred homes.",
    challenge: "Implementing secure authentication flow with multiple OAuth providers using NextAuth.",
    goal: "Implement instant payment checkout and virtual property tours.",
    category: "MERN",
    reverse: false,
    order: 3,
  },
  {
    title: "Lumina Store – High-Converting Shopify Plus Experience",
    desc: "Bespoke Shopify e-commerce build with custom Liquid templates, Ajax cart slideout, dynamic upsells, and 98+ PageSpeed rating.",
    tech: ["Shopify", "Liquid", "JavaScript", "Tailwind CSS", "GraphQL", "CMS"],
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    screenshot: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    live: "https://shopify.com",
    client: "https://github.com/juwelmafi",
    server: "",
    details: "Custom Shopify storefront engineered for luxury retail. Includes zero-layout-shift product galleries, bundle builders, and multi-currency internationalization.",
    challenge: "Optimizing third-party app scripts to maintain sub-second load times.",
    goal: "Migrate to full headless Hydrogen storefront.",
    category: "Shopify",
    reverse: true,
    order: 4,
  },
  {
    title: "Nordic Studio – Headless WordPress & WooCommerce",
    desc: "Architectural design studio website with Headless WordPress CMS backend, Next.js frontend, and WooCommerce automated invoicing.",
    tech: ["WordPress", "WooCommerce", "CMS", "Next.js", "GraphQL", "Tailwind CSS"],
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    screenshot: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    live: "https://wordpress.org",
    client: "https://github.com/juwelmafi",
    server: "",
    details: "Custom WordPress Gutenberg block system integrated with Next.js ISR (Incremental Static Regeneration) for instantaneous page loads and seamless editorial control.",
    challenge: "Syncing headless WordPress webhooks with Next.js cache revalidation.",
    goal: "Implement multi-language WPML REST API synchronization.",
    category: "WordPress",
    reverse: false,
    order: 5,
  },
  {
    title: "SaaS Matrix – Conversion-Driven FinTech Landing Page",
    desc: "High-converting B2B SaaS landing page with interactive ROI calculator, live currency tickers, and micro-interactions.",
    tech: ["Landing Page", "Next.js", "React", "Tailwind CSS", "Framer Motion", "UI/UX Design"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    live: "https://github.com/juwelmafi",
    client: "https://github.com/juwelmafi",
    server: "",
    details: "Built specifically to drive high lead conversion with A/B tested copy sections, responsive comparison charts, and accessible forms.",
    challenge: "Keeping animation bundle footprint under 25KB while delivering fluid 60fps motion.",
    goal: "Integrate automated Stripe billing flow directly from the hero.",
    category: "Landing Page",
    reverse: true,
    order: 6,
  },
  {
    title: "Freeleza – Freelance Service Marketplace",
    desc: "A dynamic freelance marketplace where clients and freelancers manage projects through dedicated bid dashboards.",
    tech: ["React", "Tailwind CSS", "Firebase", "Node.js", "MongoDB"],
    img: "https://i.ibb.co/9H2xD2Yv/freeleza-mock.png",
    screenshot: "https://i.ibb.co/3mjB4CdV/freeleza-ss.jpg",
    live: "https://fleeleza.web.app/",
    client: "https://github.com/juwelmafi/freeleza",
    server: "https://github.com/juwelmafi/freeleza-server",
    details: "Freeleza connects clients with freelancers through a simple bidding mechanism. Features order prioritization, dark/light theme, and dynamic status tracking.",
    challenge: "Designing responsive interactive freelancer dashboards.",
    goal: "Add escrow payment support.",
    category: "Landing Page",
    reverse: false,
    order: 7,
  },
  {
    title: "App-Store – Interactive Mobile Discovery Design",
    desc: "A mobile app discovery UI/UX prototype with category-wise browsing, user feedback reviews, and mobile showcase interactions.",
    tech: ["UI/UX Design", "Figma", "Designs", "React", "Tailwind CSS", "JavaScript"],
    img: "https://i.ibb.co/9m5KQrp0/app-store-mock.png",
    screenshot: "https://i.ibb.co/cXcP7TJm/app-ss.jpg",
    live: "https://my-app-store-bfe0d.web.app/",
    client: "https://github.com/juwelmafi/app-store",
    server: "#",
    details: "Simulates an authentic mobile app store discovery flow. Created in Figma and coded to demonstrate responsive component design.",
    challenge: "Polishing micro-interactions and star rating input states.",
    goal: "Convert into full cross-platform React Native app.",
    category: "Designs",
    reverse: true,
    order: 8,
  },
  {
    title: "Aether Engine – Real-Time WebSocket Microservice",
    desc: "High-performance distributed telemetry streamer built with WebSockets, Redis cache layer, and automated Docker orchestration.",
    tech: ["Node.js", "Express", "Docker", "Wix", "REST API", "WebSocket"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    screenshot: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    live: "https://github.com/juwelmafi",
    client: "https://github.com/juwelmafi",
    server: "https://github.com/juwelmafi",
    details: "Cloud microservice handling 10,000+ simultaneous event broadcasts with low latency and structured logging.",
    challenge: "Handling graceful connection teardown during scaling events.",
    goal: "Deploy across multi-region Kubernetes clusters.",
    category: "Other",
    reverse: false,
    order: 9,
  },
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas.");

  const col = mongoose.connection.collection("projects");

  for (const p of PROJECTS_SEED) {
    await col.updateOne(
      { title: p.title },
      { $set: p },
      { upsert: true }
    );
    console.log(`Upserted: ${p.title} -> [${p.category}]`);
  }

  // Delete legacy duplicate with undefined category
  await col.deleteOne({ title: "App-Store – Find the Best Mobile Apps in One Place" });

  // Also update public/projects.json
  const jsonPath = path.join(__dirname, "..", "public", "projects.json");
  fs.writeFileSync(jsonPath, JSON.stringify(PROJECTS_SEED, null, 2), "utf-8");
  console.log("Updated public/projects.json with all categories!");

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
