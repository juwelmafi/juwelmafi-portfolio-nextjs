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

const CLEAN_SITE_CONTENTS = [
  // Hero
  { key: "hero.eyebrow",          label: "Hero Eyebrow Badge",                value: "FULL-STACK ENGINEER & SHOPIFY DEVELOPER",                                                                     type: "text",     group: "Hero" },
  { key: "hero.name",             label: "Your Display Name",                 value: "Juwel Hossain",                                                                                               type: "text",     group: "Hero" },
  { key: "hero.headline",         label: "Hero Main Headline",                value: "Engineering High-Impact Web Applications & Scalable Platforms.",                                              type: "textarea", group: "Hero" },
  { key: "hero.tagline",          label: "Hero Lede / Bio Description",       value: "I build scalable full-stack web applications, custom Shopify stores, and modern digital platforms. Specialized in React, Next.js, Node.js, and MongoDB with clean architecture and pixel-perfect design.", type: "textarea", group: "Hero" },
  { key: "hero.cta",              label: "Primary Button Text",               value: "Explore My Work →",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.ctaSecondary",     label: "Secondary Button Text",             value: "Start a Project",                                                                                             type: "text",     group: "Hero" },
  { key: "hero.subtext",          label: "Subtext Under Buttons",             value: "Available for freelance projects, full-stack contracts, and remote engineering roles.",                       type: "textarea", group: "Hero" },
  { key: "hero.subtextLink",      label: "Subtext Link Text",                 value: "View selected production cases and live deployments.",                                                        type: "text",     group: "Hero" },
  { key: "hero.check1",           label: "Trust Checklist Item 1",            value: "FAST PERFORMANCE",                                                                                            type: "text",     group: "Hero" },
  { key: "hero.check2",           label: "Trust Checklist Item 2",            value: "CLEAN ARCHITECTURE",                                                                                          type: "text",     group: "Hero" },
  { key: "hero.check3",           label: "Trust Checklist Item 3",            value: "MODERN TECH STACK",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.check4",           label: "Trust Checklist Item 4",            value: "ON-TIME DELIVERY",                                                                                            type: "text",     group: "Hero" },
  { key: "hero.stickerRound",     label: "Round Sticker Text",                value: "100%",                                                                                                        type: "text",     group: "Hero" },
  { key: "hero.stickerOval",      label: "Oval Sticker Text",                 value: "PRODUCTION READY",                                                                                            type: "text",     group: "Hero" },
  { key: "hero.avatar",           label: "Retro Portrait Image URL",          value: "/assets/images/avatar/juwel_retro.png",                                                                       type: "image",    group: "Hero" },
  { key: "hero.certIssuer",       label: "Dossier Issuer Brand",              value: "JUWELMAFI.DEV",                                                                                               type: "text",     group: "Hero" },
  { key: "hero.certSerial",       label: "Dossier Serial Code",               value: "JH-ENG-001",                                                                                                  type: "text",     group: "Hero" },
  { key: "hero.certTitle",        label: "Dossier Card Title",                value: "Verified Engineer Dossier",                                                                                   type: "text",     group: "Hero" },
  { key: "hero.certSubtitle",     label: "Dossier Card Subtitle",             value: "Full-Stack Web & E-Commerce Developer",                                                                       type: "text",     group: "Hero" },
  { key: "hero.certStatus",       label: "Dossier Availability Status",       value: "STATUS: AVAILABLE",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.certIssued",       label: "Dossier Issued Date",               value: "01 OCT 2026",                                                                                                 type: "text",     group: "Hero" },
  { key: "hero.certExpires",      label: "Dossier Expiry",                    value: "INDEFINITE",                                                                                                  type: "text",     group: "Hero" },
  { key: "hero.certStatement",    label: "Dossier Verification Statement",    value: "Proven expertise in end-to-end full-stack architectures, custom Shopify solutions, responsive frontends, and database optimization.", type: "textarea", group: "Hero" },
  { key: "hero.certStamp",        label: "Rubber Stamp Text",                 value: "VERIFIED ENGINEER",                                                                                           type: "text",     group: "Hero" },
  { key: "hero.certMrz",          label: "Passport MRZ Line",                 value: "SWE<MERN000001<JUWEL<HOSSAIN<<<<<<<<<<<<<<<<<<\nSTATUS<ACTIVE<20261001<NEXTJS<REACT<NODE<MONGO<<<<",         type: "textarea", group: "Hero" },

  // The Stack (Technical Skills)
  { key: "stack.eyebrow",         label: "Stack Section Eyebrow",             value: "TECHNICAL EXPERTISE",                                                                                         type: "text",     group: "The Stack" },
  { key: "stack.title",           label: "Stack Section Heading",             value: "Introducing The Stack.",                                                                                      type: "text",     group: "The Stack" },
  { key: "stack.desc",            label: "Stack Section Description",         value: "Designed without bloat. Engineered for production. Scalable architectures powering modern full-stack web applications and custom e-commerce platforms.", type: "textarea", group: "The Stack" },
  { key: "stack.boxTitle",        label: "Toolkit Box Title",                 value: "What's in my toolkit?",                                                                                       type: "text",     group: "The Stack" },
  { key: "stack.boxDesc",         label: "Toolkit Box Description",           value: "MERN Stack, Next.js 15, React 19, Shopify Themes, WordPress, TypeScript, Node.js, MongoDB Atlas. Scalable, clean, and tested for production.", type: "textarea", group: "The Stack" },
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
  { key: "stack.footnote",        label: "Stack Footnote",                    value: "*All solutions built with clean, scalable, production-tested code.",                                          type: "text",     group: "The Stack" },

  // Services
  { key: "services.eyebrow",      label: "Services Section Eyebrow",          value: "SERVICES & SOLUTIONS",                                                                                        type: "text",     group: "Services" },
  { key: "services.title",        label: "Services Main Heading",             value: "Handcrafted Engineering Services.",                                                                           type: "text",     group: "Services" },
  { key: "services.desc",         label: "Services Description",              value: "Choose the exact service your project needs. Every solution is engineered from scratch with clean architecture, zero bloat, and full production care.", type: "textarea", group: "Services" },
  { key: "services.bottomNote",   label: "Services Bottom Note",              value: "Need a custom project or have a unique requirement? Send an inquiry through the contact form and I will review your specifications within 24 hours.", type: "textarea", group: "Services" },

  // Projects
  { key: "projects.eyebrow",      label: "Projects Eyebrow",                  value: "01 / THE WORK",                                                                                               type: "text",     group: "Projects" },
  { key: "projects.headerTitle",  label: "Projects Section Title",            value: "Featured Projects & Deployments",                                                                             type: "text",     group: "Projects" },
  { key: "projects.headerDesc",   label: "Projects Section Description",      value: "Real-world full-stack web applications, custom platforms, and production systems built with Next.js, React, Node.js, and MongoDB.", type: "textarea", group: "Projects" },

  // Education Ledger
  { key: "education.eyebrow",     label: "Education Eyebrow",                 value: "02 / CREDENTIALS & ACADEMIA",                                                                                 type: "text",     group: "Education Ledger" },
  { key: "education.title",       label: "Education Section Title",           value: "Academic Ledger & Formal Study",                                                                              type: "text",     group: "Education Ledger" },
  { key: "education.desc",        label: "Education Section Description",     value: "Verified university degrees and foundational academic milestones powering real-world engineering problem solving.", type: "textarea", group: "Education Ledger" },
  { key: "education.rec1.institution",   label: "Record 1: University Name",        value: "Sonargaon University",                                                                                 type: "text",     group: "Education Ledger" },
  { key: "education.rec1.qualification", label: "Record 1: Degree / Qualification", value: "B.Sc in Computer Science and Engineering (CSE)",                                                       type: "text",     group: "Education Ledger" },
  { key: "education.rec1.period",        label: "Record 1: Period & Status",        value: "2026 - Present · CURRENTLY ENROLLED",                                                                  type: "text",     group: "Education Ledger" },
  { key: "education.rec1.description",   label: "Record 1: Description",            value: "Deepening academic foundations in algorithmic complexity, distributed systems, software engineering patterns, database internal structures, and full-stack web platforms.", type: "textarea", group: "Education Ledger" },
  { key: "education.rec1.courses",       label: "Record 1: Core Subjects (CSV)",    value: "Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, Software Engineering Architecture, Computer Networks", type: "textarea", group: "Education Ledger" },
  { key: "education.rec2.institution",   label: "Record 2: College Name",           value: "Government Barhamgonj College, Shibchar",                                                              type: "text",     group: "Education Ledger" },
  { key: "education.rec2.qualification", label: "Record 2: Degree / Certificate",   value: "Higher Secondary Certificate (HSC) — Science",                                                          type: "text",     group: "Education Ledger" },
  { key: "education.rec2.period",        label: "Record 2: Period & Status",        value: "2020 - 2022 · COMPLETED",                                                                              type: "text",     group: "Education Ledger" },
  { key: "education.rec2.description",   label: "Record 2: Description",            value: "Graduated with a strong STEM background focusing on advanced mathematics, physics, and introductory computer science fundamentals.", type: "textarea", group: "Education Ledger" },
  { key: "education.rec2.courses",       label: "Record 2: Core Subjects (CSV)",    value: "Higher Mathematics, Physics, Information & Communication Technology",                                   type: "textarea", group: "Education Ledger" },

  // Explore Hub
  { key: "explore.ticketNumber",  label: "Explore Ticket Identifier",         value: "TICKET #EXP-2026",                                                                                            type: "text",     group: "Explore Hub" },
  { key: "explore.heading",       label: "Explore Section Heading",           value: "Want to explore more?",                                                                                       type: "text",     group: "Explore Hub" },
  { key: "explore.desc",          label: "Explore Section Description",       value: "Read comprehensive technical breakdowns, study MERN stack architectures, watch full YouTube masterclasses, and browse continuous learning guides.", type: "textarea", group: "Explore Hub" },
  { key: "explore.btnText",       label: "Explore Button Text",               value: "Explore More (Blogs & Courses) →",                                                                            type: "text",     group: "Explore Hub" },
  { key: "explore.stickyNote",    label: "Pinned Sticky Note Quote",          value: "“No gatekeeping. Every tutorial, course, and essay is open for everyone to learn.”",                          type: "textarea", group: "Explore Hub" },

  // Contact & Form
  { key: "contact.eyebrow",       label: "Contact Page Eyebrow",              value: "DISPATCH #001 · REACH OUT",                                                                                   type: "text",     group: "Contact & Form" },
  { key: "contact.title",         label: "Contact Page Heading",              value: "Transmit a message.",                                                                                         type: "text",     group: "Contact & Form" },
  { key: "contact.desc",          label: "Contact Page Description",          value: "Tell me about your product requirements, team needs, or questions. I read every message and respond promptly with actionable insights.", type: "textarea", group: "Contact & Form" },
  { key: "contact.cardEyebrow",   label: "Contact Card Dossier Eyebrow",      value: "COMMUNICATION DOSSIER",                                                                                       type: "text",     group: "Contact & Form" },
  { key: "contact.cardTitle",     label: "Contact Card Title",                value: "Let's talk software.",                                                                                        type: "text",     group: "Contact & Form" },
  { key: "contact.cardDesc",      label: "Contact Card Description",          value: "Have a project in mind, need consultation on modern full-stack architectures, or looking to collaborate? Drop me a message below.", type: "textarea", group: "Contact & Form" },
  { key: "contact.email",         label: "Inquiry Email Address",             value: "juwelhossain16457@gmail.com",                                                                                 type: "text",     group: "Contact & Form" },
  { key: "contact.location",      label: "Location Description",              value: "Dhaka, Bangladesh · Global Remote",                                                                           type: "text",     group: "Contact & Form" },
  { key: "contact.availability",  label: "Availability Status",               value: "Available for Freelance & Engineering",                                                                       type: "text",     group: "Contact & Form" },
  { key: "contact.formTitle",     label: "Form Box Title",                    value: "Transmit a Message",                                                                                          type: "text",     group: "Contact & Form" },
  { key: "contact.guaranteeText", label: "Form Guarantee Badge",              value: "0% SPAM GUARANTEE",                                                                                           type: "text",     group: "Contact & Form" },

  // Navigation
  { key: "header.work",           label: "Nav Link: Work",                    value: "Work",                                                                                                        type: "text",     group: "Navigation" },
  { key: "header.stack",          label: "Nav Link: The Stack",               value: "The Stack",                                                                                                   type: "text",     group: "Navigation" },
  { key: "header.services",       label: "Nav Link: Services",                value: "Services",                                                                                                    type: "text",     group: "Navigation" },
  { key: "header.education",      label: "Nav Link: Education",               value: "Education",                                                                                                   type: "text",     group: "Navigation" },
  { key: "header.explore",        label: "Nav Link: Writing & Courses",       value: "Writing & Courses",                                                                                           type: "text",     group: "Navigation" },
  { key: "header.cta",            label: "Nav Link: Button / CTA",            value: "Let's talk",                                                                                                  type: "text",     group: "Navigation" },

  // About & Bio
  { key: "about.tag",             label: "About Section Badge / Tag",         value: "About Me",                                                                                                    type: "text",     group: "Site Settings" },
  { key: "about.title",           label: "About Section Main Heading",        value: "Full-Stack & Shopify Engineer crafting scalable web platforms with clean architecture",                       type: "textarea", group: "Site Settings" },
  { key: "about.bio",             label: "About Description (Main Bio)",      value: "I’m a full-stack engineer based in Bangladesh specializing in MERN stack, Next.js, and custom Shopify development. I enjoy building interactive, accessible, and high-converting web applications with clean architecture and pixel-perfect design.", type: "textarea", group: "Site Settings" },
  { key: "about.location",        label: "Location",                          value: "Dhaka, Bangladesh · Global Remote",                                                                           type: "text",     group: "Site Settings" },
  { key: "about.email",           label: "Contact Email",                     value: "juwelmafi@gmail.com",                                                                                         type: "text",     group: "Site Settings" },
  { key: "about.phone",           label: "Phone / WhatsApp",                  value: "+880 1859-797307",                                                                                            type: "text",     group: "Site Settings" },

  // Site Settings
  { key: "site.logo",             label: "Site Logo URL",                     value: "/assets/images/logo/favicon.svg",                                                                             type: "image",    group: "Site Settings" },
  { key: "site.logoText",         label: "Site Logo Monogram",                value: "jh.",                                                                                                         type: "text",     group: "Site Settings" },
  { key: "site.favicon",          label: "Favicon URL",                       value: "/assets/images/logo/favicon.svg",                                                                             type: "url",      group: "Site Settings" },
  { key: "site.resumeUrl",        label: "Global Resume / CV URL",            value: "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing",                        type: "url",      group: "Site Settings" },
  { key: "site.footerTitle",      label: "Footer Brand Name",                 value: "JUWEL HOSSAIN",                                                                                               type: "text",     group: "Site Settings" },
  { key: "site.footerTagline",    label: "Footer Brand Tagline",              value: "Full-Stack Engineer & Shopify Developer",                                                                     type: "text",     group: "Site Settings" },
  { key: "site.footerDesc",       label: "Footer Description",                value: "Full-stack engineer specializing in MERN stack, Next.js, and high-performance Shopify e-commerce platforms.", type: "textarea", group: "Site Settings" },
  { key: "site.footerLedgerLine", label: "Footer Top Ledger Line",            value: "================ OFFICIAL DISPATCH & SUMMARY ================",                                               type: "text",     group: "Site Settings" },
  { key: "site.footerSerial",     label: "Footer Serial Code",                value: "JH-PORTFOLIO-2026",                                                                                           type: "text",     group: "Site Settings" },
  { key: "site.copyright",        label: "Footer Copyright Text",             value: "© 2026 Juwel Hossain. All rights reserved.",                                                                 type: "text",     group: "Site Settings" },

  // Social Links
  { key: "social.youtube",        label: "YouTube Channel URL",               value: "https://www.youtube.com/@juwelmafi",                                                                          type: "url",      group: "Social Links" },
  { key: "social.linkedin",       label: "LinkedIn Profile URL",              value: "https://www.linkedin.com/in/juwelmafi",                                                                       type: "url",      group: "Social Links" },
  { key: "social.github",         label: "GitHub Profile URL",                value: "https://github.com/juwelmafi",                                                                                type: "url",      group: "Social Links" },
  { key: "social.twitter",        label: "Twitter / X Profile URL",           value: "https://x.com/juwelmafi",                                                                                     type: "url",      group: "Social Links" },
  { key: "social.facebook",       label: "Facebook Profile URL",              value: "https://facebook.com/juwelmafi",                                                                              type: "url",      group: "Social Links" },
];

const OBSOLETE_KEYS = [
  "hero.certPaid",
  "services.customBudgetLabel",
  "services.customBudgetDesc",
  "services.shrugNote",
];

async function syncAllCleanContent() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  const siteContentColl = mongoose.connection.collection("sitecontents");
  const seoColl = mongoose.connection.collection("seometas");

  // 1. Remove obsolete parody keys
  if (OBSOLETE_KEYS.length > 0) {
    const delRes = await siteContentColl.deleteMany({ key: { $in: OBSOLETE_KEYS } });
    console.log(`Deleted ${delRes.deletedCount} obsolete reference keys.`);
  }

  // 2. Upsert all clean site content
  let upsertCount = 0;
  for (const item of CLEAN_SITE_CONTENTS) {
    await siteContentColl.updateOne(
      { key: item.key },
      { $set: item },
      { upsert: true }
    );
    upsertCount++;
  }
  console.log(`Upserted ${upsertCount} clean site content keys in MongoDB Atlas.`);

  // 3. Update SEO collection for "home" and "services"
  await seoColl.updateOne(
    { pageKey: "home" },
    {
      $set: {
        pageKey: "home",
        pageLabel: "Home Page",
        metaTitle: "Juwel Hossain — Full-Stack Engineer & Shopify Developer",
        metaDescription: "Full-stack web developer specializing in Next.js, React, Node.js, and custom Shopify themes. Clean architecture, scalable web applications.",
        ogTitle: "Juwel Hossain — Full-Stack Engineer & Shopify Developer",
        ogDescription: "Full-stack web developer specializing in Next.js, React, Node.js, and custom Shopify solutions.",
        ogImage: "/assets/images/avatar/juwel_retro.png",
        twitterTitle: "Juwel Hossain — Full-Stack Engineer & Shopify Developer",
        twitterDescription: "Full-stack web developer specializing in Next.js, React, Node.js, and custom Shopify solutions.",
        canonicalUrl: "http://localhost:3000/",
      },
    },
    { upsert: true }
  );

  await seoColl.updateOne(
    { pageKey: "services" },
    {
      $set: {
        pageKey: "services",
        pageLabel: "Services Page",
        metaTitle: "Engineering Services & Solutions | Juwel Hossain",
        metaDescription: "Handcrafted engineering services: MERN stack development, custom Shopify themes, landing pages, and API architectures.",
        ogTitle: "Engineering Services & Solutions | Juwel Hossain",
        ogDescription: "Handcrafted engineering services: MERN stack, Next.js, custom Shopify themes, and full-stack solutions.",
        ogImage: "/assets/images/avatar/juwel_retro.png",
        twitterTitle: "Engineering Services & Solutions | Juwel Hossain",
        twitterDescription: "Handcrafted engineering services: MERN stack, Next.js, custom Shopify themes, and full-stack solutions.",
        canonicalUrl: "http://localhost:3000/#services",
      },
    },
    { upsert: true }
  );

  console.log("Updated SEO metadata for 'home' and 'services' successfully.");

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB. Sync complete!");
}

syncAllCleanContent().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
