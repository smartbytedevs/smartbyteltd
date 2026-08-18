"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { projects } from "@/data/works"
import { cn } from "@/lib/utils"
import { Star, Quote } from "lucide-react"

export function ClientTestimonials() {
  const testimonials = projects.filter((p) => p.testimonial).slice(0, 6)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[20%] -right-48 w-[600px] h-[600px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.03), transparent 70%)",
          filter: "blur(120px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Real feedback from real projects — every testimonial is tied to a specific deliverable."
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((project, i) => (
            <SafeSlideUp key={project.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-2xl p-6 h-full border border-accent/15 bg-accent/[0.06] hover:bg-accent/[0.12] hover:border-accent/30 transition-all duration-300 group"
              >
                <Quote className="w-6 h-6 text-accent/20 mb-4" />

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={cn(
                        "w-3.5 h-3.5",
                        s < Math.round(project.rating)
                          ? "fill-amber-500 text-amber-600"
                          : "text-foreground/15"
                      )}
                    />
                  ))}
                </div>

                <blockquote className="text-sm text-muted leading-relaxed mb-6">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-auto pt-4 border-t border-accent/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {project.testimonial.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{project.testimonial.author}</p>
                      <p className="text-xs text-muted-foreground truncate">{project.testimonial.role}</p>
                    </div>
                    <span className="ml-auto text-[10px] font-medium px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0">
                      {project.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            </SafeSlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}


