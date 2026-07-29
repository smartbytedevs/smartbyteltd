"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ChevronDown } from "lucide-react"
import { HeroBackground } from "./HeroBackground"
import { HeroHeading } from "./HeroHeading"
import { HeroButtons } from "./HeroButtons"
import { HeroTrust } from "./HeroTrust"
import { HeroAnimation } from "./HeroAnimation"
import { SafeFade, SafeSlideUp } from "@/components/common/SafeMotion"

export function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <HeroBackground />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-[104px] pb-16"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-90px-64px)]">
          {/* Left content */}
          <div className="flex flex-col justify-center py-12 lg:py-0">
            <HeroHeading />

            <SafeSlideUp delay={1.2} className="mt-6 text-base sm:text-lg text-muted max-w-lg leading-relaxed">
              We help startups and businesses transform their ideas into powerful
              digital products, custom software, and scalable web experiences.
            </SafeSlideUp>

            <HeroButtons />
            <HeroTrust />
          </div>

          {/* Right side animation */}
          <div className="hidden lg:flex items-center justify-center">
            <HeroAnimation />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] font-semibold tracking-nav uppercase">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
