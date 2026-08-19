"use client"

import { motion } from "motion/react"
import { useState } from "react"
import Image from "next/image"

function ArrowIcon({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function Avatar({ member, index }) {
  const [imgError, setImgError] = useState(false)
  const hue = (index * 60 + 200) % 360

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border-2 border-white/10">
      {!imgError ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="96px"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, hsla(${hue}, 50%, 25%, 0.8), hsla(${hue + 40}, 60%, 15%, 0.9))`,
          }}
        >
          <span className="text-2xl md:text-3xl font-bold text-white/80 font-display">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
      )}
    </div>
  )
}

export function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group"
    >
      <div className="relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-colors duration-500">
        <div className="flex items-start gap-5">
          <Avatar member={member} index={index} />

          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 font-display">
              {member.name}
            </h3>
            <p className="text-sm md:text-base text-gray-400 mb-3">
              {member.role}
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={member.portfolio || "#"}
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-300 w-fit"
              >
                <span>Meet {member.name.split(" ")[0]}</span>
                <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={member.linkedin || "#"}
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#0A66C2] transition-colors duration-300 w-fit"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
                <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
