# Juwel Hossain — Modern Full-Stack Portfolio & Personal Brand

A modern, elegant, and responsive personal portfolio & blog built with **Next.js 15 (App Router)**, **MongoDB Atlas (Mongoose)**, **NextAuth.js v5**, and **Tailwind CSS**.

---

## ✨ Features

- ⚡ **Next.js 15 App Router & Server Components** — Blazing fast ISR rendering with 60s revalidation.
- 🎨 **Elevated Minimalist Aesthetics** — Glassmorphism cards, glowing interactive tech badges, animated vertical timeline, floating stat badges, and smooth scroll.
- 🗄️ **MongoDB Atlas Database** — Full CRUD management for Projects & Blog posts with Mongoose schemas.
- 🔐 **Secure Admin Dashboard (`/admin`)** — Protected route powered by NextAuth.js v5 credentials provider and middleware.
- ✍️ **Dynamic Blog Engine** — Homepage preview, `/blog` listing, `/blog/[slug]` markdown-friendly articles, tag filters, and publish/draft toggles.
- 🚀 **1-Click Seed Tool** — Auto-populate all 5 initial projects directly from the Admin Dashboard into MongoDB.
- ✉️ **Contact Form** — Integrated with EmailJS and SweetAlert2 interactive alerts.
- 🌐 **Vercel Ready** — Fully optimized for zero-config Vercel deployment under domain `juwelmafi`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Database**: MongoDB Atlas + Mongoose
- **Auth**: NextAuth.js v5 (Credentials Provider)
- **Styling**: Tailwind CSS + Custom CSS Variables & Glassmorphism Design System
- **Icons**: React Icons (Fa, Si, Md, Hi)
- **Interactive**: Framer Motion, React Typewriter, SweetAlert2, EmailJS

---

## 🚀 Getting Started

### 1. Clone or Open the Project
```bash
cd portfolio-nextjs
npm install
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in the required values:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/juwelmafi?retryWrites=true&w=majority
ADMIN_EMAIL=juwelhossain16457@gmail.com
ADMIN_PASSWORD=your_secure_password_here
AUTH_SECRET=your_random_32_character_secret
NEXTAUTH_URL=http://localhost:3000
```

> **Tip to generate `AUTH_SECRET`**:
> Run in terminal:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

---

## 🛡️ Admin Dashboard & Seed Data

1. Visit [http://localhost:3000/login](http://localhost:3000/login)
2. Log in using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you defined in `.env.local`
3. In the dashboard overview, click **"Seed Default Projects"** to immediately import your existing 5 portfolio projects into MongoDB!
4. You can now add, edit, reorder, delete projects, and write blog posts.

---

## 📤 Push to a New GitHub Repository

In the `portfolio-nextjs` folder:
```bash
# 1. Create a new empty repository on github.com (e.g., https://github.com/juwelmafi/juwelmafi-portfolio)
# 2. Add remote & push:
git remote add origin https://github.com/juwelmafi/YOUR-NEW-REPO-NAME.git
git branch -M main
git push -u origin main
```

---

## ☁️ Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**
2. Import your new GitHub repository
3. Under **Environment Variables**, add:
   - `MONGODB_URI`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `AUTH_SECRET`
   - `NEXTAUTH_URL` → `https://juwelmafi.vercel.app` (or your custom domain)
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Click **Deploy**!
5. In your Vercel Project Settings → **Domains**, configure `juwelmafi` / `juwelmafi.vercel.app`.
