"use client"

import { motion } from "motion/react"
import { Mail, Phone, MapPin, Clock, Zap } from "lucide-react"
import { contactInfo, quickResponse, socialLinks } from "./contactData"

function ContactMethod({ icon: Icon, title, value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 transition-all duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5 text-[#8ba4ff]" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {title}
          </p>
          <p className="mt-0.5 truncate text-sm font-medium text-gray-900">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function SocialIcon({ name, url, index }) {
  const iconMap = {
    GitHub: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    Facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    Instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    Behance: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 7.5H14v-2h8v2zm0 7.5c0 .5-.1 1-.3 1.5-.2.5-.5 1-1 1.4-.4.4-.9.7-1.5.9-.6.2-1.2.3-1.8.3-1.1 0-2.1-.3-2.9-.8-.8-.5-1.3-1.2-1.6-2.1-.3-.9-.4-1.8-.4-2.8 0-1 .1-2 .4-2.9.3-.9.9-1.7 1.6-2.3.7-.6 1.7-1 2.9-1 1.3 0 2.3.4 3.1 1.2.8.8 1.2 1.9 1.3 3.2H20c0-.7-.2-1.3-.6-1.8-.4-.5-.9-.8-1.6-.8-.7 0-1.3.3-1.7.8-.4.5-.6 1.2-.6 2h5.5V15zm-11 1.2c0 .6-.2 1.1-.6 1.5-.4.4-.9.7-1.5.9-.6.2-1.2.3-1.8.3H2V3h4.6c.7 0 1.3.1 1.9.3.6.2 1.1.6 1.5 1.1.4.5.6 1.1.6 1.8 0 .7-.2 1.3-.6 1.8-.4.5-.9.8-1.5 1-.7.2-1.3.3-1.9.3.6 0 1.2.1 1.8.4.5.2 1 .6 1.3 1.1.3.5.5 1.1.5 1.8zM5.5 7.5c0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.8-.3H4v2h.5c.3 0 .6-.1.8-.3.2-.2.2-.4.2-.7zm.5 4.5c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.9-.3H4v2.2h.8c.4 0 .7-.1.9-.3.2-.2.3-.5.3-.8zm10 1.5c0-.9-.3-1.4-.8-1.8-.5-.4-1.2-.5-1.9-.5-.8 0-1.5.2-1.9.5-.5.3-.8.8-.8 1.4v.4h5.4z" />
      </svg>
    ),
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-300 hover:scale-110 hover:border-gray-300 hover:text-gray-900 hover:shadow-md"
    >
      {iconMap[name]}
    </motion.a>
  )
}

export function ConversationPanel() {
  const methods = [
    { icon: Mail, title: "Email", value: contactInfo.email },
    { icon: Phone, title: "Phone", value: contactInfo.phone },
    { icon: MapPin, title: "Location", value: contactInfo.location },
    { icon: Clock, title: "Working Hours", value: contactInfo.hours },
  ]

  return (
    <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h3 className="font-display text-xl font-bold text-gray-900 sm:text-2xl">
          Ready to Start?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Every successful business starts with a conversation. Tell us your
          idea and we&apos;ll help you turn it into reality.
        </p>
      </motion.div>

      <div className="space-y-3">
        {methods.map((method, i) => (
          <ContactMethod key={method.title} {...method} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8ba4ff]/10">
          <Zap className="h-4 w-4 text-[#8ba4ff]" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {quickResponse.label}
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {quickResponse.value}
          </p>
        </div>
      </motion.div>

      <div className="pt-2">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          Follow Us
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map((link, i) => (
            <SocialIcon key={link.name} {...link} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
