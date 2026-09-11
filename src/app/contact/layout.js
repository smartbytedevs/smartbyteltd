import { siteUrl, siteName } from "@/lib/structured-data"

export const metadata = {
  title: { absolute: "Contact | Software & Web Development Agency in Bangladesh" },
  description:
    "Get a free consultation from SmartByte, a software and web development agency in Bangladesh. Tell us about your project and we'll respond within 2 hours.",
  keywords: [
    "Contact Software Agency Bangladesh",
    "Hire Web Developers Bangladesh",
    "Start A Project",
    "Software Agency Chittagong Contact",
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact SmartByte | Software & Web Development Agency",
    description: "Start your project with SmartByte — web development, software, and e-commerce in Bangladesh.",
    url: `${siteUrl}/contact`,
    siteName,
    type: "website",
  },
}

export default function ContactLayout({ children }) {
  return children
}