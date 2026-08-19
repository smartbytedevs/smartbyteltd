"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function getInitialMessage(params) {
  const heading = params.get("heading")
  const subtitle = params.get("subtitle")
  const template = params.get("template")
  const parts = []
  if (heading) parts.push(heading)
  if (subtitle) parts.push(subtitle)
  if (template) parts.push(`Template: ${template}`)
  return parts.join(" — ")
}

function ContactFormInner() {
  const params = useSearchParams()
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    referral: params.get("source") || "",
    message: getInitialMessage(params),
  }))
  const [status, setStatus] = useState("idle")
  const [serverError, setServerError] = useState("")

  function validate(data) {
    const errors = {}
    if (!data.name || data.name.trim().length < 2)
      errors.name = "Please enter your name"
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Please enter a valid email"
    if (!data.message || data.message.trim().length < 10)
      errors.message = "Please describe your project (10+ characters)"
    return errors
  }

  const errors = validate(form)

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) return

    setStatus("submitting")
    setServerError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          projectType: "Other",
          budget: "Custom",
          timeline: "ASAP",
          description: form.message.trim(),
          agreed: true,
          referral: form.referral.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setServerError(
          data?.errors?.message || "Something went wrong. Please try again."
        )
        return
      }

      setStatus("success")
      setForm({ name: "", email: "", phone: "", referral: "", message: "" })
    } catch {
      setStatus("error")
      setServerError("Network error. Please try again later.")
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* ═══════════════════════════════════════════════════════
            DARK HERO
        ═══════════════════════════════════════════════════════ */}
        <section className="rounded-b-[2.5rem] bg-[#0D0D0D] px-6 pt-24 pb-16 text-white md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-extrabold tracking-tight md:text-9xl"
            >
              Let&apos;s Talk
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 text-xl text-neutral-300 md:text-2xl"
            >
              Take advantage of a{" "}
              <span className="mx-1 inline-block rounded-full bg-[#E9D5FF] px-4 py-1 font-medium text-purple-950">
                free consultation
              </span>
              .
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-300 md:text-base"
            >
              <a
                href="mailto:hello@smartbyte.com"
                className="underline underline-offset-4 transition-colors hover:text-[#50FFAF]"
              >
                hello@smartbyte.com
              </a>
              <a
                href="tel:+8801234567890"
                className="transition-colors hover:text-[#50FFAF]"
              >
                +880 1234 567890
              </a>
              <span>Chittagong, Bangladesh</span>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              FORM
          ═══════════════════════════════════════════════════════ */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto max-w-3xl space-y-4"
            noValidate
          >
            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
                <CheckCircle className="h-5 w-5 shrink-0" />
                Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && serverError && (
              <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {serverError}
              </div>
            )}

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  placeholder="Name*"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  className={`w-full rounded-2xl border bg-[#222222] px-5 py-4 text-white placeholder-neutral-400 transition-colors focus:outline-none focus:border-[#50FFAF] ${
                    errors.name && form.name
                      ? "border-red-500/50"
                      : "border-neutral-800"
                  }`}
                />
                {errors.name && form.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email*"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  className={`w-full rounded-2xl border bg-[#222222] px-5 py-4 text-white placeholder-neutral-400 transition-colors focus:outline-none focus:border-[#50FFAF] ${
                    errors.email && form.email
                      ? "border-red-500/50"
                      : "border-neutral-800"
                  }`}
                />
                {errors.email && form.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Row 2: Phone + Referral */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange("phone")}
                className="w-full rounded-2xl border border-neutral-800 bg-[#222222] px-5 py-4 text-white placeholder-neutral-400 transition-colors focus:outline-none focus:border-[#50FFAF]"
              />
              <input
                type="text"
                placeholder="How did you hear about SmartByte?"
                value={form.referral}
                onChange={handleChange("referral")}
                className="w-full rounded-2xl border border-neutral-800 bg-[#222222] px-5 py-4 text-white placeholder-neutral-400 transition-colors focus:outline-none focus:border-[#50FFAF]"
              />
            </div>

            {/* Row 3: Message */}
            <div>
              <textarea
                placeholder="Message*"
                required
                rows={4}
                value={form.message}
                onChange={handleChange("message")}
                className={`w-full resize-none rounded-2xl border bg-[#222222] p-5 text-white placeholder-neutral-400 transition-colors focus:outline-none focus:border-[#50FFAF] ${
                  errors.message && form.message
                    ? "border-red-500/50"
                    : "border-neutral-800"
                }`}
              />
              {errors.message && form.message && (
                <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#50FFAF] px-10 py-3.5 text-sm font-bold text-black shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </motion.form>
        </section>

        {/* ═══════════════════════════════════════════════════════
            MAP
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-[2.5rem] border border-neutral-200 shadow-inner"
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=91.75%2C22.30%2C91.85%2C22.40&layer=mapnik&marker=22.3569%2C91.8000"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SmartByte Headquarters — Chittagong, Bangladesh"
                className="h-[400px] w-full md:h-[500px]"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactFormInner />
    </Suspense>
  )
}
