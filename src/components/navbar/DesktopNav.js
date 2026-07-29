"use client"

import { motion } from "motion/react"
import { NavItem } from "./NavItem"

export function DesktopNav({ links, activeHref }) {
  return (
    <nav
      className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-0.5"
      role="navigation"
      aria-label="Main navigation"
    >
      {links.map((link) => (
        <NavItem
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={activeHref === link.href}
        />
      ))}
    </nav>
  )
}
