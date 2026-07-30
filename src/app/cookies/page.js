import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "Cookies Policy | SmartByte",
  description: "SmartByte's cookies policy explains how we use cookies and similar tracking technologies.",
  openGraph: {
    title: "Cookies Policy | SmartByte",
    description: "SmartByte's cookies policy explains how we use cookies and similar tracking technologies.",
  },
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Cookies Policy
          </h1>
          <p className="text-muted text-sm mb-12">Last updated: July 30, 2026</p>

          <div className="space-y-8 text-sm sm:text-base text-muted leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">1. What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly, improve user experience, and provide analytics information to site owners.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">2. How We Use Cookies</h2>
              <p>We use cookies to:</p>
              <ul className="mt-2 space-y-1.5 list-disc pl-5">
                <li>Ensure our website functions correctly</li>
                <li>Understand how visitors interact with our site</li>
                <li>Improve our website performance and user experience</li>
                <li>Provide relevant content and communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Types of Cookies We Use</h2>
              <p><strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</p>
              <p className="mt-2"><strong>Analytics Cookies:</strong> Help us understand how visitors use our website, which pages are most popular, and how users navigate the site.</p>
              <p className="mt-2"><strong>Functional Cookies:</strong> Remember your preferences and settings to provide a personalized experience.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Managing Cookies</h2>
              <p>You can control and manage cookies in your browser settings. Most browsers allow you to block or delete cookies. However, disabling certain cookies may affect the functionality of our website.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Contact</h2>
              <p>If you have questions about our use of cookies, contact us at <a href="mailto:hello@smartbyte.dev" className="text-accent hover:underline">hello@smartbyte.dev</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
