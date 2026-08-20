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
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={card}>
            <Link href={`/works/${project.slug}`} className="group block">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm group transition-all duration-300 hover:shadow-lg hover:border-neutral-700"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={project.thumbnail || project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 line-clamp-1 group-hover:text-[#8ba4ff] transition-colors">
                      {project.title}
                    </h3>
                    <span className="mt-2.5 inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                      {project.category}
                    </span>
                  </div>
                  {project.summary && (
                    <p className="mt-4 text-sm text-neutral-500 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  )}
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
