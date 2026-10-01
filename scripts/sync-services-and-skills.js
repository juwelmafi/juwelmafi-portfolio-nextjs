const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Read MONGODB_URI from .env.local
const envPath = path.resolve(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const match = envContent.match(/MONGODB_URI=(.*)/);
if (!match) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}
const MONGODB_URI = match[1].trim();

const SKILL_CONTENT_ENTRIES = [
  { key: "stack.eyebrow",         label: "Stack Section Eyebrow",             value: "TECHNICAL EXPERTISE",                                                                                         type: "text",     group: "The Stack" },
  { key: "stack.title",           label: "Stack Section Heading",             value: "Introducing The Stack.",                                                                                      type: "text",     group: "The Stack" },
  { key: "stack.desc",            label: "Stack Section Description",         value: "Designed without bloat. Engineered for production. Scalable architectures powering modern full-stack web applications and custom e-commerce platforms.", type: "textarea", group: "The Stack" },
  { key: "stack.boxTitle",        label: "What's in the Box? Title",          value: "What's in my toolkit?",                                                                                       type: "text",     group: "The Stack" },
  { key: "stack.boxDesc",         label: "What's in the Box? Description",    value: "MERN Stack, Next.js 15, React 19, Shopify Themes, WordPress, TypeScript, Node.js, MongoDB Atlas. Scalable, clean, and tested for production.", type: "textarea", group: "The Stack" },
  { key: "stack.sticker",         label: "Starburst Sticker Text",            value: "certified clean",                                                                                             type: "text",     group: "The Stack" },
  { key: "stack.specTitle",       label: "Specification Sheet Title",         value: "TECHNICAL SPECIFICATION",                                                                                     type: "text",     group: "The Stack" },
  { key: "stack.skillMern",       label: "Skill: MERN Stack",                 value: "MongoDB, Express, React & Node.js",                                                                           type: "text",     group: "The Stack" },
  { key: "stack.skillNextjs",     label: "Skill: Next.js & React",            value: "Next.js 15, App Router, React 19 & SSR",                                                                      type: "text",     group: "The Stack" },
  { key: "stack.skillShopify",    label: "Skill: Shopify & Liquid",           value: "Custom Theme Dev, Liquid & Store Customization",                                                              type: "text",     group: "The Stack" },
  { key: "stack.skillWordpress",  label: "Skill: WordPress & CMS",            value: "Custom Themes, WooCommerce & Headless CMS",                                                                   type: "text",     group: "The Stack" },
  { key: "stack.skillLanguages",  label: "Skill: Languages",                  value: "TypeScript (Strict), JavaScript ES6+, HTML5/CSS3",                                                            type: "text",     group: "The Stack" },
  { key: "stack.skillBackend",    label: "Skill: Backend & Database",         value: "Node.js, Express API, MongoDB Atlas & REST/GraphQL",                                                          type: "text",     group: "The Stack" },
  { key: "stack.skillTools",      label: "Skill: Other Tech & DevOps",        value: "TailwindCSS, Git, Vercel, Docker & Cloudinary",                                                               type: "text",     group: "The Stack" },
  { key: "stack.skillQuality",    label: "Skill: Delivery & Standards",       value: "Clean Architecture & Zero Bloat",                                                                             type: "text",     group: "The Stack" },
  { key: "services.eyebrow",      label: "Services Section Eyebrow",          value: "SERVICES & SOLUTIONS",                                                                                        type: "text",     group: "Services & Pricing" },
  { key: "services.title",        label: "Services Main Heading",             value: "Handcrafted Engineering Services.",                                                                           type: "text",     group: "Services & Pricing" },
  { key: "services.desc",         label: "Services Description",              value: "Choose the exact service your project needs. Every solution is engineered from scratch with clean architecture, zero bloat, and full production care.", type: "textarea", group: "Services & Pricing" },
];

const MINIMAL_SERVICES = [
  {
    title: "MERN Website",
    kicker: "FULL-STACK DEVELOPMENT",
    desc: "Complete custom web platforms built with React, Next.js, Node.js, Express, and MongoDB. Fast, responsive, and secure.",
    deliverables: "Next.js 15 · MongoDB Atlas · REST & GraphQL · NextAuth",
    ribbon: "Most requested",
    order: 0,
    published: true,
  },
  {
    title: "Shopify Website",
    kicker: "E-COMMERCE SOLUTION",
    desc: "High-converting custom Shopify storefronts, theme customization, Liquid development, and seamless app integrations.",
    deliverables: "Custom Liquid Theme · Speed Optimization · App Integrations",
    ribbon: "Popular",
    order: 1,
    published: true,
  },
  {
    title: "Landing Page",
    kicker: "HIGH CONVERSION",
    desc: "High-impact single-page experiences tailored for products, SaaS launches, and marketing campaigns.",
    deliverables: "Pixel-Perfect Layout · Mobile-First · SEO Structured · Fast",
    ribbon: "",
    order: 2,
    published: true,
  },
  {
    title: "Graphic Design & UI/UX",
    kicker: "DESIGN & BRANDING",
    desc: "Bespoke interface designs, interactive Figma prototypes, wireframing, and design-to-code implementations.",
    deliverables: "Figma Prototypes · Design System · Component Libraries",
    ribbon: "",
    order: 3,
    published: true,
  },
  {
    title: "WordPress & CMS",
    kicker: "CONTENT PLATFORMS",
    desc: "Custom WordPress themes, WooCommerce stores, and Headless CMS architectures designed for easy client management.",
    deliverables: "Custom Theme · WooCommerce · ACF Pro · Easy Dashboard",
    ribbon: "",
    order: 4,
    published: true,
  },
  {
    title: "API & Backend Architecture",
    kicker: "SYSTEM ENGINEERING",
    desc: "Robust REST and GraphQL API design, database modeling, authentication pipelines, and third-party integrations.",
    deliverables: "Node.js · Express · MongoDB · Cloudinary · Stripe Payments",
    ribbon: "",
    order: 5,
    published: true,
  },
  {
    title: "Speed & SEO Optimization",
    kicker: "PERFORMANCE AUDIT",
    desc: "Comprehensive Core Web Vitals optimization, responsive speed tuning, structured data schemas, and technical audits.",
    deliverables: "Lighthouse 95+ Score · Image Compression · Schema Markup",
    ribbon: "Best value",
    order: 6,
    published: true,
  },
  {
    title: "Custom Web Application",
    kicker: "SAAS & SOFTWARE",
    desc: "Full-scale custom software architectures with role-based access control, analytics dashboards, and real-time syncing.",
    deliverables: "Role-Based Access · Admin Dashboard · Scalable Cloud Setup",
    ribbon: "",
    order: 7,
    published: true,
  },
];

async function sync() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!");

  const db = mongoose.connection.db;

  // 1. Sync site content skills
  const siteContentCol = db.collection("sitecontents");
  for (const entry of SKILL_CONTENT_ENTRIES) {
    await siteContentCol.updateOne(
      { key: entry.key },
      {
        $set: {
          key: entry.key,
          label: entry.label,
          value: entry.value,
          type: entry.type,
          group: entry.group,
        },
      },
      { upsert: true }
    );
  }
  console.log(`Synced ${SKILL_CONTENT_ENTRIES.length} stack skills and services content entries!`);

  // 2. Populate/Update minimal services
  const servicesCol = db.collection("services");
  for (const s of MINIMAL_SERVICES) {
    await servicesCol.updateOne(
      { title: s.title },
      {
        $set: {
          title: s.title,
          kicker: s.kicker,
          desc: s.desc,
          deliverables: s.deliverables,
          ribbon: s.ribbon,
          order: s.order,
          published: s.published,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
  }
  console.log(`Synced ${MINIMAL_SERVICES.length} minimal services!`);

  await mongoose.disconnect();
  console.log("Disconnected. Sync completed successfully.");
}

sync().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
