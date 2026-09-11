import { notFound } from "next/navigation"
import { TemplateDetails } from "@/components/templates/TemplateDetails"
import { findTemplateBySlug, siteUrl, templates } from "@/lib/portfolio-data"
import { softwareApplicationSchema, jsonLd } from "@/lib/structured-data"

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
  const keywords =
    seo.keywords ||
    [
      ...(template.technologies || []),
      "Website Template",
      "Web Development Bangladesh",
    ]
  const ogImage = seo.ogImage || template.thumbnail
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "SmartByte",
      url: canonical,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: template.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function TemplateDetailPage({ params }) {
  const { slug } = await params
  const template = findTemplateBySlug(slug)
  if (!template) notFound()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(softwareApplicationSchema(template))}
      />
      <TemplateDetails template={template} />
    </>
  )
}