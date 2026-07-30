"use client"

import { useCallback } from "react"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { ContactHero } from "./ContactHero"
import { ConversationPanel } from "@/components/contact/ConversationPanel"
import { ContactForm } from "@/components/contact/ContactForm"
import { FAQ } from "@/components/contact/FAQ"
import { TrustBar } from "@/components/contact/TrustBar"
import { FinalCTA } from "@/components/contact/FinalCTA"

export default function ContactPage() {
  const scrollToForm = useCallback(() => {
    const el = document.getElementById("contact-form-section")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <ContactHero onStartProject={scrollToForm} />
        <section id="contact-form-section" className="relative overflow-hidden bg-background py-[100px] sm:py-[120px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.015]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
            <div className="absolute -left-48 top-[5%] h-[700px] w-[700px] rounded-full opacity-20" style={{
              background: "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
              filter: "blur(120px)",
            }} />
            <div className="absolute -right-48 top-[25%] h-[500px] w-[500px] rounded-full opacity-15" style={{
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
              filter: "blur(120px)",
            }} />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
              <ConversationPanel />
              <div id="contact-form">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contact-faq" className="relative overflow-hidden bg-background py-[100px] sm:py-[120px]">
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <FAQ />
          </div>
        </section>

        <section id="contact-trust" className="relative bg-background pb-[60px]">
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <TrustBar />
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
