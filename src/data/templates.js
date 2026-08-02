import raw from "./templates.json"
import { templates } from "@/lib/portfolio-data"

export { templates }

export const categories = raw.categories
export const industries = raw.industries
export const priceRanges = raw.priceRanges
export const sortOptions = raw.sortOptions
export const businessTypes = raw.businessTypes
export const budgetOptions = raw.budgetOptions
export const timelineOptions = raw.timelineOptions
export const technologyOptions = raw.technologyOptions
export const featureOptions = raw.featureOptions
export const faqItems = raw.faqItems

const featureKeywords = raw.featureKeywords || {}

export function matchFeature(featureId, templateFeatures) {
  const keywords = featureKeywords[featureId]
  if (!keywords) return false
  return templateFeatures.some((f) => keywords.some((kw) => f.toLowerCase().includes(kw)))
}

export function matchTechnology(techOption, templateTech) {
  return templateTech.some((t) => t.toLowerCase() === techOption.match.toLowerCase())
}
