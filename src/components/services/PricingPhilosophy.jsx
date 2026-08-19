"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { pricingTiers } from "@/data/services"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle, Clock, DollarSign, Users } from "lucide-react"
export function PricingPhilosophy() {

  return (
    <section id="request-quote" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[20%] -right-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.04), transparent 70%)",
          filter: "blur(100px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Pricing Philosophy"
          title="Every Project Is Unique"
          description="We don't believe in one-size-fits-all pricing. Your project's cost depends on its specific requirements, complexity, and goals."
          align="center"
          className="mb-12"
        />

        <SafeSlideUp delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative rounded-2xl p-6 md:p-8 border border-accent/15 bg-accent/[0.06]">
              <p className="text-sm text-muted leading-relaxed mb-6">
                Pricing depends on several factors that we discuss during your free consultation:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Features & Functionality", desc: "The more features, the more development time required." },
                  { icon: Clock, label: "Timeline", desc: "Faster delivery may require additional resources." },
                  { icon: DollarSign, label: "Integrations", desc: "Third-party APIs and services add to complexity." },
                  { icon: Users, label: "Complexity", desc: "Custom logic and advanced architectures take more effort." },
                ].map((factor) => (
                  <div key={factor.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <factor.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{factor.label}</p>
                      <p className="text-xs text-muted-foreground">{factor.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SafeSlideUp>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pricingTiers.map((tier, i) => (
            <SafeSlideUp key={tier.id} delay={0.15 + i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className={cn(
                  "relative rounded-2xl overflow-hidden transition-all duration-500",
                  "bg-accent/[0.06] border border-accent/15",
                  "hover:bg-accent/[0.12] hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5",
                  tier.id === "growth" && "md:scale-105 border-accent/20"
                )}
              >
                {tier.id === "growth" && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary" />
                )}
                <div className="p-6 md:p-8">
                  {tier.id === "growth" && (
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-accent to-accent-secondary text-white mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted mb-4">{tier.description}</p>

                  <div className="text-3xl font-bold text-foreground mb-1">{tier.range}</div>
                  <p className="text-xs text-muted-foreground mb-6">{tier.timeline}</p>

                  <div className="text-xs text-muted-foreground mb-4">
                    <span className="font-semibold text-foreground">Best for:</span> {tier.bestFor}
                  </div>

                  <div className="space-y-2 mb-6">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => (window.location.href = "/contact")}
                    className={cn(
                      "group flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                      tier.id === "growth"
                        ? "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                        : "border border-accent/15 text-muted-foreground hover:text-foreground hover:bg-accent/[0.12] hover:border-border/55"
                    )}
                  >
                    Request Custom Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </SafeSlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}
