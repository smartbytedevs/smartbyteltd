"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { articles, categories } from "@/data/blog"

const filterCategories = [
  "All Articles",
  "Full-Stack Dev",
  "UI/UX Design",
  "AI Integrations",
  "E-Commerce",
  "Web Performance",
]

const categoryMap = {
  "All Articles": null,
  "Full-Stack Dev": "web-dev",
  "UI/UX Design": "design",
  "AI Integrations": "ai",
  "E-Commerce": "web-dev",
  "Web Performance": "performance",
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
}

function formatDate(dateStr) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

function ArticleCard({ article, index }) {
  const catLabels = article.categories
    .map((c) => categories.find((cat) => cat.id === c)?.label)
    .filter(Boolean)
    .slice(0, 2)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      <Link href={`/blog/${article.slug}`} className="group block">
        <motion.article
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-900"
        >
          {/* Background gradient (placeholder for image) */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            {/* Top: Date */}
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              {formatDate(article.publishDate)}
            </span>

            {/* Bottom */}
            <div>
              <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-[#50FFAF]">
                {article.title}
              </h3>
              <span className="mb-4 flex items-center gap-2 text-sm text-white/90">
                Read article{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </span>
              {catLabels.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {catLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}

function FeaturedCard({ article }) {
  if (!article) return null
  const catLabels = article.categories
    .map((c) => categories.find((cat) => cat.id === c)?.label)
    .filter(Boolean)
    .slice(0, 4)

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <motion.div
        {...fadeUp}
        className="relative my-12 flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[2.5rem] p-8 md:p-12"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-wider text-white/70">
            {formatDate(article.publishDate)}
          </span>
          <h2 className="mb-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white transition-colors group-hover:text-[#50FFAF] md:text-5xl">
            {article.title}
          </h2>
          <span className="mb-4 flex items-center gap-2 text-sm text-white/90">
            Read article{" "}
            <span className="transition-transform group-hover:translate-x-1">
              ⟶
            </span>
          </span>
          {catLabels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {catLabels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All Articles")

  const filteredArticles = articles.filter((a) => {
    if (activeFilter === "All Articles") return true
    const catId = categoryMap[activeFilter]
    return catId ? a.categories.includes(catId) : true
  })

  const featured = articles.find((a) => a.featured)
  const nonFeatured = filteredArticles.filter((a) => a !== featured)

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F7F7F7] px-6 pt-28 pb-12 md:px-16 md:pt-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
              {/* Left */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700">
                    ⟶ Blog
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
                  className="mt-4 text-6xl font-extrabold leading-[0.95] tracking-tight text-neutral-900 md:text-8xl"
                >
                  What&apos;s New
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start"
                >
                  <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-[#50FFAF] px-5 py-2 text-sm font-semibold text-black">
                    Proudly from Chittagong
                  </span>
                  <p className="max-w-lg text-base leading-relaxed text-neutral-800 md:text-lg">
                    Our blog is our space to explore the trends and strategies
                    that shape modern web development and AI integration. Here,
                    you&apos;ll find insights from our team of digital experts,
                    all written and designed to help businesses understand how
                    the tech landscape continues to evolve.
                  </p>
                </motion.div>
              </div>

              {/* Right */}
              <div className="relative lg:col-span-5">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute -top-4 left-6 z-10 rounded-full bg-[#50FFAF] px-5 py-2 text-sm font-semibold text-black shadow-md"
                >
                  Senior specialists
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden rounded-3xl shadow-lg"
                >
                  <div className="aspect-4/3 bg-gradient-to-br from-neutral-200 to-neutral-300">
                    <img
                      src="/images/blog-hero.jpg"
                      alt="SmartByte blog team"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 flex justify-end gap-4 text-sm text-neutral-500"
                >
                  <a
                    href="mailto:hello@smartbyte.com"
                    className="underline underline-offset-4 transition-colors duration-300 hover:text-[#50FFAF]"
                  >
                    hello@smartbyte.com
                  </a>
                  <span className="text-neutral-300">|</span>
                  <a
                    href="tel:+8801234567890"
                    className="underline underline-offset-4 transition-colors duration-300 hover:text-[#50FFAF]"
                  >
                    +880 1234 567890
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CATEGORY FILTER PILLS
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="my-8 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`shrink-0 rounded-full border px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === cat
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 bg-white text-neutral-700 hover:border-black hover:bg-black hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            ARTICLE GRID
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 pb-8 md:px-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {nonFeatured.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FEATURED BANNER
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-7xl">
            <FeaturedCard article={featured} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            BOTTOM CATEGORY QUICK-NAV
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-7xl text-center">
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="mb-8 text-2xl font-bold text-neutral-900 md:text-3xl"
            >
              View articles by service
            </motion.h2>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-16 flex max-w-2xl flex-wrap justify-center gap-3"
            >
              {["Full-Stack Dev", "UI/UX Design", "AI Solutions", "E-Commerce", "API Engineering"].map(
                (svc) => (
                  <Link
                    key={svc}
                    href="/services"
                    className="rounded-full border border-neutral-300 px-6 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-900 hover:text-white"
                  >
                    {svc}
                  </Link>
                )
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
