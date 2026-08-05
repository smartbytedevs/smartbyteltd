"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { whyChooseUs } from "@/data/services"
import { cn } from "@/lib/utils"
import { Zap, Palette, Search, Smartphone, Shield, TrendingUp, DollarSign, HeadphonesIcon, Sparkles } from "lucide-react"

const iconMap = {
  Zap: [Zap, Palette],
  Palette,
  Search,
  Smartphone,
  Shield,
  TrendingUp,
  DollarSign,
  HeadphonesIcon,
  Sparkles,
}

function getIcon(id) {
  const iconList = {
    "fast-delivery": Zap,
    "modern-ui": Palette,
    "seo-ready": Search,
    "mobile-first": Smartphone,
    "high-performance": Zap,
    secure: Shield,
    scalable: TrendingUp,
    affordable: DollarSign,
    "dedicated-support": HeadphonesIcon,
  }
  return iconList[id] || Sparkles
}

export function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[30%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(15, 118, 110, 0.03), transparent 70%)",
          filter: "blur(100px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why Choose Us"
          title="Built Different. Built Better."
          description="Here's why businesses trust SmartByte to deliver their most important digital projects."
          align="center"
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {whyChooseUs.map((item, i) => {
            const Icon = getIcon(item.id)
            return (
              <SafeSlideUp key={item.id} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={cn(
                    "group relative rounded-2xl p-6 transition-all duration-300",
                    "bg-white/30 border border-border/30",
                    "hover:bg-white/55 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/10 flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-accent-secondary/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </motion.div>
              </SafeSlideUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
