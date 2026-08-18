"use client"

import { motion } from "motion/react"
import {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Cloud,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { SectionHeading } from "@/components/ui/SectionHeading"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance web applications built with modern frameworks and best-in-class engineering practices.",
    gradient: "from-accent to-accent-soft",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences that delight users and drive engagement.",
    gradient: "from-accent-secondary to-pink-500",
  },
  {
    icon: Brain,
    title: "AI & Automation",
    description: "Intelligent automation solutions powered by machine learning and advanced algorithms.",
    gradient: "from-accent-secondary to-purple-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces crafted through rigorous user research and design thinking.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable, secure cloud architecture designed for reliability and performance.",
    gradient: "from-accent-soft to-accent",
  },
  {
    icon: Sparkles,
    title: "Brand Strategy",
    description: "Comprehensive branding that positions your business for success in the digital landscape.",
    gradient: "from-orange-500 to-red-500",
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Services"
          description="We offer end-to-end digital services to help businesses thrive in the modern landscape."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-border/25 bg-card p-8 transition-all duration-500 hover:border-border/40"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(600px at 50% 0%, rgba(0,240,255,0.08), transparent)",
                  }}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-10 mb-6`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:gradient-text transition-all">
                    {service.title}
                  </h3>

                  <p className="text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted group-hover:text-accent transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 blur-3xl"
                  style={{
                    background: "radial-gradient(circle, rgba(0,240,255,0.4), transparent)",
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
