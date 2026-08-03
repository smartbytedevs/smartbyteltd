"use client"

import { createContext, useContext } from "react"

export const QuoteModalContext = createContext(null)

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext)
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider")
  return ctx
}
