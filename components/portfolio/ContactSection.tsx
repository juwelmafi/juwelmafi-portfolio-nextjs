"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in your name and email address.",
        icon: "warning",
        background: "#12121E",
        color: "#F0F0F5",
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
            message: form.message,
          },
          publicKey
        );
      } catch (err) {
        console.error("EmailJS send failed:", err);
      }
    }

    setSending(false);
    setForm({ name: "", email: "", message: "" });

    Swal.fire({
      title: "Message Sent!",
      text: "Thanks for reaching out! Juwel will get back to you promptly.",
      icon: "success",
      background: "#12121E",
      color: "#F0F0F5",
      confirmButtonColor: "#00DE51",
    });
  };

  return (
    <div id="contact" className="section-contact flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send"></i>Contact Me
      </div>
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-8 font-semibold text-2xl md:text-3xl">
        Let’s Connect &amp; Build Something Great Together
      </h4>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all flex items-center gap-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <FaMapMarkerAlt className="w-5 h-5 text-[#00DE51]" />
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Location</p>
            <p className="text-sm font-medium text-white mt-0.5">Madaripur, BD</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all flex items-center gap-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <FaPhoneAlt className="w-4 h-4 text-[#00DE51]" />
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">WhatsApp</p>
            <a href="tel:+8801859797307" className="text-sm font-medium text-white hover:text-[#00DE51] transition-colors mt-0.5 block">
              +880 01859797307
            </a>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all flex items-center gap-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <FaEnvelope className="w-4 h-4 text-[#00DE51]" />
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Email</p>
            <a href="mailto:juwelhossain16457@gmail.com" className="text-xs font-mono font-medium text-white hover:text-[#00DE51] transition-colors truncate block max-w-[160px] mt-0.5">
              juwelhossain16457@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Contact Form Card */}
      <form
        className="form-contact p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all backdrop-blur-xl shadow-2xl"
        id="contactform"
        onSubmit={handleSubmit}
      >
        <div className="form-content space-y-5 mb-6">
          <fieldset className="field-ip">
            <input
              type="text"
              id="name"
              placeholder="Your Full Name *"
              required
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#00DE51] outline-none transition-colors text-sm"
            />
          </fieldset>
          <fieldset className="field-ip">
            <input
              type="email"
              id="email"
              placeholder="Your Email Address *"
              required
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#00DE51] outline-none transition-colors text-sm"
            />
          </fieldset>
          <fieldset className="field-ip">
            <textarea
              id="message"
              placeholder="Project Description or Inquiry *"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#00DE51] outline-none transition-colors resize-none text-sm"
            />
          </fieldset>
        </div>

        <div className="form-action flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={sending}
            className="px-6 py-3 rounded-xl bg-[#00DE51] text-black font-bold text-sm hover:bg-[#33FF77] hover:scale-105 transition-all cursor-pointer shadow-lg shadow-[#00DE51]/20"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
          <span className="text-xs text-white/70 font-medium">
            Typically replies within 24 hours
          </span>
        </div>
      </form>
    </div>
  );
}
