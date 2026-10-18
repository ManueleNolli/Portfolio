import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

type AOSProviderProps = {
  children: React.ReactNode
}

/**
 * AOS: Animate on Scroll Library
 */
export default function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    AOS.init({
      once: true,
    })

    // AOS stores each element's trigger offset; when content above changes height after load (GitHub cards replacing
    // their skeletons, images, the pinned journey) the offsets go stale and sections near the bottom never reach theirs
    let frame = 0
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => AOS.refresh())
    })
    observer.observe(document.body)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return children
}
