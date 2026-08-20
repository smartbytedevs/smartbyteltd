"use client"

import Link from "next/link"

export function CTAButton() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 bg-[#50FFAF] text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm hover:bg-[#3effa2]"
    >
      Contact
    </Link>
  )
}
