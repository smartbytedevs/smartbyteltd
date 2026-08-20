"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
}

const services = [
  "Full-Stack Development",
  "UI/UX Design",
  "AI Solutions",
  "E-Commerce Platforms",
  "API Engineering",
]

const marqueeText =
  "100 VERIFIED 5 STAR REVIEWS • 50+ PROJECT DELIVERIES • CLIENTS IN 10+ COUNTRIES • DECCADES OF COMBINED EXPERIENCE • "

export default function AboutPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("source", "about")
    params.set("heading", "Let's talk")
    const identity = [form.name, form.email || form.phone].filter(Boolean).join(" — ")
    if (identity) params.set("subtitle", identity)
    params.set("description", "I'd like to learn more about SmartByte.")
    window.location.href = `/contact?${params.toString()}`
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* ═══════════════════════════════════════════════════════
            SCREEN 1 — Hero
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F7F7F7] px-6 pt-28 pb-20 md:px-16 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
              {/* Left */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700">
                    ⟶ About Us
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 text-6xl font-extrabold leading-[0.95] tracking-tight text-neutral-900 md:text-8xl"
                >
                  About SmartByte
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start"
                >
                  <span className="inline-flex shrink-0 items-center rounded-full bg-[#8ba4ff] px-4 py-2 text-sm font-semibold text-black">
                    Est. 2026
                  </span>
                  <p className="max-w-xl text-base leading-relaxed text-neutral-600">
                    A passion for launching and growing successful software
                    applications and brands has seen SmartByte deliver high-impact
                    web platforms. Today, SmartByte executes engineering-driven
                    strategies managed by elite web developers and designers.
                  </p>
                </motion.div>
              </div>

              {/* Right */}
              <div className="relative lg:col-span-5">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute -top-4 -left-4 z-10 rounded-full bg-[#8ba4ff] px-5 py-2 text-sm font-semibold text-black shadow-md"
                >
                  Proudly from Chittagong
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden rounded-3xl shadow-lg"
                >
                  <div className="aspect-4/3 bg-gradient-to-br from-neutral-200 to-neutral-300">
                    <img
                      src="/images/about-hero.jpg"
                      alt="SmartByte team"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 flex justify-end gap-4 text-sm text-neutral-500"
                >
                  <a
                    href="mailto:hello@smartbyte.com"
                    className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]"
                  >
                    hello@smartbyte.com
                  </a>
                  <span className="text-neutral-300">|</span>
                  <a
                    href="tel:+8801234567890"
                    className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]"
                  >
                    +880 1234 567890
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SCREEN 1-2 — Mission Statement
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left: Heading */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <h2 className="text-3xl font-bold leading-snug text-neutral-900 md:text-4xl">
                  <span className="mr-3 inline-block h-3 w-3 rounded-full bg-purple-400" />
                  Our mission? Help your business reach its online potential
                </h2>
              </motion.div>

              {/* Right: Image + Copy */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-7"
              >
                <div className="overflow-hidden rounded-3xl shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300">
                    <img
                      src="/images/about-mission.jpg"
                      alt="SmartByte workspace"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </div>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-neutral-600">
                  Founded in Chittagong, Bangladesh, SmartByte was born from a
                  belief that world-class digital products shouldn&apos;t be
                  gated by geography. We combine rigorous engineering standards
                  with a deep understanding of local and global markets to build
                  platforms that perform at scale.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SCREEN 2 — Growth Card & Contact
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] border border-neutral-200/80 bg-white p-8 shadow-sm md:p-12">
              <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                {/* Left: Form */}
                <div className="lg:col-span-6">
                  <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                    <span className="mr-2 inline-block h-3 w-3 rounded-full bg-neutral-900" />
                    Built by those who know how to make growth happen
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name*"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="w-full rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-900 outline-none placeholder-neutral-500 focus:ring-2 focus:ring-[#8ba4ff]/40"
                    />
                    <input
                      type="tel"
                      placeholder="Phone*"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="w-full rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-900 outline-none placeholder-neutral-500 focus:ring-2 focus:ring-[#8ba4ff]/40"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="w-full rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-900 outline-none placeholder-neutral-500 focus:ring-2 focus:ring-[#8ba4ff]/40"
                    />
                    <button
                      type="submit"
                      className="mt-2 inline-flex items-center rounded-full bg-[#8ba4ff] px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
                    >
                      Request Call Back
                    </button>
                  </form>
                </div>

                {/* Right: Copy + CTA */}
                <div className="lg:col-span-6">
                  <p className="text-base leading-relaxed text-neutral-600">
                    SmartByte is a full-service digital engineering agency
                    specializing in web platforms, SaaS products, and brand
                    digitalization. We partner with B2B and B2C companies to
                    architect scalable software, design conversion-focused
                    interfaces, and deploy AI-powered workflows that reduce
                    operational overhead.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-neutral-600">
                    From early-stage startups to established enterprises, our
                    team brings the technical depth and strategic thinking needed
                    to turn complex requirements into products people love to use.
                  </p>
                  <h4 className="mt-6 mb-2 text-2xl font-bold text-neutral-900">
                    Ready to go?
                  </h4>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SCREEN 3 — Services Pills
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-16 md:px-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-12">
              <motion.h2
                {...fadeUp}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-neutral-900"
              >
                <span className="mr-3 inline-block h-3 w-3 rounded-full bg-purple-400" />
                Our Services
              </motion.h2>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600"
              >
                Partnering with B2B and B2C brands across all sectors, delivering
                full-stack web platforms, UI/UX design, custom APIs, and AI
                integrations.
              </motion.p>
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {services.map((svc) => (
                  <Link
                    key={svc}
                    href="/services"
                    className="rounded-full border border-neutral-300 px-6 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-900 hover:text-white"
                  >
                    {svc}
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SCREEN 3 — Results Showcase (Dark)
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] bg-black p-8 text-white md:p-16">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                {/* Left: Screenshot */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden rounded-2xl lg:col-span-6"
                >
                  <div className="aspect-video bg-neutral-800">
                    <img
                      src="/images/about-results.jpg"
                      alt="SmartByte project results"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </motion.div>

                {/* Right: Copy */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-6"
                >
                  <h2 className="text-3xl font-bold md:text-4xl">
                    <span className="mr-3 inline-block h-3 w-3 rounded-full bg-[#8ba4ff]" />
                    We let our results do the talking
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
                    Our clients consistently see measurable improvements in
                    traffic, conversion rates, and operational efficiency within
                    months of launch. We don&apos;t just ship code — we deliver
                    outcomes that move the needle.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-6">
                    {[
                      { value: "15+", label: "Projects Delivered" },
                      { value: "98%", label: "Client Satisfaction" },
                      { value: "5+", label: "Industries Served" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <span className="text-3xl font-extrabold text-[#8ba4ff]">
                          {stat.value}
                        </span>
                        <span className="mt-1 block text-xs text-white/50">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SCREEN 4 — Marquee Social Proof
        ═══════════════════════════════════════════════════════ */}
        <section className="overflow-hidden py-20 md:py-28">
          <div className="relative">
            {/* Marquee Text */}
            <div className="flex whitespace-nowrap">
              <motion.div
                animate={{ x: [0, -2400] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex shrink-0 gap-0"
              >
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="text-8xl font-black tracking-tighter text-neutral-900/90 md:text-[12rem]"
                  >
                    {marqueeText}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-10 right-[15%] z-10 rounded-full bg-[#8ba4ff] px-5 py-2 text-sm font-semibold text-black shadow-lg"
            >
              Decades of experience
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-16 left-[10%] z-10 rounded-2xl border-2 border-white shadow-lg"
            >
              <div className="h-20 w-28 overflow-hidden rounded-2xl bg-neutral-200">
                <img
                  src="/images/about-marquee-1.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-20 left-[25%] z-10 rounded-full bg-[#8ba4ff] px-5 py-2 text-sm font-semibold text-black shadow-lg"
            >
              Clients in 10+ countries
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-lg font-medium text-neutral-900">
              Send us a brief and we&apos;ll talk
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center rounded-full bg-[#8ba4ff] px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              Contact Us
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
