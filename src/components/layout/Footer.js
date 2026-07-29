"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react"

const services = [
  "Business Websites",
  "E-Commerce",
  "Custom Software",
  "Inventory Systems",
  "Restaurant Solutions",
  "AI Automation",
  "Landing Pages",
]

const companyLinks = [
  { name: "About", href: "#about" },
  { name: "Our Works", href: "#works" },
  { name: "Templates", href: "#templates" },
  { name: "Blogs", href: "#" },
  { name: "Pricing", href: "#pricing" },
  { name: "Careers (Coming Soon)", href: "#" },
  { name: "Contact", href: "#contact" },
]

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@smartbyte.dev" },
  { icon: Phone, label: "Phone", value: "+8801XXXXXXXXX" },
  { icon: MapPin, label: "Location", value: "Chattogram, Bangladesh" },
  { icon: Clock, label: "Working Hours", value: "Sat \u2013 Thu \u2022 9AM \u2013 8PM" },
]

const socialLinks = [
  {
    name: "Facebook",
    path: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    path: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    path: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    path: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    path: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 7.5H14v-2h8v2zm0 7.5c0 .5-.1 1-.3 1.5-.2.5-.5 1-1 1.4-.4.4-.9.7-1.5.9-.6.2-1.2.3-1.8.3-1.1 0-2.1-.3-2.9-.8-.8-.5-1.3-1.2-1.6-2.1-.3-.9-.4-1.8-.4-2.8 0-1 .1-2 .4-2.9.3-.9.9-1.7 1.6-2.3.7-.6 1.7-1 2.9-1 1.3 0 2.3.4 3.1 1.2.8.8 1.2 1.9 1.3 3.2H20c0-.7-.2-1.3-.6-1.8-.4-.5-.9-.8-1.6-.8-.7 0-1.3.3-1.7.8-.4.5-.6 1.2-.6 2h5.5V15zm-11 1.2c0 .6-.2 1.1-.6 1.5-.4.4-.9.7-1.5.9-.6.2-1.2.3-1.8.3H2V3h4.6c.7 0 1.3.1 1.9.3.6.2 1.1.6 1.5 1.1.4.5.6 1.1.6 1.8 0 .7-.2 1.3-.6 1.8-.4.5-.9.8-1.5 1-.7.2-1.3.3-1.9.3.6 0 1.2.1 1.8.4.5.2 1 .6 1.3 1.1.3.5.5 1.1.5 1.8zM5.5 7.5c0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.8-.3H4v2h.5c.3 0 .6-.1.8-.3.2-.2.2-.4.2-.7zm.5 4.5c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.9-.3H4v2.2h.8c.4 0 .7-.1.9-.3.2-.2.3-.5.3-.8zm10 1.5c0-.9-.3-1.4-.8-1.8-.5-.4-1.2-.5-1.9-.5-.8 0-1.5.2-1.9.5-.5.3-.8.8-.8 1.4v.4h5.4z" />
      </svg>
    ),
  },
]

function ServiceItem({ name }) {
  return (
    <SafeSlideUp className="group">
      <a
        href="#"
        className="relative inline-flex items-center gap-2 text-sm text-muted transition-all duration-300 hover:text-foreground"
      >
        <span className="relative">
          {name}
          <span className="absolute -bottom-px left-0 h-px w-0 bg-gradient-to-r from-accent to-accent-secondary transition-all duration-300 group-hover:w-full" />
        </span>
      </a>
    </SafeSlideUp>
  )
}

function CompanyLink({ name, href }) {
  const isComingSoon = name.includes("(Coming Soon)")

  return (
    <SafeSlideUp className="group">
      <a
        href={isComingSoon ? "#" : href}
        className={`inline-flex items-center gap-1.5 text-sm transition-all duration-300 ${
          isComingSoon
            ? "text-muted-foreground/60 cursor-not-allowed"
            : "text-muted hover:text-foreground"
        }`}
      >
        <span>{name}</span>
        <ArrowUpRight
          className={`h-3 w-3 transition-all duration-300 ${
            isComingSoon ? "opacity-0" : "opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
          }`}
        />
      </a>
    </SafeSlideUp>
  )
}

function ContactRow({ icon: Icon, label, value, index }) {
  return (
    <SafeSlideUp
      delay={index * 0.08}
      className="group flex items-start gap-3"
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-muted transition-all duration-300 group-hover:bg-accent/10 group-hover:text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm text-foreground/90">{value}</p>
      </div>
    </SafeSlideUp>
  )
}

function SocialIcon({ name, path, index }) {
  return (
    <SafeSlideUp delay={0.3 + index * 0.06}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-muted backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:border-accent/30 hover:text-accent hover:shadow-[0_0_20px_rgba(0,194,168,0.1)]"
      >
        {path}
      </a>
    </SafeSlideUp>
  )
}

export function Footer() {
  const [year] = useState(() => new Date().getFullYear())
  const [email, setEmail] = useState("")

  return (
    <footer className="relative overflow-hidden bg-[#090F1F]">
      {/* ═══ Background ═══ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className="absolute -right-48 -top-48 h-[700px] w-[700px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 168, 0.08), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(56, 189, 248, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 select-none text-[200px] font-display font-bold leading-none text-white/5 sm:text-[300px] lg:text-[500px]"
          style={{ filter: "blur(4px)" }}
          aria-hidden="true"
        >
          SMARTBYTE
        </div>
      </div>

      {/* ═══ Top CTA ═══ */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-[100px] sm:px-6 sm:pt-[120px] lg:px-8 lg:pt-[140px]">
        <SafeSlideUp className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Ready To Build
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Something Amazing?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Let&apos;s turn your business into a modern digital brand.
          </p>

          <div className="mt-8">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 text-sm font-semibold tracking-nav text-background transition-all duration-500"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <span
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "0 0 40px rgba(0, 194, 168, 0.3), 0 0 80px rgba(56, 189, 248, 0.15)",
                }}
              />
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "0 0 60px rgba(0, 194, 168, 0.15), 0 0 100px rgba(56, 189, 248, 0.08)",
                      animation: "pulse-glow 3s ease-in-out infinite 1s",
                    }}
                  />
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </SafeSlideUp>

        {/* ═══ Divider ═══ */}
        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* ═══ Middle Grid ═══ */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* ── Column 1: Company ── */}
          <SafeSlideUp>
            <a href="#" className="group mb-5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent to-accent-secondary">
                <span className="font-display text-sm font-bold text-background">
                  S
                </span>
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Smart<span className="text-accent">Byte</span>
              </span>
            </a>

            <p className="mb-6 text-sm leading-relaxed text-muted">
              We build high-performance websites, software, SaaS platforms and
              digital experiences that help businesses grow faster.
            </p>

            <div className="flex items-center gap-2.5">
              {socialLinks.map((link, i) => (
                <SocialIcon key={link.name} {...link} index={i} />
              ))}
            </div>
          </SafeSlideUp>

          {/* ── Column 2: Services ── */}
          <SafeSlideUp delay={0.1}>
            <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <ServiceItem key={s} name={s} />
              ))}
            </ul>
          </SafeSlideUp>

          {/* ── Column 3: Company Links ── */}
          <SafeSlideUp delay={0.2}>
            <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, i) => (
                <CompanyLink key={i} {...link} />
              ))}
            </ul>
          </SafeSlideUp>

          {/* ── Column 4: Contact ── */}
          <SafeSlideUp delay={0.3}>
            <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <ContactRow key={item.label} {...item} index={i} />
              ))}
            </div>
          </SafeSlideUp>
        </div>

        {/* ═══ Newsletter ═══ */}
        <SafeSlideUp
          delay={0.3}
          className="relative mx-auto mt-20 max-w-2xl overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl sm:p-10 lg:mt-24"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 194, 168, 0.15), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="text-center">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              Stay <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">Updated</span>
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Get design inspiration, business tips and product updates.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm text-foreground outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-accent/50 focus:shadow-[0_0_30px_rgba(0,194,168,0.1)]"
                required
              />
            </div>
            <button
              type="submit"
              className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-nav text-background transition-all duration-500"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <span
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "0 0 30px rgba(0, 194, 168, 0.3), 0 0 60px rgba(56, 189, 248, 0.15)",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Subscribe
                <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </button>
          </form>
        </SafeSlideUp>

        {/* ═══ Bottom Bar ═══ */}
        <div className="mt-16 border-t border-white/[0.05] py-8 sm:mt-20">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-muted-foreground/70 sm:text-sm">
              &copy; {year} SmartByte. All Rights Reserved.
            </p>

            <p className="text-xs text-muted-foreground/50 sm:text-sm">
              Made with <span className="text-red-400/80">&hearts;</span> in
              Bangladesh
            </p>

            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-xs text-muted-foreground/60 transition-all duration-300 hover:text-muted sm:text-sm"
                >
                  {item}
                  <span className="absolute -bottom-px left-0 h-px w-0 bg-gradient-to-r from-accent to-accent-secondary transition-all duration-300 hover:w-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
