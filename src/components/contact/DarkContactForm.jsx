"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { DarkInput } from "./DarkInput"
import { DarkTextarea } from "./DarkTextarea"

const initialData = {
  name: "",
  email: "",
  phone: "",
  referral: "",
  message: "",
}

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

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1 + i * 0.08,
    },
  }),
}

export function DarkContactForm() {
  const [data, setData] = useState(initialData)
  const [touched, setTouched] = useState({})
  const [formStatus, setFormStatus] = useState("idle")
  const [serverError, setServerError] = useState("")
  const formRef = useRef(null)
  const announceRef = useRef(null)

  const errors = validate(data)

  useEffect(() => {
    if (formStatus === "error" && announceRef.current) {
      announceRef.current.textContent =
        "Form submission failed. " + (serverError || "Please try again.")
    }
    if (formStatus === "success" && announceRef.current) {
      announceRef.current.textContent = "Message sent successfully."
    }
  }, [formStatus, serverError])

  const handleChange = (field) => (e) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
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
        const el = document.getElementById(`dark-${firstErrorField}`)
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
          body: JSON.stringify({
            fullName: data.name,
            email: data.email,
            phone: data.phone,
            projectType: "Other",
            budget: "Custom",
            timeline: "ASAP",
            description: `[Referral: ${data.referral || "N/A"}] ${data.message}`,
            agreed: true,
          }),
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
            const el = document.getElementById(`dark-${firstField}`)
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
        setServerError(err.message || "Something went wrong.")
        setFormStatus("error")
      }
    },
    [data]
  )

  return (
    <>
      <div
        ref={announceRef}
        role="status"
        aria-live="polite"
        className="sr-only"
      />

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
            className="flex h-20 w-20 items-center justify-center rounded-full bg-[#50FFAF]/10"
          >
            <CheckCircle className="h-10 w-10 text-[#50FFAF]" />
          </motion.div>
          <h4 className="mt-6 font-display text-2xl font-bold text-white">
            Message Sent!
          </h4>
          <p className="mt-2 text-sm text-gray-400">
            We&apos;ll get back to you within 2 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          {formStatus === "error" && serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{serverError}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div custom={0} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <DarkInput
                id="dark-name"
                label="Name *"
                value={data.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                touched={touched.name}
                required
              />
            </motion.div>
            <motion.div custom={1} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <DarkInput
                id="dark-email"
                label="Email *"
                type="email"
                value={data.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                required
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div custom={2} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <DarkInput
                id="dark-phone"
                label="Phone"
                type="tel"
                value={data.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                error={errors.phone}
                touched={touched.phone}
              />
            </motion.div>
            <motion.div custom={3} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <DarkInput
                id="dark-referral"
                label="How did you hear about SmartByte?"
                value={data.referral}
                onChange={handleChange("referral")}
                onBlur={handleBlur("referral")}
                error={errors.referral}
                touched={touched.referral}
              />
            </motion.div>
          </div>

          <motion.div custom={4} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <DarkTextarea
              id="dark-message"
              label="Message *"
              value={data.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
              error={errors.message}
              touched={touched.message}
              required
              rows={4}
            />
          </motion.div>

          <motion.div
            custom={5}
            variants={fieldVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-4 flex justify-center"
          >
            <motion.button
              type="submit"
              disabled={formStatus === "submitting"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#50FFAF] px-8 py-3.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#45E69D] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-lg shadow-[#50FFAF]/15"
            >
              {formStatus === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      )}
      </AnimatePresence>
    </>
  )
}
