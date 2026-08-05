"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  const validate = useCallback((value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return "Email is required"
    if (!re.test(value)) return "Please enter a valid email"
    return ""
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const err = validate(email)
    if (err) {
      setError(err)
      setStatus("error")
      return
    }
    setError("")
    setStatus("success")
    setEmail("")
  }, [email, validate])

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(15, 118, 110, 0.05), transparent 70%)",
          filter: "blur(100px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
        <SafeSlideUp>
          <div className="relative rounded-3xl border border-border/30 bg-gradient-to-br from-accent/[0.02] to-accent-secondary/[0.02] p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{
              background: "radial-gradient(circle, rgba(15, 118, 110, 0.15), transparent 70%)",
              filter: "blur(60px)",
            }} />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20">
                <Mail className="w-7 h-7 text-white" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Stay Updated With SmartByte
              </h3>
              <p className="text-base text-muted max-w-lg mx-auto leading-relaxed mb-8">
                Get practical articles, tutorials, industry insights, and digital business tips delivered to your inbox.
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-3 py-4"
                  >
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <span className="text-base font-medium text-foreground">You&rsquo;re subscribed! Check your inbox.</span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto"
                  >
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setError("") }}
                        placeholder="Enter your email"
                        className={cn(
                          "w-full px-5 py-3.5 rounded-xl text-sm bg-white/45 border outline-none transition-all duration-300",
                          "placeholder:text-muted-foreground/60 text-foreground",
                          "focus:ring-2 focus:ring-accent/50",
                          error ? "border-red-500/50" : "border-border/35 hover:border-border/55"
                        )}
                        aria-label="Email address"
                        aria-invalid={!!error}
                        aria-describedby={error ? "email-error" : undefined}
                      />
                      {error && (
                        <motion.p
                          id="email-error"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 left-0 text-xs text-red-600"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                    >
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted-foreground mt-6">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </SafeSlideUp>
      </div>
    </section>
  )
}
