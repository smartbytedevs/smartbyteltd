"use client"

import { motion } from "motion/react"
import { SafeReveal } from "@/components/common/SafeMotion"
import { articles, authors, categories } from "@/data/blog"
import { cn } from "@/lib/utils"
import { Clock, Calendar, ArrowRight, Share2, BookOpen } from "lucide-react"

const heroGradients = {
  nextjs: "from-blue-500/30 to-indigo-600/30",
  design: "from-pink-500/30 to-rose-600/30",
  seo: "from-emerald-500/30 to-green-600/30",
  ai: "from-purple-500/30 to-violet-600/30",
  performance: "from-amber-500/30 to-orange-600/30",
  restaurant: "from-teal-500/30 to-cyan-600/30",
  cms: "from-sky-500/30 to-blue-600/30",
  accessibility: "from-indigo-500/30 to-purple-600/30",
  startup: "from-fuchsia-500/30 to-pink-600/30",
  security: "from-red-500/30 to-rose-600/30",
  mobile: "from-cyan-500/30 to-sky-600/30",
  ecommerce: "from-amber-500/30 to-yellow-600/30",
  branding: "from-violet-500/30 to-purple-600/30",
  api: "from-cyan-500/30 to-teal-600/30",
  conversion: "from-emerald-500/30 to-teal-600/30",
  default: "from-accent/20 to-accent-secondary/20",
}

export function FeaturedArticle() {
  const article = articles.find((a) => a.featured)
  if (!article) return null

  const author = authors.find((a) => a.id === article.author)
  const gradient = heroGradients[article.heroImage] || heroGradients.default

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SafeReveal className="relative rounded-3xl overflow-hidden border border-accent/15 bg-accent/[0.06] group hover:border-accent/30 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className={cn("relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden bg-gradient-to-br", gradient)}>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-white/20" />
              </div>
              <motion.div
                className="absolute inset-0 bg-black/20"
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10" />
            </div>

            <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                  Featured
                </span>
                {article.categories.slice(0, 2).map((catId) => {
                  const cat = categories.find((c) => c.id === catId)
                  return cat ? (
                    <span key={catId} className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-white/50 text-muted-foreground border border-border/30">
                      {cat.label}
                    </span>
                  ) : null
                })}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                {article.title}
              </h2>

              <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                {author && (
                  <span className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-[10px] font-bold text-white">
                      {author.avatar}
                    </span>
                    {author.name}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`/blog/${article.slug}`}
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-accent/15 text-muted-foreground hover:text-foreground hover:bg-accent/[0.12] hover:border-accent/30 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </SafeReveal>
      </div>
    </section>
  )
}
