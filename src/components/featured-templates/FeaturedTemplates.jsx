"use client"

import { motion, useReducedMotion } from "motion/react"
import { Calendar, ArrowRight } from "lucide-react"
import { TemplateCarousel } from "./TemplateCarousel"
import { Particles } from "@/components/why-smartbyte/Particles"

const templates = [
  {
    id: "restaurant-pro",
    title: "Restaurant Pro",
    category: "Restaurant",
    description: "Complete online ordering, QR menus, and reservation system for modern restaurants.",
    price: "$299",
    width: 440,
    height: 580,
    techStack: ["Next.js", "Tailwind", "Stripe"],
    features: ["Online Ordering", "QR Menus", "Reservations", "POS Ready", "Delivery"],
    delivery: "3 days",
    pages: 8,
    responsive: true,
    seo: true,
    cms: true,
    badge: "BEST SELLER",
  },
  {
    id: "inventory-manager",
    title: "Inventory Manager",
    category: "Inventory",
    description: "Full-featured inventory system with barcode scanning, stock alerts, and reporting.",
    price: "$349",
    width: 450,
    height: 600,
    techStack: ["React", "Node", "Postgres"],
    features: ["Stock Tracking", "Barcode Scanner", "Stock Alerts", "Reports", "Multi-Warehouse"],
    delivery: "5 days",
    pages: 12,
    responsive: true,
    seo: true,
    cms: false,
    badge: null,
  },
  {
    id: "saas-platform",
    title: "SaaS Platform",
    category: "SaaS",
    description: "Multi-tenant SaaS dashboard with subscriptions, analytics, and user management.",
    price: "$499",
    width: 460,
    height: 620,
    techStack: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    features: ["User Management", "Subscriptions", "Analytics", "API Access", "Teams"],
    delivery: "7 days",
    pages: 16,
    responsive: true,
    seo: true,
    cms: true,
    badge: "TRENDING",
  },
  {
    id: "agency-portfolio",
    title: "Agency Portfolio",
    category: "Agency",
    description: "Stunning portfolio with case studies, filtering, and smooth page transitions.",
    price: "$249",
    width: 420,
    height: 560,
    techStack: ["Next.js", "Tailwind", "Motion"],
    features: ["Case Studies", "Project Filtering", "Page Transitions", "Contact Form", "Blog"],
    delivery: "2 days",
    pages: 6,
    responsive: true,
    seo: true,
    cms: true,
    badge: "NEW",
  },
  {
    id: "real-estate-hub",
    title: "Real Estate Hub",
    category: "Real Estate",
    description: "Property listing platform with maps, filtering, and virtual tour integration.",
    price: "$399",
    width: 450,
    height: 590,
    techStack: ["Next.js", "TypeScript", "Postgres"],
    features: ["Property Listings", "Map Integration", "Virtual Tours", "Saved Searches", "Agent Profiles"],
    delivery: "5 days",
    pages: 10,
    responsive: true,
    seo: true,
    cms: false,
    badge: null,
  },
  {
    id: "healthcare-plus",
    title: "Healthcare Plus",
    category: "Healthcare",
    description: "Medical practice website with appointment booking, patient portal, and records.",
    price: "$449",
    width: 460,
    height: 580,
    techStack: ["React", "Node", "Postgres"],
    features: ["Appointment Booking", "Patient Portal", "Medical Records", "Telehealth", "Insurance"],
    delivery: "6 days",
    pages: 14,
    responsive: true,
    seo: true,
    cms: true,
    badge: "POPULAR",
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    category: "E-Commerce",
    description: "Modern online store with cart, checkout, inventory sync, and payment processing.",
    price: "$549",
    width: 460,
    height: 600,
    techStack: ["Next.js", "Stripe", "Tailwind", "Postgres"],
    features: ["Shopping Cart", "Checkout", "Inventory Sync", "Payment Processing", "Order Tracking"],
    delivery: "7 days",
    pages: 20,
    responsive: true,
    seo: true,
    cms: true,
    badge: null,
  },
  {
    id: "corporate-landing",
    title: "Corporate Landing",
    category: "Landing Page",
    description: "High-conversion landing page built for startups launching their first product.",
    price: "$199",
    width: 420,
    height: 540,
    techStack: ["Next.js", "Tailwind", "Motion"],
    features: ["Hero Section", "Features Grid", "Testimonials", "Contact Form", "Analytics"],
    delivery: "1 day",
    pages: 4,
    responsive: true,
    seo: true,
    cms: false,
    badge: "LIMITED",
  },
]

export function FeaturedTemplates() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="featured-templates"
      className="relative py-[140px] overflow-hidden bg-background"
    >
      {/* ═══ Background ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-[15%] -left-48 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[10%] -right-48 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />
        <Particles />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* ═══ Section Header ═══ */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-5 block"
            >
              Ready to Launch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-section-title font-bold"
            >
              Featured
              <br />
              Templates
            </motion.h2>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-muted leading-relaxed max-w-[520px]"
            >
              <span className="text-foreground font-semibold">Beautiful websites. Ready today. Customized tomorrow.</span>
              <br />
              Choose from professionally crafted templates and launch your business in days instead of months.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <a
                href="#templates"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-semibold text-sm tracking-nav transition-all duration-500"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    boxShadow:
                      "0 0 30px rgba(0, 194, 168, 0.3), 0 0 60px rgba(56, 189, 248, 0.15)",
                  }}
                />
                <span className="relative z-10 text-background flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Browse All Templates
                </span>
                <motion.span
                  className="relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 text-background" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ pointerEvents: "none" }}
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* ═══ Carousel ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative pb-16"
        >
          <TemplateCarousel templates={templates} />
        </motion.div>
      </div>
    </section>
  )
}
