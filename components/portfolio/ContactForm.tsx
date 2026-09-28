"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaClock,
} from "react-icons/fa";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: serviceParam ? `Inquiry regarding ${serviceParam}` : "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (serviceParam) {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry regarding ${serviceParam}`,
      }));
    }
  }, [serviceParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      Swal.fire({
        title: "Missing Information",
        text: "Please provide your name, email, and a message description.",
        icon: "warning",
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#00DE51",
      });
      return;
    }

    setSending(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject || "Portfolio Contact Inquiry",
            message: form.message,
          },
          publicKey
        );
      } catch (err) {
        console.error("EmailJS send failed:", err);
      }
    }

    setSending(false);
    setForm({ name: "", email: "", subject: "", message: "" });

    Swal.fire({
      title: "Message Dispatched!",
      text: "Thanks for reaching out! I will review your inquiry and get back to you promptly.",
      icon: "success",
      background: "#12121E",
      color: "#F0F0F5",
      confirmButtonColor: "#00DE51",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Direct Info Cards */}
      <div className="lg:col-span-5 space-y-5">
        <div className="water-drop-card p-6 sm:p-8 rounded-3xl">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-black bg-[#00DE51] inline-block mb-3">
            Direct Reach
          </span>
          <h2 className="heading-font text-2xl font-bold text-white mb-2">Let&apos;s Talk</h2>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
            Have a project in mind, need consultation on modern full-stack architectures, or looking to collaborate? Drop me a message anytime.
          </p>

          <div className="space-y-4">
            {/* Email Card */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00DE51]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00DE51]/10 flex items-center justify-center shrink-0 text-[#00DE51]">
                <FaEnvelope className="text-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Email</p>
                <a
                  href="mailto:juwelhossain16457@gmail.com"
                  className="text-xs sm:text-sm text-white font-medium hover:text-[#00DE51] transition-colors truncate block"
                >
                  juwelhossain16457@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp Phone */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00DE51]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00DE51]/10 flex items-center justify-center shrink-0 text-[#00DE51]">
                <FaPhoneAlt className="text-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">WhatsApp / Direct</p>
                <a
                  href="https://wa.me/8801859797307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-white font-medium hover:text-[#00DE51] transition-colors"
                >
                  +880 1859-797307
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00DE51]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00DE51]/10 flex items-center justify-center shrink-0 text-[#00DE51]">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Location</p>
                <p className="text-xs sm:text-sm text-white font-medium">Dhaka &amp; Madaripur, Bangladesh</p>
              </div>
            </div>

            {/* Response Time Badge */}
            <div className="flex items-center gap-2 text-xs text-white/50 pt-2 px-1">
              <FaClock className="text-[#00DE51] text-[10px]" />
              <span>Typical response time: Under 24 hours</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-6 border-t border-white/10 mt-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
              Connect on Social Platforms
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/juwelmafi"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <FaGithub className="text-base" />
              </a>
              <a
                href="https://www.linkedin.com/in/juwelmafi"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white hover:text-[#00DE51] flex items-center justify-center transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-base" />
              </a>
              <a
                href="https://www.youtube.com/@juwelmafi"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white hover:text-red-400 flex items-center justify-center transition-all hover:scale-105"
                aria-label="YouTube"
              >
                <FaYoutube className="text-base" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Inquiry Form */}
      <div className="lg:col-span-7">
        <form
          onSubmit={handleSubmit}
          className="water-drop-card p-6 sm:p-8 rounded-3xl space-y-5"
        >
          <div>
            <h3 className="heading-font text-xl sm:text-2xl font-bold text-white mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              Fill in your project details and I&apos;ll be in touch with you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Your Full Name <span className="text-[#00DE51]">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Alex Morgan"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#12121e]/90 text-white placeholder-white/30 text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-[#00DE51] focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Your Email Address <span className="text-[#00DE51]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="alex@company.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#12121e]/90 text-white placeholder-white/30 text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-[#00DE51] focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
              Subject or Project Scope
            </label>
            <input
              id="subject"
              type="text"
              placeholder="e.g. Next.js SaaS Web App Development"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-[#12121e]/90 text-white placeholder-white/30 text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-[#00DE51] focus:outline-none transition-all shadow-inner"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
              Project Description or Inquiry <span className="text-[#00DE51]">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me about your project, timeline, budget, or key challenges..."
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#12121e]/90 text-white placeholder-white/30 text-xs sm:text-sm p-4 rounded-xl border border-white/10 focus:border-[#00DE51] focus:outline-none transition-all resize-none shadow-inner"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm !text-black shadow-xl shadow-[#00DE51]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              <FaPaperPlane className="text-xs !text-black" />
              <span className="!text-black font-extrabold whitespace-nowrap">
                {sending ? "Sending Message..." : "Send Message"}
              </span>
            </button>
            <span className="text-xs text-white/50">
              Encrypted &amp; secure transmission
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
