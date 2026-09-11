import { notFound } from "next/navigation"
import { ProjectCaseStudy } from "@/components/works/ProjectCaseStudy"
import { findProjectBySlug, projects, siteUrl } from "@/lib/portfolio-data"
import { creativeWorkSchema, jsonLd } from "@/lib/structured-data"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = findProjectBySlug(slug)
  if (!project) return {}
  const seo = project.seo || {}
  const title = seo.title || `${project.title} — Case Study | SmartByte`
  const description = seo.description || project.summary
  const canonical = `${siteUrl}/works/${project.slug}`
  const keywords =
    seo.keywords || [
      ...(project.technologies || []),
      ...(project.servicesProvided || []),
      "Web Development Bangladesh",
      "Case Study",
    ]
  const ogImage = seo.ogImage || project.coverImage || project.thumbnail
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
        ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }]
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

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params
  const project = findProjectBySlug(slug)
  if (!project) notFound()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(creativeWorkSchema(project))}
      />
      <ProjectCaseStudy project={project} />
    </>
  )
}