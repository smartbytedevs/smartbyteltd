"use client"

import { useCallback } from "react"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { BlogFilterProvider } from "@/components/blog/BlogFilterContext"
import { BlogHero } from "@/components/blog/BlogHero"
import { FeaturedArticle } from "@/components/blog/FeaturedArticle"
import { BlogToolbar } from "@/components/blog/BlogToolbar"
import { PopularTopics } from "@/components/blog/PopularTopics"
import { LatestArticles } from "@/components/blog/LatestArticles"
import { FeaturedCategories } from "@/components/blog/FeaturedCategories"
import { NewsletterSection } from "@/components/blog/NewsletterSection"
import { ResourcesSection } from "@/components/blog/ResourcesSection"
import { BlogFAQ } from "@/components/blog/BlogFAQ"
import { BlogFinalCTA } from "@/components/blog/BlogFinalCTA"

export default function BlogPage() {
  const scrollToArticles = useCallback(() => {
    const el = document.getElementById("latest-articles")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <BlogFilterProvider>
      <Navbar />
      <main>
        <BlogHero onBrowse={scrollToArticles} />
        <FeaturedArticle />
        <section className="relative bg-background">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 space-y-8">
            <BlogToolbar />
            <PopularTopics />
          </div>
          <LatestArticles />
        </section>
        <FeaturedCategories />
        <NewsletterSection />
        <ResourcesSection />
        <BlogFAQ />
        <BlogFinalCTA />
      </main>
      <Footer />
      <FloatingContact />
    </BlogFilterProvider>
  )
}
