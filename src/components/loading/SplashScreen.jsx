"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"

export function SplashScreen({ onComplete }) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleEnter = () => {
    setIsDismissed(true)
    if (onComplete) onComplete()
  }

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] },
          }}
          className="fixed inset-0 z-[110] bg-[#0A0A0A] text-white flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
        >
          {/* Top Bar Details */}
          <div className="flex items-center justify-between w-full">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-black tracking-widest text-white uppercase"
            >
              SMARTBYTE
            </motion.span>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-mono text-neutral-500 uppercase tracking-widest hidden sm:block"
            >
              [ BD — 2026 ]
            </motion.div>
          </div>

          {/* Central Hero Reveal Block */}
          <div className="my-auto flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 border border-neutral-800 bg-neutral-900/80 px-5 py-2 rounded-full text-xs md:text-sm font-medium text-neutral-300 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#50FFAF]" />
              <span>Web Architecture • Digital Products • AI Systems</span>
            </motion.div>

            {/* Giant Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600 uppercase"
            >
              WE BUILD DIGITAL FUTURES
            </motion.h1>

            {/* Interactive Enter CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-3 bg-[#50FFAF] text-black font-bold text-base px-8 py-4 rounded-full hover:bg-[#3effa2] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(80,255,175,0.3)] cursor-pointer mt-4"
              >
                <span>ENTER EXPERIENCE</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </div>

          {/* Bottom Footer Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between text-xs text-neutral-600 font-medium pt-6 border-t border-neutral-900/80"
          >
            <span>SMARTBYTE LTD.</span>
            <span>CLICK ANYWHERE OR ENTER TO CONTINUE</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
