"use client"

import { motion } from "motion/react"
import {
  Zap,
  Cpu,
  Shield,
  TrendingUp,
  Brain,
  Smartphone,
} from "lucide-react"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { SectionHeading } from "@/components/ui/SectionHeading"

const features = [
  {
    id: "fast",
    title: "Fast Delivery",
    description: "Agile methodology ensures rapid delivery without compromising quality.",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    gradient: "rgba(59,130,246,0.1)",
    size: "sm",
  },
  {
    id: "tech",
    title: "Modern Tech",
    description: "Cutting-edge technology stack for future-proof solutions.",
    icon: Cpu,
    color: "from-purple-500 to-pink-500",
    gradient: "rgba(139,92,246,0.1)",
    size: "sm",
  },
  {
    id: "secure",
    title: "Secure",
    description: "Enterprise-grade security protecting your digital assets.",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    gradient: "rgba(34,197,94,0.1)",
    size: "sm",
  },
  {
    id: "scalable",
    title: "Scalability",
    description: "Architecture designed to grow seamlessly with your business from day one.",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    gradient: "rgba(249,115,22,0.1)",
    size: "md",
  },
  {
    id: "ai",
    title: "AI Powered",
    description: "Intelligent automation and data-driven insights powered by advanced AI and machine learning.",
    icon: Brain,
    color: "from-violet-500 to-purple-500",
    gradient: "rgba(139,92,246,0.1)",
    size: "lg",
  },
  {
    id: "responsive",
    title: "Responsive",
    description: "Flawless experiences across every device with pixel-perfect responsive design.",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-500",
    gradient: "rgba(6,182,212,0.1)",
    size: "md",
  },
]

function FeatureCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6 md:p-8 transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/5"
      style={{
        gridColumn:
          feature.size === "lg"
            ? "span 2"
            : feature.size === "md"
            ? "span 2"
            : "span 1",
        gridRow:
          feature.size === "lg" ? "span 2" : "span 1",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at 50% 0%, ${feature.gradient}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-4`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">
          {feature.title}
        </h3>
        <p className="text-zinc-400 leading-relaxed">{feature.description}</p>

        <div className="mt-6 flex items-center gap-2 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Learn more</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      <div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${feature.gradient}, transparent)`,
        }}
      />
    </motion.div>
  )
}

export function Featured() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why Choose Us"
          title="Built for Excellence"
          description="We combine cutting-edge technology with elegant design to deliver digital products that stand out."
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
