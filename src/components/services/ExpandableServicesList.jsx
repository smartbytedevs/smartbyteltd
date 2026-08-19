"use client"

import { motion } from "motion/react"

const services = [
  {
    title: "Branding & UI/UX",
    description:
      "Distinctive visual identities, component libraries, and intuitive interfaces built with clarity, character, and lasting conversion impact.",
  },
  {
    title: "Business Websites",
    description:
      "Professional brand-aligned websites that establish your online presence and drive business growth.",
  },
  {
    title: "E-Commerce",
    description:
      "Full-featured online stores with payment processing, inventory management, and order fulfillment.",
  },
  {
    title: "Full-Stack Web Development",
    description:
      "Scalable React, Next.js, and Node.js applications engineered for speed, clean architecture, and seamless integrations.",
  },
  {
    title: "Custom Web Apps",
    description:
      "Tailored web applications built from scratch to solve your unique business challenges.",
  },
  {
    title: "Restaurant Systems",
    description:
      "Complete digital solutions for restaurants — online ordering, table management, and kitchen integration.",
  },
  {
    title: "Hospital Management",
    description:
      "Comprehensive healthcare platforms with patient portals, scheduling, telemedicine, and records management.",
  },
  {
    title: "School Management",
    description:
      "Educational platforms covering admissions, attendance, grades, communication, and fee management.",
  },
  {
    title: "Inventory Systems",
    description:
      "Real-time inventory tracking with barcode scanning, multi-warehouse support, and demand forecasting.",
  },
  {
    title: "POS Software",
    description:
      "Point of sale systems with billing, inventory sync, customer management, and sales analytics.",
  },
  {
    title: "ERP Systems",
    description:
      "Enterprise resource planning platforms integrating finance, HR, operations, and reporting.",
  },
  {
    title: "Booking Platforms",
    description:
      "Appointment and reservation systems with real-time availability, payments, and calendar sync.",
  },
  {
    title: "CRM Systems",
    description:
      "Customer relationship management platforms with lead tracking, pipeline management, and analytics.",
  },
  {
    title: "Admin Dashboards",
    description:
      "Custom analytics and management dashboards with real-time data visualization and reporting.",
  },
  {
    title: "AI & Automation Solutions",
    description:
      "Intelligent workflow automation, custom AI agent integrations, and dynamic data-driven web tools.",
  },
  {
    title: "API Development",
    description:
      "RESTful and GraphQL APIs that connect your systems, services, and third-party platforms.",
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing technical maintenance, updates, security patches, and priority support for your digital products.",
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function ExpandableServicesList() {
  return (
    <section className="bg-[#F7F7F7] px-6 pb-20 md:px-16 md:pb-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-6xl space-y-0"
      >
        {services.map((svc) => (
          <motion.div
            key={svc.title}
            variants={item}
            className="group flex items-start justify-between gap-8 border-b border-neutral-300 py-12 cursor-pointer"
          >
            <div className="min-w-0 flex-1">
              <h3 className="flex items-center gap-3 text-4xl font-bold text-neutral-900 md:text-5xl">
                {svc.title}
                <span className="inline-block h-3 w-3 shrink-0 rounded-full bg-purple-300" />
              </h3>
              <p className="mt-4 max-w-2xl text-xl font-normal leading-relaxed text-neutral-600">
                {svc.description}
              </p>
            </div>

            <span className="mt-2 shrink-0 text-3xl text-neutral-900 transition-transform duration-300 group-hover:translate-x-3">
              ⟶
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
