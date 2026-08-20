"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const loadingPhrases = [
  "Crafting digital experiences...",
  "Loading portfolio showcase...",
  "Optimizing performance...",
  "Ready.",
]

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsVisible(false)
            if (onComplete) onComplete()
          }, 400)
          return 100
        }
        return prev + 1
      })
    }, 25)

    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    if (progress < 30) setPhraseIndex(0)
    else if (progress < 60) setPhraseIndex(1)
    else if (progress < 90) setPhraseIndex(2)
    else setPhraseIndex(3)
  }, [progress])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#0D0D0D] text-white flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
        >
          {/* Top Header Row */}
          <div className="flex items-center justify-between">
            <span className="text-xl md:text-2xl font-black tracking-widest text-white uppercase">
              SMARTBYTE
            </span>

            <div className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-medium text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#8ba4ff] animate-pulse" />
              <span>Initializing System</span>
            </div>
          </div>

          {/* Central Interactive Content Block */}
          <div className="my-auto flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
            {/* Number Display */}
            <div className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white tabular-nums">
              {progress}%
            </div>

            {/* Mint Green Pill Progress Bar */}
            <div className="relative w-64 h-3 bg-neutral-900 rounded-full border border-neutral-800 p-0.5 overflow-hidden">
              <motion.div
                className="h-full bg-[#8ba4ff] rounded-full shadow-[0_0_15px_rgba(139, 164, 255,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Rotating Status Phrase */}
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium text-neutral-400 tracking-wide h-6"
              >
                {loadingPhrases[phraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom Footer Detail */}
          <div className="flex items-center justify-between text-xs text-neutral-600 font-medium pt-6 border-t border-neutral-900">
            <span>CHITTAGONG, BD</span>
            <span>SMARTBYTE DIGITAL AGENCY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
