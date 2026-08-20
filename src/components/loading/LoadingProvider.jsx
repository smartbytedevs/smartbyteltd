"use client"

import { useState, useEffect, useCallback } from "react"
import { SplashScreen } from "./SplashScreen"
import { LoadingScreen } from "./LoadingScreen"

const SPLASH_KEY = "smartbyte-splash-seen"

export function LoadingProvider({ children }) {
  const [screenType, setScreenType] = useState(null)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem(SPLASH_KEY)
    setScreenType(hasSeenSplash ? "loading" : "splash")
  }, [])

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem(SPLASH_KEY, "1")
    setScreenType("none")
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setScreenType("none")
  }, [])

  return (
    <>
      {screenType === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      {screenType === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {children}
    </>
  )
}
