import { siteUrl, siteName } from "@/lib/structured-data"

export const metadata = {
  title: { absolute: "Website Templates | Premium Next.js Templates — SmartByte" },
  description:
    "Premium, production-ready Next.js website templates for restaurants, healthcare, education, e-commerce, real estate, startups, and more — built by SmartByte.",
  keywords: [
    "Website Templates",
    "Next.js Templates",
    "Premium Business Templates",
    "E-Commerce Templates",
    "Agency Templates Bangladesh",
  ],
  alternates: { canonical: `${siteUrl}/templates` },
  openGraph: {
    title: "Website Templates | Premium Next.js Templates — SmartByte",
    description: "Premium Next.js website templates for every industry, built by SmartByte.",
    url: `${siteUrl}/templates`,
    siteName,
    type: "website",
  },
}

export default function TemplatesLayout({ children }) {
  return children
}