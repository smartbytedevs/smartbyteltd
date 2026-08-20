"use client"

import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { SplashScreen } from "./SplashScreen"

export function LoadingProvider({ children }) {
  const pathname = usePathname()
  const [loadingKey, setLoadingKey] = useState(0)
  const [showLoading, setShowLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setShowLoading(false)
  }, [])

  return (
    <>
      {showLoading && (
        <SplashScreen key={loadingKey} onComplete={handleComplete} />
      )}
      {children}
    </>
  )
}
