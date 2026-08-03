"use client"

import { motion } from "motion/react"
import { ExternalLink, Eye } from "lucide-react"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Button } from "@/components/ui/Button"

const templates = [
  {
    title: "SaaS Dashboard",
    category: "Web App",
    gradient: "from-blue-600 via-purple-600 to-pink-600",
    tags: ["Next.js", "Tailwind", "Chart.js"],
  },
  {
    title: "E-Commerce",
    category: "Web App",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    title: "AI Platform",
    category: "AI/ML",
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    tags: ["Python", "TensorFlow", "FastAPI"],
  },
  {
    title: "Portfolio Pro",
    category: "Design",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    tags: ["Next.js", "Framer Motion", "Three.js"],
  },
  {
    title: "Mobile App",
    category: "Mobile",
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    tags: ["React Native", "Firebase", "RevenueCat"],
  },
  {
    title: "Marketing Site",
    category: "Web App",
    gradient: "from-rose-600 via-pink-600 to-purple-600",
    tags: ["Next.js", "GSAP", "Sanity"],
  },
]

export function Templates() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Templates"
          title="Pre-Built Solutions"
          description="Start faster with our premium templates and customize them to your needs."
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-border/25 bg-card"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${template.gradient} opacity-50 group-hover:opacity-70 transition-all duration-500`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-white text-sm">
                          <Eye className="w-4 h-4" />
                          Preview
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-white text-sm">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                    {template.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-2 mb-3">
                    {template.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-white/45 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="secondary" className="gap-2">
            View All Templates
            <ExternalLink className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
