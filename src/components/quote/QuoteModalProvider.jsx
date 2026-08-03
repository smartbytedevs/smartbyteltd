"use client"

import { useState, useCallback } from "react"
import { QuoteModalContext } from "./QuoteModalContext"
import { QuoteModal } from "./QuoteModal"

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState(null)

  const openQuoteModal = useCallback((options = {}) => {
    setData(options)
    setIsOpen(true)
  }, [])

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <QuoteModal isOpen={isOpen} data={data} onClose={closeQuoteModal} />
    </QuoteModalContext.Provider>
  )
}
