import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "Terms of Service | SmartByte",
  description: "SmartByte's terms of service govern the use of our website and services.",
  openGraph: {
    title: "Terms of Service | SmartByte",
    description: "SmartByte's terms of service govern the use of our website and services.",
  },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-muted text-sm mb-12">Last updated: July 30, 2026</p>

          <div className="space-y-8 text-sm sm:text-base text-muted leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">1. Services</h2>
              <p>SmartByte provides web development, design, software development, and digital consultancy services. By engaging our services, you agree to these terms. All project scope, deliverables, timelines, and pricing will be outlined in a separate project agreement.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">2. Intellectual Property</h2>
              <p>Upon full payment, all intellectual property rights for the delivered work are transferred to the client. SmartByte retains the right to display completed work in our portfolio unless otherwise agreed in writing.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Payments</h2>
              <p>Payment terms are specified in each project agreement. A deposit is typically required before work begins, with the balance due upon completion. Late payments may result in project delays or suspension of services.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Revisions</h2>
              <p>Our project agreements include defined revision cycles. Additional revisions beyond the agreed scope may incur extra charges. We work closely with clients to ensure satisfaction within the agreed scope.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Limitation of Liability</h2>
              <p>SmartByte shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products. Our total liability is limited to the amount paid for the specific project.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Contact</h2>
              <p>For questions about these terms, contact us at <a href="mailto:hello@smartbyte.dev" className="text-accent hover:underline">hello@smartbyte.dev</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
