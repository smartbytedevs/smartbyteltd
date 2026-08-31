"use client"

import { motion } from "motion/react"

const services = [
  {
    title: "Website Development",
    description:
      "Modern, responsive websites built around your brand and business goals — from company websites and landing pages to e-commerce and industry-specific platforms.",
  },
  {
    title: "Software Development",
    description:
      "Custom software solutions built to streamline operations, automate workflows, manage data, and solve your unique business challenges.",
  },
  {
    title: "UI/UX Design",
    description:
      "Clean, intuitive, and conversion-focused interfaces designed to create better digital experiences across websites, web apps, and business platforms.",
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven digital marketing strategies designed to increase your online visibility, attract the right audience, generate leads, and grow your business.",
  },
  {
    title: "Content Creation",
    description:
      "Engaging visual content including social media graphics, promotional videos, reels, ad creatives, thumbnails, and branded digital content.",
  },
  {
    title: "Business Research",
    description:
      "Strategic research into your business, competitors, customers, and opportunities to help you make smarter decisions before investing in growth.",
  },
  {
    title: "Market Research",
    description:
      "In-depth market and competitor research that reveals customer behavior, industry trends, demand, opportunities, and effective market positioning.",
  },
  {
    title: "Page Boosting & Ad Running",
    description:
      "Targeted social media campaigns that increase reach, engagement, traffic, leads, and sales through strategic page promotion and paid advertising.",
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
