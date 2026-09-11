import { siteUrl, siteName } from "@/lib/structured-data"

export const metadata = {
  title: { absolute: "About Us | Software & Web Development Agency in Bangladesh" },
  description:
    "Meet SmartByte, a full-stack software and web development agency in Chattogram, Bangladesh. Learn how we engineer high-performance digital products for global brands.",
  keywords: [
    "About SmartByte",
    "Software Agency Chittagong",
    "Web Development Company Bangladesh",
    "Digital Agency Team",
  ],
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About SmartByte | Software & Web Development Agency in Bangladesh",
    description: "The team and story behind SmartByte, a software & web development agency in Bangladesh.",
    url: `${siteUrl}/about`,
    siteName,
    type: "website",
  },
}

export default function AboutLayout({ children }) {
  return children
}