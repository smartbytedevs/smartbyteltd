import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { MotionProvider } from "@/components/common/MotionProvider"
import { LoadingProvider } from "@/components/loading/LoadingProvider"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  metadataBase: new URL("https://smartbyte.agency"),
  title: "SmartByte | Digital Innovation Agency",
  description:
    "We build premium digital products — websites, applications, and AI-powered solutions that transform businesses.",
  openGraph: {
    title: "SmartByte | Digital Innovation Agency",
    description:
      "We build premium digital products — websites, applications, and AI-powered solutions that transform businesses.",
    type: "website",
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
