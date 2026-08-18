"use client"

import { motion } from "motion/react"
import { awards } from "@/data/works"
import { Briefcase, Star, Zap, Palette, Code, Search, Smartphone, TrendingUp } from "lucide-react"

const iconMap = {
  Briefcase, Star, Zap, Palette, Code, Search, Smartphone, TrendingUp,
}

export function AwardsStrip() {
  return (
    <section className="relative py-16 overflow-hidden bg-background border-y border-border/25">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.01]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex gap-12 md:gap-20 items-center shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...awards, ...awards].map((item, i) => {
              const Icon = iconMap[item.icon]
              return (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  {Icon && <Icon className="w-5 h-5 text-accent" />}
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">{item.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
