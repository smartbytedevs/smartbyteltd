"use client"

import Link from "next/link"

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="SmartByte home"
      className="text-2xl md:text-3xl font-extrabold tracking-widest text-neutral-900 uppercase outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 rounded-md"
    >
      SMARTBYTE
    </Link>
  )
}
