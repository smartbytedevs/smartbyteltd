import { siteUrl, projects, templates } from "@/lib/portfolio-data"
import { articles } from "@/data/blog"

export default function sitemap() {
  const now = new Date()

  const staticRoutes = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/templates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const workRoutes = projects.map((p) => ({
    url: `${siteUrl}/works/${p.slug}`,
    lastModified: p.year ? new Date(`${p.year}-01-01`) : now,
    changeFrequency: "yearly",
    priority: 0.7,
  }))

  const templateRoutes = templates.map((t) => ({
    url: `${siteUrl}/templates/${t.slug}`,
    lastModified: t.createdAt ? new Date(t.createdAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const blogRoutes = articles.map((a) => ({
    url: `${siteUrl}/blog/${a.slug}`,
    lastModified: a.publishDate ? new Date(a.publishDate) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...workRoutes, ...templateRoutes, ...blogRoutes]
}