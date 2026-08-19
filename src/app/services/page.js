import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { ServicesHero } from "@/components/services/ServicesHero"
import { ExpandableServicesList } from "@/components/services/ExpandableServicesList"

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ExpandableServicesList />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
