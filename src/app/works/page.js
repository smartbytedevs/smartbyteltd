import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { WorksHero } from "@/components/works/WorksHero"
import { WorkShowcase } from "@/components/works/WorkShowcase"

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main>
        <WorksHero />
        <WorkShowcase />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
