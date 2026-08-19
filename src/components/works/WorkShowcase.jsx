"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { projects } from "@/data/works"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function WorkShowcase() {
  return (
    <section className="bg-[#F7F7F7] px-6 pb-20 md:px-16 md:pb-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={card}>
            <Link href={`/works/${project.slug}`} className="group block">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-sm"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.thumbnail || project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {project.title}
                  </h3>
                  <span className="mt-2 inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                    {project.category}
                  </span>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
