"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "motion/react"
import { SafeReveal } from "@/components/common/SafeMotion"

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function PortfolioIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

const socialLinks = [
  { icon: GitHubIcon, label: "GitHub" },
  { icon: LinkedInIcon, label: "LinkedIn" },
  { icon: PortfolioIcon, label: "Portfolio" },
  { icon: EmailIcon, label: "Email" },
]

function SocialIcon({ icon: Icon, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-accent/[0.06] border border-accent/15 flex items-center justify-center text-accent hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-colors duration-300"
    >
      <Icon />
    </a>
  )
}

function ProfileImage({ index }) {
  const hue = (index * 45 + 160) % 360

  return (
    <div className="relative h-44 sm:h-48 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(135deg, hsla(${hue}, 40%, 20%, 0.6), hsla(${hue + 30}, 50%, 12%, 0.8))`,
            `linear-gradient(135deg, hsla(${hue + 30}, 40%, 20%, 0.6), hsla(${hue + 60}, 50%, 12%, 0.8))`,
            `linear-gradient(135deg, hsla(${hue}, 40%, 20%, 0.6), hsla(${hue + 30}, 50%, 12%, 0.8))`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-25 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, hsla(${hue + 15}, 60%, 50%, 0.2), transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-20 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, hsla(${hue + 50}, 70%, 55%, 0.15), transparent 70%)`,
          filter: "blur(30px)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full opacity-15 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, hsla(${hue + 30}, 50%, 60%, 0.12), transparent 70%)`,
          filter: "blur(24px)",
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] transition-opacity duration-700"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/50 to-transparent" />
    </div>
  )
}

export function TeamCard({ member, index, featured }) {
  const cardRef = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientY - centerY) / 14
      const y = (e.clientX - centerX) / -14
      setRotate({ x: Math.max(-6, Math.min(6, x)), y: Math.max(-6, Math.min(6, y)) })
    },
    []
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }, [])

  return (
    <SafeReveal delay={index * 0.08} viewportMargin="-60px" className="group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[24px] overflow-hidden cursor-default"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: "spring", stiffness: 250, damping: 28, mass: 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 rounded-[24px] border transition-colors duration-500"
            style={{
              borderColor: isHovered
                ? "rgba(0, 240, 255, 0.25)"
                : "rgba(255, 255, 255, 0.08)",
              background: isHovered
                ? "rgba(13, 13, 24, 0.9)"
                : "rgba(13, 13, 24, 0.7)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          />

          <div
            className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08), transparent 70%)",
            }}
          />

          <div
            className="absolute -inset-4 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(139, 92, 246, 0.05))",
              filter: "blur(24px)",
              zIndex: -1,
            }}
          />

          <ProfileImage index={index} />

          <div className="relative p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3
                className={`font-display text-lg font-bold transition-colors duration-300 ${
                  isHovered ? "text-accent" : "text-foreground"
                }`}
              >
                {member.name}
              </h3>
              <span className="flex items-center gap-1.5 shrink-0 mt-0.5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                  <span className="relative inline-block w-2 h-2 rounded-full bg-accent" />
                </span>
                <span className="text-[9px] font-medium text-muted/50 uppercase tracking-label leading-none">
                  Available
                </span>
              </span>
            </div>

            <p className="text-xs text-muted mb-2">{member.role}</p>

            <p className="text-xs text-muted/70 leading-relaxed mb-3 line-clamp-2">
              {member.bio}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-colors duration-300 ${
                    isHovered
                      ? "bg-accent/10 border-accent/20 text-accent"
                      : "bg-accent/[0.06] border-accent/15 text-accent/60"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-border/25">
              <span className="text-[10px] text-muted/40">
                {member.experience || "Intermediate"}
              </span>
              <div className="flex items-center gap-1">
                {socialLinks.map((s) => (
                  <SocialIcon key={s.label} icon={s.icon} label={s.label} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SafeReveal>
  )
}
