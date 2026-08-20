"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowRight, BookOpen } from "lucide-react"

function MetricCard({ value, label, delay }) {
  return (
    <SafeSlideUp delay={delay} className="rounded-xl p-3.5 bg-gray-50 border border-gray-200">
      <span className="font-display text-lg sm:text-xl font-bold text-[#8ba4ff] block leading-none">
        {value}
      </span>
      <span className="text-[10px] text-gray-400 mt-1 block leading-tight">
        {label}
      </span>
    </SafeSlideUp>
  )
}

function TechPill({ tech, isHovered }) {
  return (
    <span
      className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-colors duration-300 ${
        isHovered
          ? "bg-[#8ba4ff]/10 border-[#8ba4ff]/20 text-gray-700"
          : "bg-gray-100 border-gray-200 text-gray-500"
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
      <SafeSlideUp delay={containerDelay}>
        <span className="text-[11px] font-semibold tracking-label uppercase text-[#8ba4ff] mb-3 block">
          {project.industry || project.category}
        </span>
      </SafeSlideUp>

      <SafeSlideUp delay={containerDelay + stagger}>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
          {project.title}
        </h3>
      </SafeSlideUp>

      <SafeSlideUp delay={containerDelay + stagger * 2}>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>
      </SafeSlideUp>

      <SafeSlideUp delay={containerDelay + stagger * 3}>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(project.techStack || []).map((tech) => (
            <TechPill key={tech} tech={tech} isHovered={isHovered} />
          ))}
        </div>
      </SafeSlideUp>

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

      <SafeSlideUp delay={containerDelay + stagger * 5}>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={liveHref}
            {...(hasLiveLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-xs tracking-nav bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300"
          >
            {hasLiveLink ? "View Live" : "View Project"}
            <motion.span
              className="inline-flex"
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </a>

          <Link
            href={caseStudyHref}
            className="group/btn inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 font-semibold text-xs tracking-nav text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-300"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Case Study
          </Link>
        </div>
      </SafeSlideUp>
    </div>
  )
}
