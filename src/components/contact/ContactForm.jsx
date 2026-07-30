"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Building2,
  Mail,
  Phone,
} from "lucide-react"
import { Input } from "./Input"
import { Select } from "./Select"
import { Textarea } from "./Textarea"
import { Checkbox } from "./Checkbox"
import {
  projectTypes,
  budgetRanges,
  timelineOptions,
} from "./contactData"

const initialData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
  agreed: false,
}

function validate(data) {
  const errors = {}
  if (!data.fullName || data.fullName.trim().length < 2)
    errors.fullName = "Please enter your full name"
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address"
  if (!data.projectType) errors.projectType = "Please select a project type"
  if (!data.budget) errors.budget = "Please select a budget range"
  if (!data.timeline) errors.timeline = "Please select a timeline"
  if (!data.description || data.description.trim().length < 10)
    errors.description = "Please describe your project (at least 10 characters)"
  if (!data.agreed) errors.agreed = "You must agree to be contacted"
  return errors
}

function Ripple({ x, y, size, onComplete }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale: 3, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="pointer-events-none absolute rounded-full bg-white/20"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
    />
  )
}

export function ContactForm() {
  const [data, setData] = useState(initialData)
  const [touched, setTouched] = useState({})
  const [formStatus, setFormStatus] = useState("idle")
  const [serverError, setServerError] = useState("")
  const [ripples, setRipples] = useState([])
  const formRef = useRef(null)
  const announceRef = useRef(null)

  const errors = validate(data)

  useEffect(() => {
    if (formStatus === "error" && announceRef.current) {
      announceRef.current.textContent = "Form submission failed. " + (serverError || "Please try again.")
    }
    if (formStatus === "success" && announceRef.current) {
      announceRef.current.textContent = "Message sent successfully."
    }
  }, [formStatus, serverError])

  const handleChange = (field) => (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setData((prev) => ({ ...prev, [field]: val }))
    if (formStatus === "error") setFormStatus("idle")
    if (serverError) setServerError("")
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setTouched(
        Object.keys(initialData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      )

      const formErrors = validate(data)
      if (Object.keys(formErrors).length > 0) {
        const firstErrorField = Object.keys(formErrors)[0]
        const el = document.getElementById(`contact-${firstErrorField}`)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
          el.focus()
        }
        return
      }

      setFormStatus("submitting")
      setServerError("")

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        const result = await res.json()

        if (!res.ok) {
          if (result.errors) {
            setTouched(
              Object.keys(initialData).reduce(
                (acc, key) => ({ ...acc, [key]: true }),
                {}
              )
            )
            const firstField = Object.keys(result.errors)[0]
            const el = document.getElementById(`contact-${firstField}`)
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" })
              el.focus()
            }
            setFormStatus("idle")
            return
          }
          throw new Error(result.error || "Failed to send message")
        }

        setFormStatus("success")
        setTimeout(() => {
          setFormStatus("idle")
          setData(initialData)
          setTouched({})
        }, 5000)
      } catch (err) {
        setServerError(err.message || "Something went wrong. Please try again.")
        setFormStatus("error")
      }
    },
    [data]
  )

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height)
    setRipples((prev) => [...prev, { id: Date.now(), x, y, size }])
  }, [])

  const removeRipple = useCallback((id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8 lg:p-10"
    >
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div
        ref={announceRef}
        role="status"
        aria-live="polite"
        className="sr-only"
      />

      <h3 className="mb-8 font-display text-xl font-bold text-foreground sm:text-2xl">
        Send Us Your Project Details
      </h3>

      <AnimatePresence mode="wait">
        {formStatus === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
            >
              <CheckCircle className="h-10 w-10 text-accent" />
            </motion.div>
            <h4 className="mt-6 font-display text-2xl font-bold text-foreground">
              Message Sent Successfully!
            </h4>
            <p className="mt-2 text-sm text-muted">
              We&apos;ve received your project inquiry and will review it shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {formStatus === "error" && serverError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4"
                role="alert"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-300">{serverError}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                id="contact-fullname"
                label="Full Name"
                value={data.fullName}
                onChange={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                error={errors.fullName}
                touched={touched.fullName}
                required
                icon={User}
              />
              <Input
                id="contact-company"
                label="Company Name"
                value={data.companyName}
                onChange={handleChange("companyName")}
                onBlur={handleBlur("companyName")}
                error={errors.companyName}
                touched={touched.companyName}
                required={false}
                icon={Building2}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                id="contact-email"
                label="Email"
                type="email"
                value={data.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                required
                icon={Mail}
              />
              <Input
                id="contact-phone"
                label="Phone"
                type="tel"
                value={data.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                error={errors.phone}
                touched={touched.phone}
                required={false}
                icon={Phone}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Select
                id="contact-project-type"
                label="Project Type"
                value={data.projectType}
                onChange={handleChange("projectType")}
                onBlur={handleBlur("projectType")}
                error={errors.projectType}
                touched={touched.projectType}
                required
                options={projectTypes}
              />
              <Select
                id="contact-budget"
                label="Budget"
                value={data.budget}
                onChange={handleChange("budget")}
                onBlur={handleBlur("budget")}
                error={errors.budget}
                touched={touched.budget}
                required
                options={budgetRanges}
              />
              <Select
                id="contact-timeline"
                label="Timeline"
                value={data.timeline}
                onChange={handleChange("timeline")}
                onBlur={handleBlur("timeline")}
                error={errors.timeline}
                touched={touched.timeline}
                required
                options={timelineOptions}
              />
            </div>

            <Textarea
              id="contact-description"
              label="Project Description"
              value={data.description}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              error={errors.description}
              touched={touched.description}
              required
            />

            <Checkbox
              id="contact-agreed"
              checked={data.agreed}
              onChange={handleChange("agreed")}
              onBlur={handleBlur("agreed")}
              error={errors.agreed}
              touched={touched.agreed}
              label="I agree to be contacted regarding my project"
            />

            <div className="pt-4">
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                onClick={addRipple}
                className="group relative w-full overflow-hidden rounded-full py-4 text-sm font-semibold tracking-nav text-background transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <span
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(0, 194, 168, 0.3), 0 0 80px rgba(56, 189, 248, 0.15)",
                  }}
                />
                {ripples.map((r) => (
                  <Ripple
                    key={r.id}
                    x={r.x}
                    y={r.y}
                    size={r.size}
                    onComplete={() => removeRipple(r.id)}
                  />
                ))}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Let&apos;s Build Together
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
