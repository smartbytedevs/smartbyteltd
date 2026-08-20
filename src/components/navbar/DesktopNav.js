"use client"

import Link from "next/link"
import { NavItem } from "./NavItem"

export function DesktopNav({ links, activeHref }) {
  return (
    <nav
      className="hidden md:flex items-center bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-full px-3 py-2 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      {links.map((link, i) => (
        <NavItem
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={activeHref === link.href}
          isFirst={i === 0}
        />
      ))}

      <Link
        href="/contact"
        className="ml-2 bg-[#50FFAF] text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm hover:bg-[#3effa2]"
      >
        Contact
      </Link>
    </nav>
  )
}
