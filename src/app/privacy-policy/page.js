import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "Privacy Policy | SmartByte",
  description: "SmartByte's privacy policy explains how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | SmartByte",
    description: "SmartByte's privacy policy explains how we collect, use, and protect your personal information.",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted text-sm mb-12">Last updated: July 30, 2026</p>

          <div className="space-y-8 text-sm sm:text-base text-muted leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including your name, email address, phone number, company name, and project details when you fill out our contact form or communicate with us.</p>
              <p className="mt-3">We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, and usage data through cookies and similar technologies.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="mt-2 space-y-1.5 list-disc pl-5">
                <li>Respond to your inquiries and provide project proposals</li>
                <li>Communicate with you about our services and updates</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Data Protection</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data is stored securely and access is restricted to authorized personnel only.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and business, provided they agree to keep your information confidential.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, update, or delete your personal information at any time. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us at hello@smartbyte.dev.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Contact</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@smartbyte.dev" className="text-accent hover:underline">hello@smartbyte.dev</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
