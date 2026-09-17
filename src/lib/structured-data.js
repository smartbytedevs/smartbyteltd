import { siteUrl } from "./portfolio-data"
import { authors } from "@/data/blog"

export { siteUrl }

export const siteName = "SmartByte"
export const siteBrand = "SmartByte Digital Agency"

export const socialProfiles = [
  "https://www.facebook.com/share/1Hygnf3e6c/",
  "https://www.instagram.com/smartbyte.ltd/?utm_source=ig_web_button_share_sheet",
]

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    legalName: "SmartByte Ltd.",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
    description:
      "SmartByte is a premier full-stack software and web development agency in Bangladesh. We build ultra-fast Next.js applications, custom e-commerce platforms, and scalable web solutions for global brands.",
    email: "hello@smartbyteltd.com",
    telephone: "+8801997858226",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chattogram",
      addressRegion: "Chittagong",
      addressCountry: "BD",
    },
    areaServed: ["BD", "global"],
    sameAs: socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+8801997858226",
      email: "hello@smartbyteltd.com",
      availableLanguage: ["en", "bn"],
    },
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description:
      "Software & web development agency in Bangladesh building high-performance Next.js applications, custom e-commerce, and modern SaaS products.",
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
  }
}

export function blogPostingSchema(article) {
  const authorRecord = authors.find((a) => a.id === article.author)
  const url = `${siteUrl}/blog/${article.slug}`
  const image = article.heroImage
    ? `${siteUrl}/images/blog/${article.heroImage}.jpg`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: article.title,
    description: article.meta?.description || article.excerpt,
    image,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      "@type": "Person",
      name: authorRecord?.name || "SmartByte Team",
      jobTitle: authorRecord?.role,
      url: `${siteUrl}/blog`,
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    keywords: Array.isArray(article.tags) ? article.tags.join(", ") : undefined,
    inLanguage: "en",
  }
}

export function creativeWorkSchema(project) {
  const url = `${siteUrl}/works/${project.slug}`
  const image = project.coverImage || project.thumbnail
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    name: project.title,
    headline: project.title,
    description: project.summary || project.description,
    url,
    dateCreated: project.year,
    creator: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
    keywords: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : undefined,
  }
  if (image) schema.image = `${siteUrl}${image}`
  if (project.liveLink) schema.workExample = { "@type": "WebApplication", url: project.liveLink }
  return schema
}

export function softwareApplicationSchema(template) {
  const url = `${siteUrl}/templates/${template.slug}`
  const image = template.thumbnail
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": url,
    name: template.title,
    description: template.shortDescription || template.fullDescription || "",
    url,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#organization` },
    offers: {
      "@type": "Offer",
      price: Number(template.price) || 0,
      priceCurrency: "USD",
      url,
    },
    keywords: Array.isArray(template.technologies)
      ? template.technologies.join(", ")
      : undefined,
  }
  if (image) schema.image = `${siteUrl}${image}`
  return schema
}

export function jsonLd(obj) {
  return {
    __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
  }
}