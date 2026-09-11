import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { MotionProvider } from "@/components/common/MotionProvider"
import { LoadingProvider } from "@/components/loading/LoadingProvider"
import { organizationSchema, websiteSchema, jsonLd } from "@/lib/structured-data"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  metadataBase: new URL("https://www.smartbyteltd.com"),
  title: {
    default: "SmartByte | Leading Software & Web Development Agency in Bangladesh",
    template: "%s | SmartByte Digital Agency",
  },
  description:
    "SmartByte is a premier full-stack software and web development agency in Bangladesh. We build ultra-fast, modern Next.js applications, custom e-commerce platforms, and scalable web solutions for global brands.",
  keywords: [
    "Software Agency Bangladesh",
    "Web Development Company Bangladesh",
    "Software Development Agency Chittagong",
    "Next.js Developer Bangladesh",
    "Full-Stack Web Development Agency",
    "Custom E-Commerce Development",
    "MERN Stack Developers Bangladesh",
    "SmartByte",
    "UI/UX Design Agency Bangladesh",
  ],
  authors: [{ name: "SmartByte Ltd." }],
  creator: "SmartByte Ltd.",
  publisher: "SmartByte Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SmartByte | Software & Web Development Agency in Bangladesh",
    description:
      "Engineering high-performance web applications, custom e-commerce, and modern SaaS products that drive business growth.",
    url: "https://www.smartbyteltd.com",
    siteName: "SmartByte",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SmartByte - Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartByte | Software & Web Development Agency",
    description: "High-performance web software and digital agency solutions engineered in Bangladesh.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.smartbyteltd.com",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteSchema())}
        />
        <MotionProvider>
          <LoadingProvider>
            {children}
            <FloatingContact />
          </LoadingProvider>
        </MotionProvider>
      </body>
    </html>
  )
}