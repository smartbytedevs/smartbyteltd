"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { articles, authors, categories } from "@/data/blog"
import { ArrowLeft, BookOpen, Check } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
}

function formatDate(dateStr) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

function formatDateShort(dateStr) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

function SocialShareBar() {
  return (
    <div className="fixed left-6 top-48 z-30 hidden xl:flex flex-col gap-5 rounded-full border border-neutral-200/80 bg-white/90 py-5 px-3 items-center shadow-md backdrop-blur-md">
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 transition-colors hover:text-[#50FFAF]"
        aria-label="Share on LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 transition-colors hover:text-[#50FFAF]"
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 transition-colors hover:text-[#50FFAF]"
        aria-label="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  )
}

function RelatedCard({ article }) {
  const dateLabel = formatDateShort(article.publishDate)
  const catLabels = article.categories
    .map((c) => categories.find((cat) => cat.id === c)?.label)
    .filter(Boolean)
    .slice(0, 2)

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
            {dateLabel}
          </span>
          <div>
            <h3 className="mb-2 text-sm font-bold text-white transition-colors group-hover:text-[#50FFAF] line-clamp-2">
              {article.title}
            </h3>
            <span className="mb-2 flex items-center gap-1 text-xs text-white/80">
              Read article{" "}
              <span className="transition-transform group-hover:translate-x-1">
                ⟶
              </span>
            </span>
            {catLabels.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {catLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[10px] text-white backdrop-blur-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function BlogArticlePage() {
  const params = useParams()
  const slug = params?.slug

  const article = useMemo(() => articles.find((a) => a.slug === slug), [slug])

  const author = article ? authors.find((a) => a.id === article.author) : null

  const relatedArticles = useMemo(() => {
    if (!article) return []
    return articles
      .filter(
        (a) =>
          a.id !== article.id &&
          a.categories.some((c) => article.categories.includes(c))
      )
      .slice(0, 4)
  }, [article])

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center px-4">
            <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Article Not Found
            </h1>
            <p className="text-neutral-500 mb-8">
              The article you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[#50FFAF] px-6 py-3 text-sm font-semibold text-black"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const catLabels = article.categories
    .map((c) => categories.find((cat) => cat.id === c)?.label)
    .filter(Boolean)

  const dateLabel = formatDate(article.publishDate)

  return (
    <>
      <Navbar />
      <SocialShareBar />
      <main className="bg-white">
        {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 pt-28 pb-16 md:px-16 md:pt-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-12">
              {/* Left: Title & Meta */}
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700">
                    ⟶ {dateLabel}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-6xl"
                >
                  <span className="mr-3 inline-block h-3 w-3 rounded-full bg-purple-400 align-middle" />
                  {article.title}
                </motion.h1>

                {catLabels.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mb-6 flex flex-wrap gap-2"
                  >
                    {catLabels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-neutral-300 px-4 py-1 text-xs font-medium text-neutral-700"
                      >
                        {label}
                      </span>
                    ))}
                  </motion.div>
                )}

                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-base leading-relaxed text-neutral-700 md:text-lg"
                >
                  {article.excerpt}
                </motion.p>
              </div>

              {/* Right: Featured Image */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden rounded-[2.5rem] shadow-xl lg:col-span-6"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300">
                  <img
                    src={`/images/blog/${article.heroImage}.jpg`}
                    alt={article.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CONTENT + SIDEBAR
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 pb-20 md:px-16 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              {/* Left: Article Body */}
              <div className="lg:col-span-8">
                {/* Key Highlights Card */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.6 }}
                  className="my-8 rounded-3xl border border-neutral-200/60 bg-[#F7F7F7] p-8 md:p-10"
                >
                  <h3 className="mb-6 text-lg font-bold text-neutral-900">
                    Key Takeaways
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      "$5.3M in revenue in Q4 2025",
                      "Up 56% versus the same quarter last year",
                      "Up 37% sequentially",
                      "Full-year gross margins at 55%",
                      "OpEx down 29%",
                      "Inventory down 26%",
                      "Positive EBITDA & strong pipeline growth",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#50FFAF]" />
                        <span className="text-sm text-neutral-800">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 border-t border-neutral-200 pt-4 text-sm font-medium text-neutral-800">
                    That is not just a decent quarter. That is a business making
                    serious progress.
                  </p>
                </motion.div>

                {/* Article Excerpt (full body placeholder) */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="prose max-w-none"
                >
                  <p className="text-base leading-relaxed text-neutral-700">
                    {article.excerpt}
                  </p>
                  <div className="my-12 rounded-3xl border border-neutral-200/60 bg-[#F7F7F7] p-8 text-center">
                    <BookOpen className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
                    <h3 className="mb-2 text-lg font-bold text-neutral-900">
                      Full Article Coming Soon
                    </h3>
                    <p className="mx-auto max-w-md text-sm text-neutral-500">
                      The complete content for this article is being prepared.
                      Subscribe to our newsletter to be notified when it&apos;s
                      published.
                    </p>
                  </div>
                </motion.div>

                {/* Pull Quote */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="relative my-12 pl-6"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-[#50FFAF]" />
                  <p className="text-xl font-medium leading-relaxed text-neutral-900 md:text-2xl">
                    &ldquo;SmartByte didn&apos;t just build us a website — they
                    engineered a platform that fundamentally changed how we
                    operate. The ROI spoke for itself within the first
                    quarter.&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold text-neutral-500">
                    Mohammad Hasib – Founder, SmartByte
                  </p>
                </motion.div>

                {/* Author Bio */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-16 rounded-3xl bg-[#F7F7F7] p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#50FFAF] to-emerald-400 shadow-sm">
                      <div className="flex h-full w-full items-center justify-center text-xl font-bold text-black">
                        {author?.avatar || "SB"}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-neutral-900">
                        Written by: {author?.name || "SmartByte Team"}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {author?.role
                          ? `${author.role} at SmartByte Ltd. `
                          : "Team at SmartByte Ltd. "}
                        Expert in full-stack web engineering, building high-scale
                        web applications, and delivering modern digital products
                        that drive business growth.
                      </p>
                      <Link
                        href="/blog"
                        className="mt-4 inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-black hover:text-white"
                      >
                        Find more articles ⟶
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-10 flex flex-wrap gap-2"
                  >
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?topic=${tag.toLowerCase()}`}
                        className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-black hover:bg-black hover:text-white"
                      >
                        {tag}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Right: Sticky Related Sidebar */}
              <div className="sticky top-28 space-y-8 lg:col-span-4">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Related articles:
                </h2>
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((related) => (
                    <RelatedCard key={related.id} article={related} />
                  ))
                ) : (
                  <p className="text-sm text-neutral-500">
                    No related articles found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
