import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import { profile } from '@/data/profile'
import { JourneyCard, JourneyContent, JourneyDot, JourneyEarly, JourneyStepLabel, toJourneys } from '@/features/journey/JourneyParts'

gsap.registerPlugin(ScrollTrigger)

// Desktop-only variant: the section is pinned and vertical scroll moves the timeline horizontally, oldest -> newest
export default function JourneyHorizontal() {
  const steps = [...profile.journey].reverse()

  const wrapper = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      if (!wrapper.current || !track.current || !line.current || !progress.current) return

      const trackElement = track.current
      const lineElements = [line.current, progress.current]
      const progressElement = progress.current
      const getScrollAmount = () => Math.max(0, trackElement.scrollWidth - window.innerWidth)

      // the line runs exactly from the first dot to the last one, measured because the step widths are fluid
      const placeLine = () => {
        const dots = trackElement.querySelectorAll('.journey-h-dot')
        const trackLeft = trackElement.getBoundingClientRect().left
        const center = (dot: Element) => dot.getBoundingClientRect().left + dot.getBoundingClientRect().width / 2 - trackLeft
        const start = center(dots[0])
        gsap.set(lineElements, { left: start, width: center(dots[dots.length - 1]) - start })
      }
      // the fill follows the scroll: empty at the oldest step, complete when "Now" is reached
      const updateProgress = (progress: number) => gsap.set(progressElement, { scaleX: progress })

      const tween = gsap.to(trackElement, { x: () => -getScrollAmount(), ease: 'none' })

      ScrollTrigger.create({
        trigger: wrapper.current,
        start: 'top top',
        // 1.5px of vertical scroll per horizontal px: slower, smoother travel
        end: () => `+=${getScrollAmount() * 1.5}`,
        pin: true,
        scrub: 0.5,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateProgress(self.progress),
        onRefresh: (self) => {
          placeLine()
          updateProgress(self.progress)
        },
      })

      gsap.from(trackElement.querySelectorAll('.journey-step-content'), {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: { trigger: wrapper.current, start: 'top 60%' },
      })

      // pinning adds scroll space: AOS offsets of the sections below must be recomputed
      ScrollTrigger.refresh()
      AOS.refresh()
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapper} className="h-screen overflow-hidden font-mono text-primary-50 flex flex-col justify-center">
      <h2 className="pb-16 text-5xl font-bold text-center">Journey</h2>

      <div ref={track} className="relative flex items-start w-max px-[10vw]">
        <div ref={line} className="absolute top-5 w-0 h-0.5 bg-primary-300/30" />
        <div ref={progress} className="absolute top-5 w-0 h-0.5 bg-primary-100 origin-left scale-x-0" />

        <div className="relative w-[24vw] shrink-0 pr-[4vw]">
          <span className="journey-h-dot relative block ml-3.5 mt-3.5 h-3 w-3 rounded-full bg-primary-300" />
          <div className="journey-step-content mt-10">
            <JourneyEarly links={profile.journeyEarly} />
          </div>
        </div>

        {steps.map((step) => {
          const journeys = toJourneys(step)
          const isParallel = journeys.length > 1

          return (
            <div key={journeys[0].title} className={`relative shrink-0 pr-[4vw] ${isParallel ? 'w-[38vw]' : 'w-[34vw]'}`}>
              <JourneyDot journeys={journeys} className="journey-h-dot relative inline-flex" />
              <div className="journey-step-content mt-8">
                <JourneyStepLabel journeys={journeys} />
                {isParallel ? (
                  <div className="flex flex-col gap-4">
                    {journeys.map((journey) => (
                      <JourneyCard key={journey.title} journey={journey} />
                    ))}
                  </div>
                ) : (
                  <JourneyContent journey={journeys[0]} large={journeys[0].active} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
