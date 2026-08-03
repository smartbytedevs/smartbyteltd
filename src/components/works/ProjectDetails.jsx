"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowRight, BookOpen } from "lucide-react"

function MetricCard({ value, label, delay }) {
  return (
    <SafeSlideUp
      delay={delay}
      className="relative rounded-xl p-3.5 overflow-hidden group/metric"
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
        <span className="font-display text-lg sm:text-xl font-bold text-accent block leading-none">
          {value}
        </span>
        <span className="text-[10px] text-muted/60 mt-1 block leading-tight">
          {label}
        </span>
      </div>
    </SafeSlideUp>
  )
}

function TechPill({ tech, isHovered }) {
  return (
    <span
      className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-colors duration-300 ${
        isHovered
          ? "bg-accent/10 border-accent/20 text-accent"
          : "bg-white/[0.04] border-white/[0.06] text-muted/60"
      }`}
    >
      {tech}
    </span>
  )
}

export function ProjectDetails({ project, index, isHovered }) {
  const isLeft = index % 2 === 0

  const containerDelay = isLeft ? 0.15 : 0
  const stagger = 0.08

  const caseStudyHref = `/works/${project.slug}`
  const liveHref = project.liveLink || caseStudyHref
  const hasLiveLink = Boolean(project.liveLink)
  const metrics = Array.isArray(project.metrics) ? project.metrics.slice(0, 3) : []

  return (
    <div className="flex flex-col justify-center h-full">
      {/* Category */}
      <SafeSlideUp delay={containerDelay}>
        <span className="text-[11px] font-semibold tracking-label uppercase text-accent mb-3 block">
          {project.industry || project.category}
        </span>
      </SafeSlideUp>

      {/* Title */}
      <SafeSlideUp delay={containerDelay + stagger}>
        <h3 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3 transition-colors duration-300 ${
          isHovered ? "text-accent" : ""
        }`}>
          {project.title}
        </h3>
      </SafeSlideUp>

      {/* Description */}
      <SafeSlideUp delay={containerDelay + stagger * 2}>
        <p className="text-sm sm:text-base text-muted leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>
      </SafeSlideUp>

      {/* Tech Stack */}
      <SafeSlideUp delay={containerDelay + stagger * 3}>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(project.techStack || []).map((tech) => (
            <TechPill key={tech} tech={tech} isHovered={isHovered} />
          ))}
        </div>
      </SafeSlideUp>

      {/* Result Metrics */}
      <SafeSlideUp delay={containerDelay + stagger * 4}>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              value={`${metric.value}${metric.suffix || ""}`}
              label={metric.label}
              delay={containerDelay + stagger * 4 + i * 0.06}
            />
          ))}
        </div>
      </SafeSlideUp>

      {/* Action Buttons */}
      <SafeSlideUp delay={containerDelay + stagger * 5}>
        <div className="flex flex-wrap items-center gap-3">
          {/* Live link (falls back to case study so it is never empty) */}
          <a
            href={liveHref}
            {...(hasLiveLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 font-semibold text-xs tracking-nav transition-all duration-500"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500" />
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700"
              style={{
                boxShadow: "0 0 20px rgba(0, 194, 168, 0.2), 0 0 40px rgba(56, 189, 248, 0.1)",
              }}
            />
            <span className="relative z-10 text-background flex items-center gap-1.5">
              {hasLiveLink ? "View Live" : "View Project"}
              <motion.span
                className="inline-flex"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </span>
          </a>

          {/* Secondary */}
          <Link
            href={caseStudyHref}
            className="group/btn inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.08] font-semibold text-xs tracking-nav text-muted hover:text-foreground hover:border-white/20 transition-all duration-500"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Case Study
          </Link>
        </div>
      </SafeSlideUp>
    </div>
  )
}
