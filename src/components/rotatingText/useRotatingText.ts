import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// Chars are rendered by React (not SplitType): SplitType rewrites the DOM under React,
// so later text updates were applied to detached nodes and the text never changed.
export default function useRotatingText(items: string[], holdMs = 2500) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  // layout effect so chars are hidden before first paint. Each item: reveal chars from below, hold, then push them out upwards and move to the next one
  useLayoutEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.rotating-char')
    const timeline = gsap.timeline({
      onComplete: () => setIndex((prev) => (prev + 1) % items.length),
    })

    timeline.fromTo(chars, { yPercent: 110 }, { yPercent: 0, stagger: 0.04, duration: 0.5, ease: 'power3.out' })

    if (items.length > 1) {
      timeline.to(chars, { yPercent: -110, stagger: 0.025, duration: 0.4, ease: 'power3.in', delay: holdMs / 1000 })
    }

    return () => {
      timeline.kill()
    }
  }, [index, items, holdMs])

  return { containerRef, current: items[index], index }
}
