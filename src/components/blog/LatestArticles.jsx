"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useBlogFilters } from "./BlogFilterContext"
import { articles, authors, categories } from "@/data/blog"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react"

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

const sortFunctions = {
  newest: (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
  oldest: (a, b) => new Date(a.publishDate) - new Date(b.publishDate),
  popular: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
}

export function LatestArticles() {
  const { filters } = useBlogFilters()

  const filtered = useMemo(() => {
    let result = [...articles]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (filters.category !== "all") {
      result = result.filter((a) => a.categories.includes(filters.category))
    }

    if (filters.topic) {
      result = result.filter((a) =>
        a.tags.some((t) => t.toLowerCase() === filters.topic.toLowerCase())
      )
    }

    const sortFn = sortFunctions[filters.sort] || sortFunctions.newest
    result.sort(sortFn)

    return result
  }, [filters])

  return (
    <section id="latest-articles" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[20%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted">
            Showing{' '}
            <motion.span
              key={filtered.length}
              initial={{ opacity: 0, y: -8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-foreground font-semibold tabular-nums"
            >
              {filtered.length}
            </motion.span>{' '}
            article{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((article, i) => {
              const author = authors.find((a) => a.id === article.author)
              const gradient = heroGradients[article.heroImage] || heroGradients.default
              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden transition-all duration-500",
                    "bg-accent/[0.06] border border-accent/15",
                    "hover:bg-accent/[0.12] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
                    "hover:-translate-y-1"
                  )}
                >
                  <div className={cn("relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br", gradient)}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white/20" />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20" />

                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                      {article.categories.slice(0, 1).map((catId) => {
                        const cat = categories.find((c) => c.id === catId)
                        return cat ? (
                          <span key={catId} className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-label uppercase bg-background/60 backdrop-blur-sm border border-border/35 text-foreground">
                            {cat.label}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.publishDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTime}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      {author && (
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-[8px] font-bold text-white">
                            {author.avatar}
                          </span>
                          {author.name}
                        </span>
                      )}
                      <a
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-accent/[0.07] border border-accent/15 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">No articles found</h3>
            <p className="text-sm text-muted mb-6">Try different search terms or filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
