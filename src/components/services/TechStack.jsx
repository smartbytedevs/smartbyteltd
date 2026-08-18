"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { techStack } from "@/data/services"
import { cn } from "@/lib/utils"
import { Code2, Database, Cloud, CreditCard, Shield, BarChart3 } from "lucide-react"

const categoryIcons = {
  frontend: Code2,
  backend: Shield,
  database: Database,
  cloud: Cloud,
  payments: CreditCard,
  auth: Shield,
  analytics: BarChart3,
}

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  cloud: "Cloud & Hosting",
  payments: "Payments",
  auth: "Authentication",
  analytics: "Analytics",
}

export function TechStack() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Technology Stack"
          title="Built With Modern Technology"
          description="We use cutting-edge tools and frameworks to build fast, scalable, and maintainable digital products."
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(techStack).map(([category, items], catIdx) => {
            const CategoryIcon = categoryIcons[category]
            return (
              <SafeSlideUp key={category} delay={catIdx * 0.08}>
                <div className="relative rounded-2xl border border-accent/15 bg-accent/[0.06] p-6 h-full hover:border-accent/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/10 flex items-center justify-center">
                      {CategoryIcon && <CategoryIcon className="w-5 h-5 text-accent" />}
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">{categoryLabels[category]}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {items.map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        whileHover={{ y: -2, scale: 1.02 }}
                        className={cn(
                          "rounded-xl p-3 text-center border transition-all duration-300 cursor-default",
                          "bg-accent/[0.06] border-accent/15",
                          "hover:bg-white/50 hover:border-accent/30 hover:shadow-md"
                        )}
                      >
                        <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br mx-auto mb-2 flex items-center justify-center", tech.color)}>
                          <span className="text-[8px] font-bold text-foreground/80">{tech.name.substring(0, 3)}</span>
                        </div>
                        <p className="text-[10px] font-medium text-muted-foreground leading-tight">{tech.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SafeSlideUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
