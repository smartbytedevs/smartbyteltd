"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
export function CTAButton() {

  return (
    <motion.button
      type="button"
      onClick={() => (window.location.href = "/contact")}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 bg-[#50FFAF] hover:bg-[#40E69D] text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300 shadow-sm hover:shadow-md"
    >
      Contact
      <ArrowRight className="w-3.5 h-3.5" />
    </motion.button>
  )
}
