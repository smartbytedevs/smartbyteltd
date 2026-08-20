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

export function ContactForm({
  initialValues = {},
  title = "Send Us Your Project Details",
  idPrefix = "contact",
  onSuccess,
}) {
  const [data, setData] = useState(() => ({ ...initialData, ...initialValues }))
  const [touched, setTouched] = useState({})
  const [formStatus, setFormStatus] = useState("idle")
  const [serverError, setServerError] = useState("")
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
        const el = document.getElementById(`${idPrefix}-${firstErrorField}`)
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
            const el = document.getElementById(`${idPrefix}-${firstField}`)
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
        onSuccess?.()
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
    [data, idPrefix, onSuccess]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10"
    >
      <div
        ref={announceRef}
        role="status"
        aria-live="polite"
        className="sr-only"
      />

      <h3 className="mb-8 font-display text-xl font-bold text-gray-900 sm:text-2xl">
        {title}
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
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8ba4ff]/10"
            >
              <CheckCircle className="h-10 w-10 text-[#8ba4ff]" />
            </motion.div>
            <h4 className="mt-6 font-display text-2xl font-bold text-gray-900">
              Message Sent Successfully!
            </h4>
            <p className="mt-2 text-sm text-gray-500">
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
                className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-50 p-4"
                role="alert"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{serverError}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                id={`${idPrefix}-fullname`}
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
                id={`${idPrefix}-company`}
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
                id={`${idPrefix}-email`}
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
                id={`${idPrefix}-phone`}
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
                id={`${idPrefix}-project-type`}
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
                id={`${idPrefix}-budget`}
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
                id={`${idPrefix}-timeline`}
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
              id={`${idPrefix}-description`}
              label="Project Description"
              value={data.description}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              error={errors.description}
              touched={touched.description}
              required
            />

            <Checkbox
              id={`${idPrefix}-agreed`}
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
                className="group relative w-full overflow-hidden rounded-full bg-gray-900 py-4 text-sm font-semibold tracking-nav text-white transition-all duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
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
