import { notFound } from "next/navigation"
import { TemplateDetails } from "@/components/templates/TemplateDetails"
import { findTemplateBySlug, siteUrl, templates } from "@/lib/portfolio-data"

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const template = findTemplateBySlug(slug)
  if (!template) return {}
  const seo = template.seo || {}
  const title = seo.title || `${template.title} — Website Template | SmartByte`
  const description = seo.description || template.shortDescription
  const canonical = `${siteUrl}/templates/${template.slug}`
  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  }
}

export default async function TemplateDetailPage({ params }) {
  const { slug } = await params
  const template = findTemplateBySlug(slug)
  if (!template) notFound()
  return <TemplateDetails template={template} />
}
