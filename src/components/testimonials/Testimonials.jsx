"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { testimonials } from "./testimonials"
import { cn } from "@/lib/utils"

/* ── Floating element positions (desktop) ── */

const floatingElements = [
  // Top-left: media thumbnail (avatar of first testimonial)
  {
    type: "thumbnail",
    initials: testimonials[0]?.initials || "FR",
    name: testimonials[0]?.name || "",
    className: "hidden lg:flex -top-6 left-[8%]",
    delay: 0,
    duration: 4,
    glow: "#50FFAF",
  },
  // Top-center: pill badge
  {
    type: "badge",
    text: "Decades of experience",
    className: "hidden sm:flex top-2 left-1/2 -translate-x-1/2",
    delay: 0.5,
    duration: 3.5,
    glow: "#50FFAF",
  },
  // Top-right: media thumbnail
  {
    type: "thumbnail",
    initials: testimonials[1]?.initials || "SK",
    name: testimonials[1]?.company || "",
    className: "hidden lg:flex -top-4 right-[10%]",
    delay: 1,
    duration: 4.5,
    glow: "#38BDF8",
  },
  // Bottom-left: dark thumbnail
  {
    type: "thumbnail-dark",
    initials: testimonials[3]?.initials || "NI",
    name: testimonials[3]?.company || "",
    className: "hidden lg:flex bottom-8 left-[5%]",
    delay: 1.5,
    duration: 5,
    glow: "#A78BFA",
  },
  // Bottom-right: pill badge
  {
    type: "badge",
    text: "5.0 Rating Across Google",
    className: "hidden sm:flex bottom-12 right-[6%]",
    delay: 0.8,
    duration: 4,
    glow: "#50FFAF",
  },
  // Mid-left: small badge (tablet+)
  {
    type: "badge-sm",
    text: "Clients in 30+ countries",
    className: "hidden md:flex top-1/2 -translate-y-1/2 left-[2%]",
    delay: 1.2,
    duration: 3.8,
    glow: "#FF6B00",
  },
  // Mid-right: small thumbnail
  {
    type: "thumbnail-sm",
    initials: testimonials[5]?.initials || "JC",
    name: testimonials[5]?.company || "",
    className: "hidden md:flex top-[40%] right-[3%]",
    delay: 0.3,
    duration: 4.2,
    glow: "#50FFAF",
  },
]

function FloatingElement({ element }) {
  const { type, delay, duration, glow } = element

  if (type === "badge") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: delay + 0.3,
        }}
        whileHover={{ scale: 1.08 }}
        className={cn(
          "absolute z-20 flex items-center",
          element.className
        )}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
          className="relative"
        >
          {/* Glow behind */}
          <div
            className="absolute -inset-2 rounded-full blur-xl opacity-30"
            style={{ backgroundColor: glow }}
          />
          <div className="relative px-4 py-2 bg-[#50FFAF] text-black text-sm font-semibold rounded-full shadow-lg shadow-[#50FFAF]/20 whitespace-nowrap">
            {element.text}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (type === "badge-sm") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: delay + 0.3,
        }}
        whileHover={{ scale: 1.08 }}
        className={cn(
          "absolute z-20 flex items-center",
          element.className
        )}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
          className="relative"
        >
          <div
            className="absolute -inset-1.5 rounded-full blur-lg opacity-25"
            style={{ backgroundColor: glow }}
          />
          <div className="relative px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-full shadow-sm whitespace-nowrap">
            {element.text}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (type === "thumbnail" || type === "thumbnail-dark") {
    const isDark = type === "thumbnail-dark"
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: delay + 0.3,
        }}
        whileHover={{ scale: 1.08 }}
        className={cn(
          "absolute z-20 flex items-center",
          element.className
        )}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
          className="relative"
        >
          {/* Glow */}
          <div
            className="absolute -inset-3 rounded-2xl blur-xl opacity-25"
            style={{ backgroundColor: glow }}
          />
          <div
            className={cn(
              "relative flex items-center gap-3 rounded-2xl px-4 py-3 border shadow-lg",
              isDark
                ? "bg-gray-900 border-white/10"
                : "bg-white border-gray-200"
            )}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                backgroundColor: `${glow}15`,
                color: isDark ? "white" : "#111111",
              }}
            >
              {element.initials}
            </div>
            <div className="min-w-0">
              <p
                className={cn(
                  "text-sm font-semibold truncate max-w-[120px]",
                  isDark ? "text-white" : "text-gray-900"
                )}
              >
                {element.name}
              </p>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="#FBBF24"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // thumbnail-sm
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: delay + 0.3,
      }}
      whileHover={{ scale: 1.08 }}
      className={cn(
        "absolute z-20 flex items-center",
        element.className
      )}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="relative"
      >
        <div
          className="absolute -inset-2 rounded-xl blur-lg opacity-20"
          style={{ backgroundColor: glow }}
        />
        <div className="relative flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: `${glow}15`, color: "#111111" }}
          >
            {element.initials}
          </div>
          <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
            {element.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden bg-[#F7F7F8]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        {/* ── Giant Display Typography ── */}
        <div className="relative">
          {/* The massive text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <h2
              className={cn(
                "font-display font-extrabold text-[#111111] tracking-tight leading-[0.9] text-center",
                "text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem]"
              )}
            >
              100+ verified
              <br />
              <span className="relative inline-block">
                5-star
                {/* Underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-1 sm:bottom-0 left-0 right-0 h-[3px] sm:h-1 bg-[#50FFAF] origin-left rounded-full"
                />
              </span>{" "}
              reviews
            </h2>
          </motion.div>

          {/* ── Floating Elements ── */}
          {floatingElements.map((element, i) => (
            <FloatingElement key={i} element={element} />
          ))}
        </div>

        {/* ── Bottom CTA Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.4,
          }}
          className="mt-16 sm:mt-20 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <span className="text-base sm:text-lg text-gray-500 font-medium text-center">
            Send us a brief and we&apos;ll talk
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => (window.location.href = "/contact")}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#50FFAF] hover:bg-[#45E69D] text-black text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer shadow-lg shadow-[#50FFAF]/15"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
