"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { resources } from "@/data/blog"
import { cn } from "@/lib/utils"
import { ClipboardCheck, Search, Rocket, TrendingUp, ArrowDownToLine, FileText } from "lucide-react"

const iconMap = {
  ClipboardCheck, Search, Rocket, TrendingUp,
}

const defaultIcon = FileText

export function ResourcesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[30%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.03), transparent 70%)",
          filter: "blur(100px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Free Resources"
          title="Tools To Help You Grow"
          description="Download practical guides, checklists, and templates to accelerate your digital projects."
          align="center"
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {resources.map((resource, i) => {
            const Icon = iconMap[resource.icon] || defaultIcon
            return (
              <SafeSlideUp key={resource.id} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={cn(
                    "group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer",
                    "bg-accent/[0.06] border border-accent/15",
                    "hover:bg-accent/[0.12] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/10 flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-accent-secondary/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  <span className="text-[10px] font-bold tracking-label uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 mb-3 inline-block">
                    {resource.type}
                  </span>

                  <h3 className="font-display text-base font-bold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{resource.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">{resource.items} items</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:gap-2 transition-all">
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      Download
                    </span>
                  </div>
                </motion.div>
              </SafeSlideUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
