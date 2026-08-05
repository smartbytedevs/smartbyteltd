"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { featuredProject } from "@/data/works"
import { ArrowRight, CheckCircle, Clock, BarChart3 } from "lucide-react"

const iconMap = {
  CheckCircle,
  Clock,
  BarChart3,
}

export function FeaturedCaseStudy() {
  const p = featuredProject

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[30%] -right-48 w-[600px] h-[600px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(14, 116, 144, 0.05), transparent 70%)",
          filter: "blur(120px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SafeSlideUp>
          <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-4 block text-center">
            Featured Case Study
          </span>
        </SafeSlideUp>

        <SectionHeading
          title={`${p.title} — ${p.industry}`}
          description={p.summary}
          align="center"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          <SafeReveal className="sticky top-24">
            <div className="relative">
              <div
                className="absolute -inset-[2px] rounded-[28px] opacity-40 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(15, 118, 110, 0.12), rgba(14, 116, 144, 0.06))",
                  filter: "blur(8px)",
                }}
              />
              <div className="relative rounded-[28px] overflow-hidden border border-border/30">
                <div className="relative" style={{ aspectRatio: "16/10" }}>
                  {p.thumbnail || p.coverImage ? (
                    <Image
                      src={p.thumbnail || p.coverImage}
                      alt={`${p.title} project screenshot`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1C1917] flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-accent/70">
                        {p.title?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SafeReveal>

          <div className="space-y-10">
            <SafeReveal delay={0.1}>
              <div>
                <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Challenge</h4>
                <p className="text-base sm:text-lg text-foreground leading-relaxed">{p.challenge}</p>
              </div>
            </SafeReveal>

            <SafeReveal delay={0.15}>
              <div>
                <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Solution</h4>
                <p className="text-base sm:text-lg text-foreground leading-relaxed">{p.solution}</p>
              </div>
            </SafeReveal>

            <SafeReveal delay={0.2}>
              <div>
                <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Result</h4>
                <p className="text-base sm:text-lg text-foreground leading-relaxed mb-6">{p.result}</p>
              </div>
            </SafeReveal>

            <SafeReveal delay={0.25}>
              <div className="grid grid-cols-2 gap-4">
                {p.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="relative rounded-xl p-4 overflow-hidden group/metric"
                  >
                    <div
                      className="absolute inset-0 rounded-xl border border-border/30 transition-colors duration-300 group-hover/metric:border-accent/15"
                      style={{
                        background: "rgba(255, 253, 246, 0.7)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                      }}
                    />
                    <div className="relative z-10">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-accent block leading-none">
                        {metric.value}{metric.suffix}
                      </span>
                      <span className="text-xs text-muted mt-1 block leading-tight">
                        {metric.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SafeReveal>

            <SafeReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/30">
                <div className="flex flex-wrap gap-2">
                  {p.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-medium rounded-full bg-white/45 border border-border/30 text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                  <Clock className="w-3.5 h-3.5" /> {p.timeline}
                </span>
              </div>
            </SafeReveal>

            <SafeReveal delay={0.35}>
              <div className="relative rounded-2xl p-6 border border-border/30 bg-white/30">
                <svg className="w-6 h-6 text-accent/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-sm sm:text-base text-muted italic leading-relaxed mb-4">
                  &ldquo;{p.testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{p.testimonial.role}</p>
                </div>
              </div>
            </SafeReveal>

            <SafeReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/works/${p.slug}`}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Read Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="#portfolio-grid"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-border/35 text-muted hover:text-foreground hover:border-border/55 transition-all"
                >
                  View All Projects
                </a>
              </div>
            </SafeReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
