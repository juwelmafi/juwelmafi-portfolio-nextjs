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
      text: "Thanks for reaching out! Juwel will get back to you soon.",
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
      <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade mb-6 font-semibold text-2xl md:text-3xl">
        Let’s Connect &amp; Build Something Great Together
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <FaMapMarkerAlt className="w-5 h-5 text-[#00DE51] shrink-0" />
          <div>
            <p className="text-xs text-white/50">Location</p>
            <p className="text-sm font-medium text-white">Madaripur, Bangladesh</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <FaPhoneAlt className="w-4 h-4 text-[#00DE51] shrink-0" />
          <div>
            <p className="text-xs text-white/50">Phone / WhatsApp</p>
            <a href="tel:+8801859797307" className="text-sm font-medium text-white hover:text-[#00DE51] transition-colors">
              +880 01859797307
            </a>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <FaEnvelope className="w-4 h-4 text-[#00DE51] shrink-0" />
          <div>
            <p className="text-xs text-white/50">Email Address</p>
            <a href="mailto:juwelhossain16457@gmail.com" className="text-xs font-mono font-medium text-white hover:text-[#00DE51] transition-colors truncate block max-w-[180px]">
              juwelhossain16457@gmail.com
            </a>
          </div>
        </div>
      </div>

      <form className="form-contact p-6 rounded-2xl bg-white/5 border border-white/10" id="contactform" onSubmit={handleSubmit}>
        <div className="form-content space-y-4 mb-6">
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
          <button type="submit" disabled={sending} className="tf-btn animate-btn animate-dark cursor-pointer">
            <span className="text-body-3 font-semibold">
              {sending ? "Sending..." : "Send Message"}
            </span>
          </button>
          <span className="text-xs text-white/50">
            Typically replies within 24 hours
          </span>
        </div>
      </form>
    </div>
  );
}
