"use client"

import { motion } from "motion/react"
import { HeroMediaCard, HeroFloatingBadgeFloat } from "./HeroMediaCards"

const headingLine = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
}

export function HeroHeading() {
  return (
    <div className="space-y-1">
      {/* Line 1: "Building Brands" + inline image */}
      <motion.div
        {...headingLine}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-wrap items-end gap-x-4 md:gap-x-5 gap-y-2"
      >
        <span className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-gray-900 tracking-tight leading-[0.9]">
          Building
        </span>
        <span className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-gray-900 tracking-tight leading-[0.9]">
          Brands
        </span>
        <HeroMediaCard
          src="/images/works/inventra.png"
          alt="Inventra project"
          className="w-20 h-14 md:w-28 md:h-[72px] lg:w-36 lg:h-24 mb-1"
          delay={0.6}
        />
      </motion.div>

      {/* Line 2: Badge + image + "That Grow, Scale," */}
      <motion.div
        {...headingLine}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-2"
      >
        <HeroFloatingBadgeFloat color="mint" delay={0.8} className="mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-900/40 mr-1.5" />
          World class team
        </HeroFloatingBadgeFloat>
        <HeroMediaCard
          src="/images/works/routemate.png"
          alt="Routemate project"
          className="w-16 h-12 md:w-24 md:h-16 lg:w-32 lg:h-20"
          delay={0.7}
        />
        <span className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-gray-900 tracking-tight leading-[0.9]">
          That Grow,
        </span>
        <span className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-gray-900 tracking-tight leading-[0.9]">
          Scale,
        </span>
      </motion.div>

      {/* Line 3: "& Lead" + description + badge + image */}
      <motion.div
        {...headingLine}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-wrap items-end gap-x-4 md:gap-x-5 gap-y-3"
      >
        <span className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-gray-900 tracking-tight leading-[0.9]">
          &amp; Lead
        </span>

        <div className="hidden md:flex items-center gap-3 ml-2 mb-2">
          <div className="w-px h-12 bg-gray-300" />
          <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed">
            We craft digital experiences that drive real business results.
          </p>
        </div>

        <HeroFloatingBadgeFloat color="pink" delay={1.0} className="mb-2">
          100M+ client revenue
        </HeroFloatingBadgeFloat>

        <HeroMediaCard
          src="/images/works/levenverse.png"
          alt="Levenverse project"
          className="w-20 h-14 md:w-28 md:h-[72px] lg:w-36 lg:h-24 mb-1"
          delay={0.9}
        />
      </motion.div>
    </div>
  )
}
