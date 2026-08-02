import raw from "./projects.json"
import { projects, findProjectBySlug } from "@/lib/portfolio-data"

export { projects }

export const stats = raw.stats
export const industries = raw.industries
export const processSteps = raw.processSteps
export const awards = raw.awards
export const categories = raw.categories
export const sortOptions = raw.sortOptions
export const industryOptions = raw.industryOptions
export const technologyOptions = raw.technologyOptions

export const featuredProject = findProjectBySlug("restaurant-pro") || projects[0]
