"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { featuredProject } from "@/data/works"
import { siteUrl } from "@/lib/portfolio-data"
import { ArrowRight, CheckCircle, Clock, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap = {
  CheckCircle,
  Clock,
  BarChart3,
}

function BrowserMockup({ url }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-[18px] bg-[#0D1117] border border-white/[0.06]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0D1117]/80">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-6 rounded-md bg-white/[0.04] border border-white/[0.04] flex items-center px-3">
            <span className="text-[9px] text-white/20 truncate">{url}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0, 194, 168, 0.04), rgba(11, 16, 32, 0.6))",
          }}
        />

        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-3 w-24 rounded-full bg-white/[0.04]" />
            <div className="flex-1" />
            <div className="h-6 w-20 rounded-md border border-white/[0.04]" />
          </div>

          <div className="flex-1 grid grid-cols-5 gap-3">
            <div className="col-span-3 flex flex-col gap-3">
              <div className="h-6 w-3/4 rounded-full bg-white/[0.04]" />
              <div className="h-4 w-1/2 rounded-full bg-white/[0.03]" />
              <div className="flex-1 grid grid-cols-2 gap-2 mt-2">
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-2 flex flex-col gap-1.5">
                  <div className="h-2 w-12 rounded-full bg-white/[0.04]" />
                  <div className="h-5 w-full rounded-md bg-gradient-to-r from-accent/10 to-accent-secondary/10" />
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-2 flex flex-col gap-1.5">
                  <div className="h-2 w-12 rounded-full bg-white/[0.04]" />
                  <div className="h-5 w-full rounded-md bg-gradient-to-r from-accent-secondary/10 to-blue-400/10" />
                </div>
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.04] p-3 flex flex-col gap-2">
                <div className="h-2 w-16 rounded-full bg-white/[0.04]" />
                <div className="h-2 w-12 rounded-full bg-white/[0.03]" />
                <div className="h-2 w-14 rounded-full bg-white/[0.03]" />
                <div className="flex-1" />
                <div className="h-6 rounded-md bg-gradient-to-r from-accent/15 to-accent-secondary/15" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(11,16,32,0.5)] to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export function FeaturedCaseStudy() {
  const p = featuredProject

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[30%] -right-48 w-[600px] h-[600px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.05), transparent 70%)",
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
                  background: "linear-gradient(135deg, rgba(0, 194, 168, 0.12), rgba(56, 189, 248, 0.06))",
                  filter: "blur(8px)",
                }}
              />
              <div className="relative rounded-[28px] overflow-hidden border border-white/[0.06]">
                <div style={{ aspectRatio: "16/10" }}>
                  <BrowserMockup url={p.liveLink || `${siteUrl}/work/${p.slug}`} />
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
                      className="absolute inset-0 rounded-xl border border-white/[0.06] transition-colors duration-300 group-hover/metric:border-accent/15"
                      style={{
                        background: "rgba(15, 23, 42, 0.3)",
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
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  {p.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-medium rounded-full bg-white/[0.04] border border-white/[0.06] text-muted-foreground">
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
              <div className="relative rounded-2xl p-6 border border-white/[0.06] bg-white/[0.02]">
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
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-background shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Read Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="#portfolio-grid"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-white/[0.08] text-muted hover:text-foreground hover:border-white/20 transition-all"
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
