const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

const DEFAULT_CONTENT = [
  // Hero
  { key: "hero.eyebrow",          label: "Top Eyebrow Text",                  value: "ENGINEER #001 · IN STOCK FOREVER", group: "Hero", type: "text" },
  { key: "hero.name",             label: "Your Name",                         value: "Juwel Hossain", group: "Hero", type: "text" },
  { key: "hero.headline",         label: "Hero Main Headline",                value: "Build websites. Keep the receipt.", group: "Hero", type: "textarea" },
  { key: "hero.tagline",          label: "Hero Lede / Bio Description",       value: "No product. No download. No hidden bugs. You choose what modern web platform you need — and you walk away with clean MERN & Next.js 15 architecture that proves it was built on purpose.", group: "Hero", type: "textarea" },
  { key: "hero.cta",              label: "Primary Button Text",               value: "Get my certificate →", group: "Hero", type: "text" },
  { key: "hero.ctaSecondary",     label: "Secondary Button Text",             value: "Buy it as a gift 🎁", group: "Hero", type: "text" },
  { key: "hero.subtext",          label: "Subtext Under Buttons",             value: "Stuck for a full-stack engineer? Hire one and get clean code.", group: "Hero", type: "textarea" },
  { key: "hero.check1",           label: "Trust Checklist Item 1",            value: "0 GRAMS", group: "Hero", type: "text" },
  { key: "hero.check2",           label: "Trust Checklist Item 2",            value: "SHIPS FAST", group: "Hero", type: "text" },
  { key: "hero.check3",           label: "Trust Checklist Item 3",            value: "FITS EVERYONE", group: "Hero", type: "text" },
  { key: "hero.check4",           label: "Trust Checklist Item 4",            value: "NO DUMMY CODE", group: "Hero", type: "text" },
  { key: "hero.avatar",           label: "Retro Portrait Image URL",          value: "/assets/images/avatar/juwel_retro.png", group: "Hero", type: "image" },
  { key: "hero.certIssuer",       label: "Certificate Issuer Brand",          value: "JUWELMAFI.DEV", group: "Hero", type: "text" },
  { key: "hero.certSerial",       label: "Certificate Serial Code",           value: "NP-000001", group: "Hero", type: "text" },
  { key: "hero.certTitle",        label: "Certificate Title",                 value: "Certificate of Full-Stack", group: "Hero", type: "text" },
  { key: "hero.certSubtitle",     label: "Certificate Subtitle",              value: "Certified Nothing Enthusiast & Engineer", group: "Hero", type: "text" },
  { key: "hero.certPaid",         label: "Certificate Paid Amount",           value: "10 $", group: "Hero", type: "text" },
  { key: "hero.certIssued",       label: "Certificate Issued Date",           value: "01 OCT 2026", group: "Hero", type: "text" },
  { key: "hero.certExpires",      label: "Certificate Expiry Date",           value: "NEVER", group: "Hero", type: "text" },
  { key: "hero.certStatement",    label: "Certificate Statement / Note",      value: "Received, as promised, absolutely clean code. No bloated libraries, no dummy templates, no hidden bugs.", group: "Hero", type: "textarea" },
  { key: "hero.certStamp",        label: "Rubber Stamp Text",                 value: "RECEIVED CLEAN CODE", group: "Hero", type: "text" },
  { key: "hero.certMrz",          label: "Passport MRZ Line",                 value: "NPD<NTH000001<JUWEL<HOSSAIN<<<<<<<<<<<<<<<<<<\nPAID0001000USD<20261001<RECEIVED<CLEANCODE<<<<", group: "Hero", type: "textarea" },

  // The Stack
  { key: "stack.eyebrow",         label: "Stack Section Eyebrow",             value: "THE PRODUCT", group: "The Stack", type: "text" },
  { key: "stack.title",           label: "Stack Section Heading",             value: "Introducing The Stack.", group: "The Stack", type: "text" },
  { key: "stack.desc",            label: "Stack Section Description",         value: "Designed without materials. Built by an engineer. Compatible with everything you already run, because clean code scales anywhere.", group: "The Stack", type: "textarea" },
  { key: "stack.boxTitle",        label: "What's in the Box? Title",          value: "What's in the box?", group: "The Stack", type: "text" },
  { key: "stack.boxDesc",         label: "What's in the Box? Description",    value: "No plastic. No cables. No manual. Next.js 15, React 19, TypeScript, Express, MongoDB Atlas. Pure production performance.", group: "The Stack", type: "textarea" },
  { key: "stack.sticker",         label: "Starburst Sticker Text",            value: "certified clean", group: "The Stack", type: "text" },
  { key: "stack.specTitle",       label: "Specification Sheet Title",         value: "TECHNICAL SPECIFICATION", group: "The Stack", type: "text" },
  { key: "stack.specWeight",      label: "Spec: Weight",                      value: "0 g overhead", group: "The Stack", type: "text" },
  { key: "stack.specFramework",   label: "Spec: Framework",                   value: "Next.js 15 & React 19", group: "The Stack", type: "text" },
  { key: "stack.specLanguage",    label: "Spec: Language",                    value: "TypeScript (Strict)", group: "The Stack", type: "text" },
  { key: "stack.specBackend",     label: "Spec: Backend",                     value: "Node.js & Express API", group: "The Stack", type: "text" },
  { key: "stack.specDatabase",    label: "Spec: Database",                    value: "MongoDB Atlas & Mongoose", group: "The Stack", type: "text" },
  { key: "stack.specShipping",    label: "Spec: Shipping",                    value: "Fast & Automated CI/CD", group: "The Stack", type: "text" },
  { key: "stack.specBattery",     label: "Spec: Battery",                     value: "Forever*", group: "The Stack", type: "text" },
  { key: "stack.specWarranty",    label: "Spec: Warranty",                    value: "Nothing can go wrong", group: "The Stack", type: "text" },

  // Services & Pricing
  { key: "services.eyebrow",          label: "Services Section Eyebrow",      value: "PICK YOUR PROJECT", group: "Services & Pricing", type: "text" },
  { key: "services.title",            label: "Services Main Heading",         value: "How much is clean code worth to you?", group: "Services & Pricing", type: "text" },
  { key: "services.desc",             label: "Services Description",          value: "Every option contains exactly the same amount of engineering care. The only difference is the job title and system scope we print on your invoice.", group: "Services & Pricing", type: "textarea" },
  { key: "services.customBudgetLabel",label: "Custom Scope Title",            value: "Or write your own price", group: "Services & Pricing", type: "text" },
  { key: "services.customBudgetDesc", label: "Custom Scope Note",             value: "We build whatever number you choose. That is the whole feature.", group: "Services & Pricing", type: "textarea" },
  { key: "services.shrugNote",        label: "Bottom Shrug Note Text",        value: "Want to pay nothing? Close this tab. It is already yours. ¯\\_(ツ)_/¯", group: "Services & Pricing", type: "text" },

  // Projects & Ledger
  { key: "projects.eyebrow",      label: "Projects Eyebrow",                  value: "01 / THE WORK", group: "Projects & Ledger", type: "text" },
  { key: "projects.headerTitle",  label: "Projects Section Title",            value: "Featured Projects & Deployments", group: "Projects & Ledger", type: "text" },
  { key: "projects.headerDesc",   label: "Projects Section Description",      value: "Real-world full-stack web applications, custom platforms, and production systems built with Next.js, React, Node.js, and MongoDB.", group: "Projects & Ledger", type: "textarea" },
  { key: "education.eyebrow",     label: "Education Eyebrow",                 value: "02 / CREDENTIALS & ACADEMIA", group: "Projects & Ledger", type: "text" },
  { key: "education.title",       label: "Education Section Title",           value: "Academic Ledger & Formal Study", group: "Projects & Ledger", type: "text" },
  { key: "education.desc",        label: "Education Section Description",     value: "Verified university degrees and foundational academic milestones powering real-world engineering problem solving.", group: "Projects & Ledger", type: "textarea" },

  // Explore Hub
  { key: "explore.ticketNumber",  label: "Explore Ticket Identifier",         value: "TICKET #EXP-2026", group: "Explore Hub", type: "text" },
  { key: "explore.heading",       label: "Explore Section Heading",           value: "Want to explore more?", group: "Explore Hub", type: "text" },
  { key: "explore.desc",          label: "Explore Section Description",       value: "Read comprehensive technical breakdowns, study MERN stack architectures, watch full YouTube masterclasses, and browse continuous learning guides.", group: "Explore Hub", type: "textarea" },
  { key: "explore.btnText",       label: "Explore Button Text",               value: "Explore More (Blogs & Courses) →", group: "Explore Hub", type: "text" },
  { key: "explore.stickyNote",    label: "Pinned Sticky Note Quote",          value: "“No gatekeeping. Every tutorial, course, and essay is open for everyone to learn.”", group: "Explore Hub", type: "textarea" },

  // About & Contact
  { key: "about.tag",             label: "About Section Badge / Tag",         value: "About Me", group: "About & Contact", type: "text" },
  { key: "about.title",           label: "About Section Main Heading",        value: "Passionate MERN & Next.js Developer crafting scalable web platforms with clean architecture", group: "About & Contact", type: "textarea" },
  { key: "about.bio",             label: "About Description (Main Bio)",      value: "I’m a passionate MERN Stack Developer based in Bangladesh with a strong focus on frontend and full-stack solutions. I enjoy crafting interactive, accessible, and scalable web applications. I’m currently studying Computer Science & Engineering (CSE) at Sonargaon University, channeling my deep love for coding into building modern web experiences that solve real-world problems. Beyond writing clean code, I believe in focused learning, self-discipline, and improving 1% every day.", group: "About & Contact", type: "textarea" },
  { key: "about.location",        label: "Location",                          value: "Madaripur, Bangladesh", group: "About & Contact", type: "text" },
  { key: "about.email",           label: "Contact Email",                     value: "juwelhossain16457@gmail.com", group: "About & Contact", type: "text" },
  { key: "about.phone",           label: "Phone / WhatsApp",                  value: "+880 1859-797307", group: "About & Contact", type: "text" },

  // Social Links
  { key: "social.youtube",        label: "YouTube Channel URL",               value: "https://www.youtube.com/@juwelmafi", group: "Social Links", type: "url" },
  { key: "social.linkedin",       label: "LinkedIn Profile URL",              value: "https://www.linkedin.com/in/juwelmafi", group: "Social Links", type: "url" },
  { key: "social.github",         label: "GitHub Profile URL",                value: "https://github.com/juwelmafi", group: "Social Links", type: "url" },
  { key: "social.twitter",        label: "Twitter / X Profile URL",           value: "https://x.com/juwelmafi", group: "Social Links", type: "url" },
  { key: "social.facebook",       label: "Facebook Profile URL",              value: "https://facebook.com/juwelmafi", group: "Social Links", type: "url" },

  // Site Settings
  { key: "site.logo",             label: "Site Logo URL",                     value: "/assets/images/logo/favicon.svg", group: "Site Settings", type: "image" },
  { key: "site.favicon",          label: "Favicon URL",                       value: "/assets/images/logo/favicon.svg", group: "Site Settings", type: "url" },
  { key: "site.resumeUrl",        label: "Global Resume / CV URL",            value: "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing", group: "Site Settings", type: "url" },
  { key: "site.footerTitle",      label: "Footer Brand Name",                 value: "JUWEL HOSSAIN", group: "Site Settings", type: "text" },
  { key: "site.footerTagline",    label: "Footer Brand Tagline",              value: "MERN Stack & Next.js 15 Engineer", group: "Site Settings", type: "text" },
  { key: "site.footerDesc",       label: "Footer Description",                value: "MERN Stack & Next.js 15 developer crafting robust web platforms and educational engineering tutorials in Bangladesh.", group: "Site Settings", type: "textarea" },
  { key: "site.copyright",        label: "Footer Copyright Text",             value: "© 2026 Juwel Hossain. All rights reserved.", group: "Site Settings", type: "text" },
];

const DEFAULT_SEO = [
  {
    pageKey: "home",
    pageLabel: "Home Page",
    metaTitle: "Build websites. Keep the receipt. | Juwel Hossain – Full-Stack Engineer",
    metaDescription: "Zero bloat. Clean MERN & Next.js 15 architecture. Explore production-ready web apps, engineering masterclasses, and certified clean code by Juwel Hossain.",
    ogTitle: "Build websites. Keep the receipt. | Juwel Hossain",
    ogDescription: "Zero bloat. Clean MERN & Next.js 15 architecture that proves it was built on purpose.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Build websites. Keep the receipt. | Juwel Hossain",
    twitterDescription: "Zero bloat. Clean MERN & Next.js 15 architecture by Juwel Hossain.",
    canonicalUrl: "http://localhost:3000/",
  },
  {
    pageKey: "projects",
    pageLabel: "Projects Page",
    metaTitle: "Featured Projects & Deployments | Juwel Hossain",
    metaDescription: "Real-world full-stack web applications, custom platforms, and production systems built with Next.js, React, Node.js, and MongoDB.",
    ogTitle: "Featured Projects & Deployments | Juwel Hossain",
    ogDescription: "Real-world full-stack web applications, custom platforms, and production systems.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Featured Projects & Deployments | Juwel Hossain",
    twitterDescription: "Real-world full-stack web applications, custom platforms, and production systems.",
    canonicalUrl: "http://localhost:3000/#projects",
  },
  {
    pageKey: "services",
    pageLabel: "Services Page",
    metaTitle: "Services & Pricing — How much is clean code worth to you? | Juwel Hossain",
    metaDescription: "Every option contains exactly the same amount of engineering care. MERN & Next.js full-stack development, MVP platforms, and architectural consulting.",
    ogTitle: "Services & Pricing | Juwel Hossain",
    ogDescription: "How much is clean code worth to you? Modern web platform engineering.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Services & Pricing | Juwel Hossain",
    twitterDescription: "Every option contains exactly the same amount of engineering care.",
    canonicalUrl: "http://localhost:3000/#services",
  },
  {
    pageKey: "blog",
    pageLabel: "Blog Page",
    metaTitle: "Notebook & Essays | Juwel Hossain – Full-Stack Engineer",
    metaDescription: "Handcrafted technical essays, MERN stack case studies, Next.js architecture notes, and software design principles.",
    ogTitle: "Notebook & Essays | Juwel Hossain",
    ogDescription: "Handcrafted technical essays, MERN stack case studies, and architecture notes.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Notebook & Essays | Juwel Hossain",
    twitterDescription: "Handcrafted technical essays and architecture notes.",
    canonicalUrl: "http://localhost:3000/explore?tab=blogs",
  },
  {
    pageKey: "courses",
    pageLabel: "Courses Page",
    metaTitle: "Courses & Masterclasses | Juwel Hossain – Full-Stack Engineer",
    metaDescription: "Practical, 100% free web development curriculum — Next.js 15, React 19, MERN stack, and component architecture.",
    ogTitle: "Courses & Masterclasses | Juwel Hossain",
    ogDescription: "Practical, 100% free web development video courses.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Courses & Masterclasses | Juwel Hossain",
    twitterDescription: "Practical web development courses — Next.js, MERN stack, React, and beyond. All free.",
    canonicalUrl: "http://localhost:3000/explore?tab=courses",
  },
  {
    pageKey: "about",
    pageLabel: "About Page",
    metaTitle: "About Me | Juwel Hossain – MERN Stack & Next.js Engineer",
    metaDescription: "CSE student at Sonargaon University, full-stack engineer crafting scalable web apps with clean architecture in Bangladesh.",
    ogTitle: "About Me | Juwel Hossain",
    ogDescription: "Passionate MERN & Next.js developer studying CSE at Sonargaon University, building scalable web apps.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "About Me | Juwel Hossain",
    twitterDescription: "Passionate MERN & Next.js developer studying CSE at Sonargaon University.",
    canonicalUrl: "http://localhost:3000/#education",
  },
  {
    pageKey: "contact",
    pageLabel: "Contact Page",
    metaTitle: "Let’s Talk & Inquiries | Juwel Hossain – Full-Stack Engineer",
    metaDescription: "Drop a message for project collaborations, technical consulting, or freelance full-stack engineering opportunities.",
    ogTitle: "Let’s Talk | Juwel Hossain",
    ogDescription: "Let's build something memorable together. Drop a message for project collaborations.",
    ogImage: "/assets/images/avatar/juwel_retro.png",
    twitterTitle: "Let’s Talk | Juwel Hossain",
    twitterDescription: "Get in touch with Juwel Hossain for full-stack web engineering inquiries.",
    canonicalUrl: "http://localhost:3000/contact",
  },
];

async function sync() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;

  console.log("Upserting retro site content items into 'sitecontents'...");
  for (const item of DEFAULT_CONTENT) {
    await db.collection("sitecontents").updateOne(
      { key: item.key },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`Synced ${DEFAULT_CONTENT.length} content items successfully.`);

  console.log("Upserting retro SEO entries into 'seometas'...");
  for (const seo of DEFAULT_SEO) {
    await db.collection("seometas").updateOne(
      { pageKey: seo.pageKey },
      { $set: seo },
      { upsert: true }
    );
  }
  console.log(`Synced ${DEFAULT_SEO.length} SEO page entries successfully.`);

  console.log("ALL DATA SYNCHRONIZED WITH RETRO WEBSITE!");
  process.exit(0);
}

sync().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
