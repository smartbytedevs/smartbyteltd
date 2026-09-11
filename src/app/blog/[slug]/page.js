import { notFound } from "next/navigation"
import { articles, authors, categories } from "@/data/blog"
import { siteUrl } from "@/lib/portfolio-data"
import { blogPostingSchema, jsonLd } from "@/lib/structured-data"
import { BlogArticleView } from "./BlogArticleView"

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

function categoryLabelsFor(ids) {
  return (ids || [])
    .map((c) => categories.find((cat) => cat.id === c)?.label)
    .filter(Boolean)
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}

  const meta = article.meta || {}
  const title = meta.title || article.title
  const description = meta.description || article.excerpt
  const canonical = `${siteUrl}/blog/${article.slug}`
  const author = authors.find((a) => a.id === article.author)

  return {
    title: { absolute: `${title} | SmartByte` },
    description,
    keywords: [...(article.tags || []), ...categoryLabelsFor(article.categories)],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "en_US",
      siteName: "SmartByte",
      url: canonical,
      publishedTime: article.publishDate,
      authors: author ? [author.name] : undefined,
      images: article.heroImage
        ? [
            {
              url: `/images/blog/${article.heroImage}.jpg`,
              width: 1200,
              height: 900,
              alt: article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.heroImage ? [`/images/blog/${article.heroImage}.jpg`] : undefined,
    },
  }
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const author = authors.find((a) => a.id === article.author) || null
  const catLabels = categoryLabelsFor(article.categories)
  const dateLabel = formatDate(article.publishDate)

  const related = articles
    .filter(
      (a) =>
        a.id !== article.id &&
        a.categories.some((c) => article.categories.includes(c))
    )
    .slice(0, 4)
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      dateLabel: formatDateShort(a.publishDate),
      catLabels: categoryLabelsFor(a.categories).slice(0, 2),
    }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(blogPostingSchema(article))}
      />
      <BlogArticleView
        article={article}
        author={author}
        catLabels={catLabels}
        dateLabel={dateLabel}
        related={related}
      />
    </>
  )
}