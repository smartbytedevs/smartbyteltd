import { siteUrl, siteName } from "@/lib/structured-data"

export const metadata = {
  title: { absolute: "Our Work | Web Development Projects & Case Studies — SmartByte" },
  description:
    "Explore real web development projects, custom software, and e-commerce platforms built by SmartByte — a leading software & web development agency in Bangladesh.",
  keywords: [
    "Web Development Portfolio",
    "Agency Case Studies Bangladesh",
    "Custom Software Projects",
    "E-Commerce Development",
    "Next.js Projects",
  ],
  alternates: { canonical: `${siteUrl}/works` },
  openGraph: {
    title: "SmartByte Portfolio | Web Development Projects & Case Studies",
    description: "Real projects and case studies built by SmartByte, a software & web development agency in Bangladesh.",
    url: `${siteUrl}/works`,
    siteName,
    type: "website",
  },
}

export default function WorksLayout({ children }) {
  return children
}