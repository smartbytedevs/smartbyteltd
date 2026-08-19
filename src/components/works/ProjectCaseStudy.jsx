"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
}

function Highlight({ children }) {
  return (
    <span className="mx-1 inline-block rounded-full bg-[#E9D5FF] px-3 py-1 text-purple-950">
      {children}
    </span>
  )
}

function MetricCard({ value, label }) {
  return (
    <div className="flex flex-col justify-center rounded-3xl bg-black p-8 text-white">
      <span className="text-5xl font-extrabold tracking-tight md:text-6xl">
        {value}
      </span>
      <span className="mt-3 text-sm leading-relaxed text-white/70">
        {label}
      </span>
    </div>
  )
}

export function ProjectCaseStudy({ project }) {
  const cs = project.caseStudy || {}
  const [form, setForm] = useState({ name: "", phone: "", email: "" })

  const coverImage = project.coverImage || project.thumbnail || ""
  const gallery = (cs.gallery || []).filter(Boolean)
  const tags = project.servicesProvided || project.technologies?.slice(0, 4) || []
  const metrics =
    cs.metrics && cs.metrics.length > 0
      ? cs.metrics
      : project.statistics || []

  const defaultMetrics = [
    { value: "400%", label: "Avg. organic traffic increase" },
    { value: "22%", label: "Higher Conversion Rate" },
    { value: "50%", label: "Increase in leads & inquiries" },
  ]

  const displayMetrics =
    metrics.length >= 3
      ? metrics.slice(0, 3).map((m) => ({
          value: `${m.value ?? ""}${m.suffix ?? ""}`,
          label: m.label,
        }))
      : defaultMetrics

  const testimonial = cs.testimonial || project.testimonial

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("source", "case-study")
    params.set("heading", `Interested in ${project.title}?`)
    const identity = [form.name, form.email || form.phone].filter(Boolean).join(" — ")
    if (identity) params.set("subtitle", identity)
    params.set("description", `I'd like to discuss a project similar to "${project.title}".`)
    window.location.href = `/contact?${params.toString()}`
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* ══════════════════════════════════════════════════════
            SCREEN 1 — Full-Bleed Hero Banner
        ══════════════════════════════════════════════════════ */}
        <section className="px-4 pt-6 pb-8 md:px-8 md:pt-8">
          <div className="relative min-h-[75vh] overflow-hidden rounded-[2.5rem] bg-neutral-900 p-8 md:p-12">
            {/* Background Image */}
            {coverImage && (
              <img
                src={coverImage}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex min-h-[65vh] flex-col justify-between">
              {/* Top Row */}
              <div>
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/40"
                >
                  ⟶ Work
                </Link>
              </div>

              {/* Bottom Content */}
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                {/* Left: Title + Tags */}
                <div className="max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-7xl"
                  >
                    {project.title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/30 bg-black/30 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Right: Summary */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="max-w-md text-base leading-relaxed text-white/90 md:text-lg"
                >
                  {project.description}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SCREEN 2 — Objective & Metrics
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-7xl">
            {/* Objective Statement */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="my-20 max-w-4xl text-center text-2xl font-semibold leading-snug text-neutral-900 md:text-4xl">
                {cs.overview ||
                  project.description}{" "}
                The goal was clear — help the client{" "}
                <Highlight>outgrown its previous site</Highlight>, deliver a{" "}
                <Highlight>full digital transformation</Highlight>, and drive{" "}
                <Highlight>long-term revenue growth</Highlight>.
              </p>
            </motion.div>

            {/* Showcase + Metrics Grid */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12"
            >
              {/* Left: Screenshot */}
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-md lg:col-span-7">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={`${project.title} showcase`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-neutral-100 text-neutral-400">
                    No preview available
                  </div>
                )}
              </div>

              {/* Right: Metric Cards */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                {displayMetrics.map((m) => (
                  <MetricCard key={m.label} value={m.value} label={m.label} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SCREEN 3 — Narrative & Gallery
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* Section Heading */}
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                <span className="mr-3 inline-block h-3 w-3 rounded-full bg-purple-400" />
                A complete digital refresh built for performance
              </h2>
            </motion.div>

            {/* Narrative */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 max-w-2xl"
            >
              <h3 className="mb-4 text-3xl font-bold text-neutral-900">
                A brand and website built to reflect the business properly
              </h3>
              <p className="leading-relaxed text-neutral-600">
                {cs.clientProblem ||
                  cs.strategy ||
                  cs.development ||
                  project.summary ||
                  project.description}
              </p>
            </motion.div>

            {/* Features List */}
            {cs.features && cs.features.length > 0 && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-8 max-w-2xl"
              >
                <ul className="space-y-2">
                  {cs.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-neutral-600"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* 3-Card Media Gallery */}
            {gallery.length > 0 && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                {gallery.slice(0, 3).map((src, i) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-3xl shadow-sm"
                  >
                    <img
                      src={src}
                      alt={`${project.title} showcase ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {/* Fallback gallery if no images */}
            {gallery.length === 0 && coverImage && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-3xl shadow-sm"
                  >
                    <img
                      src={coverImage}
                      alt={`${project.title} view ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SCREEN 4 — Testimonial & Callback Form
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 pb-20 md:px-16 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] bg-[#F7F7F7] p-8 md:p-16">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                {/* Left: Testimonial */}
                <div className="flex gap-6 lg:col-span-7">
                  <div className="w-1 shrink-0 rounded-full bg-[#50FFAF]" />
                  <div>
                    {testimonial ? (
                      <>
                        <p className="text-xl font-medium leading-relaxed text-neutral-900 md:text-2xl">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="mt-6">
                          <p className="font-bold text-neutral-900">
                            {testimonial.author}
                          </p>
                          {testimonial.role && (
                            <p className="mt-0.5 text-sm text-neutral-500">
                              {testimonial.role}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-medium leading-relaxed text-neutral-900 md:text-2xl">
                          &ldquo;SmartByte delivered a platform that exceeded
                          our expectations in every way. The attention to detail
                          and commitment to quality was outstanding.&rdquo;
                        </p>
                        <div className="mt-6">
                          <p className="font-bold text-neutral-900">
                            {project.client || "Client"}
                          </p>
                          <p className="mt-0.5 text-sm text-neutral-500">
                            Director of Business Development
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: Callback Form */}
                <div className="lg:col-span-5">
                  <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                    <span className="mr-2 inline-block h-3 w-3 rounded-full bg-neutral-900" />
                    Request a Call Back
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
                      className="w-full rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-900 outline-none placeholder-neutral-500 focus:ring-2 focus:ring-[#50FFAF]/40"
                    />
                    <input
                      type="tel"
                      placeholder="Phone*"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="w-full rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-900 outline-none placeholder-neutral-500 focus:ring-2 focus:ring-[#50FFAF]/40"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="w-full rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-900 outline-none placeholder-neutral-500 focus:ring-2 focus:ring-[#50FFAF]/40"
                    />
                    <button
                      type="submit"
                      className="mt-2 inline-flex items-center rounded-full bg-[#50FFAF] px-8 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
