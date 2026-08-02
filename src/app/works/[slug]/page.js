import { notFound } from "next/navigation"
import { ProjectCaseStudy } from "@/components/works/ProjectCaseStudy"
import { findProjectBySlug, projects, siteUrl } from "@/lib/portfolio-data"

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

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params
  const project = findProjectBySlug(slug)
  if (!project) notFound()
  return <ProjectCaseStudy project={project} />
}
