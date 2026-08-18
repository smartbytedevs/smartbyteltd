import Link from "next/link"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "404 — Page Not Found | SmartByte",
  description: "The page you are looking for does not exist or has been moved.",
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-lg">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-secondary/10 border border-border/30 flex items-center justify-center mx-auto mb-8">
            <span className="font-display text-5xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              404
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted text-base mb-8 leading-relaxed">
            The page you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white font-medium text-sm hover:scale-[1.02] transition-all shadow-lg shadow-accent/20"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/40 text-foreground hover:bg-accent/[0.12] hover:border-border/55 transition-all text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
