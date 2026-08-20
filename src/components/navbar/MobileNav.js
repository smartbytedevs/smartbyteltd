"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"

const mobileLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/works" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const drawerVariants = {
  initial: { x: "-100%" },
  open: { x: 0 },
  closed: { x: "100%" },
}

const listVariants = {
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -20 },
}

export function MobileNav({ isOpen, onClose, links, activeHref }) {
  const allLinks = links.map((l) => ({ name: l.label, href: l.href }))

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          initial="initial"
          animate="open"
          exit="closed"
          variants={drawerVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 bg-white z-[60] flex flex-col justify-between p-8 md:hidden overflow-y-auto"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
            <Link
              href="/"
              onClick={onClose}
              className="text-xl font-extrabold tracking-widest text-neutral-900 uppercase"
            >
              SMARTBYTE
            </Link>
            <button
              onClick={onClose}
              className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Link List */}
          <motion.nav
            className="my-auto divide-y divide-neutral-200/80"
            variants={listVariants}
            initial="initial"
            animate="open"
            exit="closed"
          >
            {allLinks.map((link) => {
              const isActive = activeHref === link.href
              return (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="py-5 flex items-center justify-between group w-full"
                  >
                    <span
                      className={`text-4xl font-extrabold tracking-tight transition-colors ${
                        isActive
                          ? "text-neutral-900"
                          : "text-neutral-800 group-hover:text-black"
                      }`}
                    >
                      {link.name}
                    </span>
                    <div className="bg-[#8ba4ff] text-black w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>

          {/* Footer Contact Info */}
          <div className="pt-6 border-t border-neutral-200 space-y-1 text-sm text-neutral-800 font-medium">
            <p>hello@smartbyte.com</p>
            <p>+880 1234 567890</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
