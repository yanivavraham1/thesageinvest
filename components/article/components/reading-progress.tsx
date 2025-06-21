"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setWidth(scrollPercent * 100)
    }

    // Update on mount
    updateProgress()

    // Add scroll event listener
    window.addEventListener("scroll", updateProgress)

    // Clean up
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return <div className="reading-progress-bar" style={{ width: `${width}%` }} />
}

