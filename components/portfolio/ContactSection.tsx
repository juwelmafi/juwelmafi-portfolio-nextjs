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
      <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1.15fr_1.5fr] gap-2 sm:gap-2.5 mb-8">
        <div className="water-drop-card contact-info-card rounded-2xl transition-all flex items-center gap-2 overflow-hidden border-none">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border-none">
            <FaMapMarkerAlt className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00DE51]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[7.5px] sm:text-[8px] md:text-[8.5px] text-white/50 uppercase tracking-wider font-semibold">Location</p>
            <p className="text-[10px] sm:text-[10.5px] md:text-[11px] font-medium text-white mt-0.5 truncate">Madaripur, BD</p>
          </div>
        </div>

        <div className="water-drop-card contact-info-card rounded-2xl transition-all flex items-center gap-2 overflow-hidden border-none">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border-none">
            <FaPhoneAlt className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00DE51]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[7.5px] sm:text-[8px] md:text-[8.5px] text-white/50 uppercase tracking-wider font-semibold">WhatsApp</p>
            <a
              href="https://wa.me/8801859797307"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] sm:text-[9.5px] md:text-[10px] font-medium text-white hover:text-[#00DE51] transition-colors mt-0.5 block whitespace-nowrap truncate tracking-tight"
            >
              +880 1859-797307
            </a>
          </div>
        </div>

        <div className="water-drop-card contact-info-card rounded-2xl transition-all flex items-center gap-2 overflow-hidden border-none">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border-none">
            <FaEnvelope className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00DE51]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[7.5px] sm:text-[8px] md:text-[8.5px] text-white/50 uppercase tracking-wider font-semibold">Email</p>
            <a
              href="mailto:juwelhossain16457@gmail.com"
              title="juwelhossain16457@gmail.com"
              className="text-[7.5px] sm:text-[8px] md:text-[8px] lg:text-[8.5px] xl:text-[9.5px] font-sans font-medium text-white hover:text-[#00DE51] transition-colors block mt-0.5 tracking-tighter truncate"
            >
              juwelhossain16457@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Contact Form Card */}
      <form
        className="water-drop-card form-contact rounded-3xl transition-all border-none"
        id="contactform"
        onSubmit={handleSubmit}
      >
        <div className="form-content space-y-5 mb-6">
          <fieldset className="field-ip border-none p-0 m-0">
            <input
              type="text"
              id="name"
              placeholder="Your Full Name *"
              required
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 text-white placeholder-white/40 focus:ring-1 focus:ring-[#00DE51]/40 border-none outline-none transition-colors text-sm shadow-inner"
            />
          </fieldset>
          <fieldset className="field-ip border-none p-0 m-0">
            <input
              type="email"
              id="email"
              placeholder="Your Email Address *"
              required
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 text-white placeholder-white/40 focus:ring-1 focus:ring-[#00DE51]/40 border-none outline-none transition-colors text-sm shadow-inner"
            />
          </fieldset>
          <fieldset className="field-ip border-none p-0 m-0">
            <textarea
              id="message"
              placeholder="Project Description or Inquiry *"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 text-white placeholder-white/40 focus:ring-1 focus:ring-[#00DE51]/40 border-none outline-none transition-colors resize-none text-sm shadow-inner"
            />
          </fieldset>
        </div>

        <div className="form-action flex flex-wrap items-center justify-between gap-4 pt-4">
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
