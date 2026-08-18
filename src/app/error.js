"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function Error({ error, reset }) {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-lg">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-border/30 flex items-center justify-center mx-auto mb-8">
            <span className="font-display text-4xl font-bold text-red-600">!</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Something Went Wrong
          </h1>
          <p className="text-muted text-base mb-8 leading-relaxed">
            An unexpected error occurred. Our team has been notified and we are working to fix it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white font-medium text-sm hover:scale-[1.02] transition-all shadow-lg shadow-accent/20 cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/40 text-foreground hover:bg-accent/[0.12] hover:border-border/55 transition-all text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
