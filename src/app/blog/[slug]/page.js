"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { articles, authors, categories } from "@/data/blog"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { Calendar, Clock, ArrowLeft, BookOpen, User } from "lucide-react"
import { cn } from "@/lib/utils"

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
  api: "from-slate-500/30 to-gray-600/30",
  conversion: "from-emerald-500/30 to-teal-600/30",
  default: "from-accent/20 to-accent-secondary/20",
}

export default function BlogArticlePage() {
  const params = useParams()
  const slug = params?.slug

  const article = useMemo(() => articles.find((a) => a.slug === slug), [slug])

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">Article Not Found</h1>
            <p className="text-muted mb-8">The article you are looking for does not exist or has been removed.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white font-medium text-sm hover:scale-[1.02] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
        <FloatingContact />
      </>
    )
  }

  const author = authors.find((a) => a.id === article.author)
  const gradient = heroGradients[article.heroImage] || heroGradients.default

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.categories.some((c) => article.categories.includes(c)))
    .slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <article>
          <div className={cn("relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden bg-gradient-to-br", gradient)}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-white/10" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-32" />
          </div>

          <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
            <SafeSlideUp>
              <div className="rounded-3xl border border-border/30 bg-background p-6 sm:p-8 md:p-10 shadow-2xl">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.categories.map((catId) => {
                    const cat = categories.find((c) => c.id === catId)
                    return cat ? (
                      <Link
                        key={catId}
                        href={`/blog?category=${catId}`}
                        className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ) : null
                  })}
                  {article.featured && (
                    <span className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border/30 mb-6">
                  {author && (
                    <span className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-[10px] font-bold text-white">
                        {author.avatar}
                      </span>
                      <div>
                        <span className="text-foreground font-medium block text-xs">{author.name}</span>
                        <span className="text-muted-foreground/60 text-[10px]">{author.role}</span>
                      </div>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.publishDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg text-muted leading-relaxed mb-8">
                    {article.excerpt}
                  </p>
                  <div className="rounded-2xl border border-border/30 bg-white/30 p-6 sm:p-8 text-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Full Article Coming Soon</h3>
                    <p className="text-sm text-muted max-w-md mx-auto">
                      The complete content for this article is being prepared. Subscribe to our newsletter to be notified when it&apos;s published.
                    </p>
                  </div>
                </div>

                {article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border/30">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?topic=${tag.toLowerCase()}`}
                          className="text-xs font-medium px-3 py-1.5 rounded-full border border-border/30 bg-white/40 text-muted hover:text-foreground hover:border-accent/30 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SafeSlideUp>

            {relatedArticles.length > 0 && (
              <section className="mt-16 mb-24">
                <h2 className="font-display text-2xl font-bold text-foreground mb-8">Related Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {relatedArticles.map((related) => {
                    const relatedAuthor = authors.find((a) => a.id === related.author)
                    return (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group p-5 rounded-2xl border border-border/30 bg-white/30 hover:border-accent/30 hover:bg-white/55 transition-all duration-300"
                      >
                        <h3 className="font-display text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
                          {related.title}
                        </h3>
                        <p className="text-xs text-muted line-clamp-2 mb-3">{related.excerpt}</p>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                          {relatedAuthor && <span className="flex items-center gap-1"><User className="w-3 h-3" />{relatedAuthor.name}</span>}
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{related.readingTime}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}
          </div>
        </article>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}

