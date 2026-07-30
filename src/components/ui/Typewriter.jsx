"use client"

import { useState, useEffect, useRef } from "react"

export function Typewriter({
  words = [],
  typingSpeed = 55,
  deleteSpeed = 35,
  delay = 1800,
  loop = true,
  cursor = true,
  className = "",
}) {
  const [displayText, setDisplayText] = useState(words[0] || "")
  const wordIndex = useRef(0)
  const charIndex = useRef(words[0] ? words[0].length : 0)
  const isDeleting = useRef(false)
  const timeout = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [setMounted])

  useEffect(() => {
    if (!mounted) return
    if (words.length === 0) return

    const tick = () => {
      const currentWord = words[wordIndex.current]
      if (!currentWord) {
        timeout.current = setTimeout(tick, typingSpeed)
        return
      }

      if (isDeleting.current) {
        charIndex.current -= 1
        setDisplayText(currentWord.substring(0, charIndex.current))
        if (charIndex.current === 0) {
          isDeleting.current = false
          wordIndex.current = (wordIndex.current + 1) % words.length
          if (!loop && wordIndex.current === 0) return
          timeout.current = setTimeout(tick, 300)
          return
        }
        timeout.current = setTimeout(tick, deleteSpeed)
      } else {
        charIndex.current += 1
        setDisplayText(currentWord.substring(0, charIndex.current))
        if (charIndex.current === currentWord.length) {
          isDeleting.current = true
          timeout.current = setTimeout(tick, delay)
          return
        }
        timeout.current = setTimeout(tick, typingSpeed)
      }
    }

    const startTimeout = setTimeout(() => {
      isDeleting.current = true
      timeout.current = setTimeout(tick, deleteSpeed)
    }, 300)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timeout.current)
    }
  }, [mounted, words, typingSpeed, deleteSpeed, delay, loop])

  if (words.length === 0) return null

  if (!mounted) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <span
          aria-hidden="true"
          className="inline-block ml-px font-light"
          style={{
            animation: "tw-blink 1s step-end infinite",
          }}
        >
          |
        </span>
      )}
    </span>
  )
}
