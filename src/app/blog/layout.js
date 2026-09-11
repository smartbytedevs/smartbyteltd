import { siteUrl, siteName } from "@/lib/structured-data"

export const metadata = {
  title: { absolute: "Blog | Software & Web Development Insights — SmartByte" },
  description:
    "Expert insights on web development, Next.js, UI/UX design, SEO, cybersecurity, and business growth from the SmartByte digital agency in Bangladesh.",
  keywords: [
    "Web Development Blog",
    "Next.js Blog",
    "UI/UX Design Tips",
    "SEO Guide Bangladesh",
    "Software Agency Insights",
  ],
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "SmartByte Blog | Software & Web Development Insights",
    description: "Expert web development, design, and business growth insights from SmartByte, a software agency in Bangladesh.",
    url: `${siteUrl}/blog`,
    siteName,
    type: "website",
  },
}

export default function BlogLayout({ children }) {
  return children
}