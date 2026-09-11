import { siteUrl, siteName } from "@/lib/structured-data"

export const metadata = {
  title: { absolute: "Services | Software & Web Development Services — SmartByte" },
  description:
    "Full-stack software and web development services in Bangladesh: custom web apps, e-commerce, SaaS, UI/UX design, SEO, and AI automation from SmartByte.",
  keywords: [
    "Web Development Services Bangladesh",
    "Software Development Services",
    "Custom E-Commerce Development",
    "UI/UX Design Services",
    "SaaS Development Bangladesh",
    "SEO Services Bangladesh",
    "AI Automation Services",
  ],
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Services | Software & Web Development Services — SmartByte",
    description: "Custom software, web development, e-commerce, UI/UX, SEO, and AI services in Bangladesh from SmartByte.",
    url: `${siteUrl}/services`,
    siteName,
    type: "website",
  },
}

export default function ServicesLayout({ children }) {
  return children
}