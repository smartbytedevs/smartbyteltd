import templatesJson from "@/data/templates.json"
import projectsJson from "@/data/projects.json"

export const siteUrl = "https://smartbyte.agency"

// ── Generic helpers ──

export function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getRelativeTimeString(dateStr) {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return ""
  const diff = Date.now() - date.getTime()
  const days = Math.floor(diff / 86400000)
  if (days <= 0) return "Today"
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? "" : "s"} ago`
}

// ── Templates ──

const POPULAR_BADGES = ["BEST SELLER", "POPULAR", "TRENDING"]
const NEWEST_COUNT = 5

export function normalizeTemplate(t) {
  return {
    ...t,
    name: t.title,
    description: t.shortDescription || t.fullDescription || "",
    techStack: Array.isArray(t.technologies) ? t.technologies : [],
    delivery: t.deliveryTime,
    preview: t.thumbnail || t.category,
    popular: typeof t.popular === "boolean" ? t.popular : POPULAR_BADGES.includes(t.badge),
    features: Array.isArray(t.features) ? t.features : [],
  }
}

const rawTemplates = Array.isArray(templatesJson.templates) ? templatesJson.templates : []

const newestIds = [...rawTemplates]
  .filter((t) => t.createdAt)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, NEWEST_COUNT)
  .map((t) => t.id)

export const templates = rawTemplates.map((t) => {
  const normalized = normalizeTemplate(t)
  normalized.newest = typeof t.newest === "boolean" ? t.newest : newestIds.includes(t.id)
  return normalized
})

export function findTemplateBySlug(slug) {
  return templates.find((t) => t.slug === slug)
}

export function getFeaturedTemplates() {
  return templates
    .filter((t) => t.featured)
    .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0))
}

export function getTemplatesByCategory(category, limit = 3, excludeSlug) {
  return templates
    .filter((t) => t.category === category && t.slug !== excludeSlug)
    .slice(0, limit)
}

export function getRelatedTemplates(template, limit = 3) {
  const same = getTemplatesByCategory(template?.category, limit, template?.slug)
  if (same.length >= limit) return same
  const rest = templates.filter((t) => t.slug !== template?.slug && !same.includes(t)).slice(0, limit - same.length)
  return [...same, ...rest]
}

export function getTemplatePriceDisplay(template) {
  return `$${Number(template?.price || 0).toLocaleString("en-US")}`
}

// ── Projects ──

export function normalizeProject(p) {
  const caseStudy = p.caseStudy || {}
  return {
    ...p,
    summary: p.description || caseStudy.overview || "",
    techStack: Array.isArray(p.technologies) ? p.technologies : [],
    metrics: Array.isArray(p.statistics) ? p.statistics : [],
    timeline: p.duration,
    features: Array.isArray(caseStudy.features) ? caseStudy.features : [],
  }
}

const rawProjects = Array.isArray(projectsJson.projects) ? projectsJson.projects : []

export const projects = rawProjects.map(normalizeProject)

export function findProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured)
}

export function getProjectsByCategory(category, limit = 3, excludeSlug) {
  return projects
    .filter((p) => p.category === category && p.slug !== excludeSlug)
    .slice(0, limit)
}

export function getRelatedProjects(project, limit = 3) {
  const same = projects
    .filter((p) => p.industry === project?.industry && p.slug !== project?.slug)
    .slice(0, limit)
  if (same.length >= limit) return same
  const rest = projects.filter((p) => p.slug !== project?.slug && !same.includes(p)).slice(0, limit - same.length)
  return [...same, ...rest]
}

export function getProjectStatDisplay(stat) {
  if (!stat) return ""
  return `${stat.value ?? ""}${stat.suffix ?? ""}`
}
