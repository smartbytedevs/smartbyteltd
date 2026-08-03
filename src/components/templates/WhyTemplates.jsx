"use client"

import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { cn } from "@/lib/utils"
import { Palette, Smartphone, Gauge, Clock, Sliders, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Professionally Designed",
    description: "Every template is crafted by our design team with pixel-perfect attention to typography, spacing, and visual hierarchy.",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Seamlessly adapts to any screen size — from 320px mobile displays to 4K desktop monitors. Tested on all major devices.",
  },
  {
    icon: Gauge,
    title: "SEO Optimized",
    description: "Built with semantic HTML, fast loading times, and metadata best practices to help your business rank higher in search results.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Most templates ship within 4–14 days. We handle the technical setup so you can focus on running your business.",
  },
  {
    icon: Sliders,
    title: "Customizable",
    description: "Easily tailor colors, content, and layout to match your brand. Full source code access means no limitations on what you can change.",
  },
  {
    icon: TrendingUp,
    title: "Built for Growth",
    description: "Scalable architecture that grows with your business. Add features, integrate tools, and expand without rebuilding from scratch.",
  },
]

const iconColors = [
  "from-emerald-500/20 to-emerald-500/5 text-emerald-600",
  "from-sky-500/20 to-sky-500/5 text-sky-600",
  "from-violet-500/20 to-violet-500/5 text-violet-600",
  "from-amber-500/20 to-amber-500/5 text-amber-600",
  "from-pink-500/20 to-pink-500/5 text-pink-600",
  "from-cyan-500/20 to-cyan-500/5 text-cyan-600",
]

export function WhyTemplates() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(43,33,24,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,33,24,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute bottom-[10%] -right-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(160, 58, 30, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why SmartByte"
          title={
            <>
              Why Choose
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                SmartByte Templates
              </span>
            </>
          }
          description="Every template is built with the same care and quality as our custom projects — production-ready from day one."
          align="center"
          maxWidth="640px"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl p-6 md:p-8 bg-white/30 border border-border/30 hover:bg-white/4555 hover:border-border/40 transition-all duration-300"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5",
                  iconColors[i]
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
