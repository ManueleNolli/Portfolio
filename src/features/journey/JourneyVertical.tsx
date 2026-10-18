import { JourneyStep } from '@/data/types'
import { profile } from '@/data/profile'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import { JourneyCard, JourneyContent, JourneyDot, JourneyEarly, JourneyStepLabel, toJourneys } from '@/features/journey/JourneyParts'

export default function JourneyVertical() {
  const renderStep = (step: JourneyStep) => {
    // concurrent activities share one dot and sit side by side, so the line stays a single continuous path
    const journeys = toJourneys(step)
    const isParallel = journeys.length > 1

    return (
      <li key={journeys[0].title} className="relative pl-14 pb-12">
        <JourneyDot journeys={journeys} className="absolute left-[-1px] -translate-x-1/2" />
        <AnimatedOnScroll animationStart="top-bottom">
          <JourneyStepLabel journeys={journeys} />
          {isParallel ? (
            <div className="grid md:grid-cols-2 gap-4">
              {journeys.map((journey) => (
                <JourneyCard key={journey.title} journey={journey} />
              ))}
            </div>
          ) : (
            <JourneyContent journey={journeys[0]} large={journeys[0].active} />
          )}
        </AnimatedOnScroll>
      </li>
    )
  }

  return (
    <div className="font-mono text-primary-50 px-6 py-16">
      <AnimatedOnScroll className="text-3xl md:text-5xl font-bold text-center mb-16">Journey</AnimatedOnScroll>

      {/* single continuous line, newest on top; the early steps fade out at the end of it */}
      <ol className="relative mx-auto max-w-4xl ml-5 md:mx-auto border-l-2 border-primary-300/40">
        {profile.journey.map((step) => renderStep(step))}

        <li className="relative pl-14">
          <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-primary-300/60" />
          <AnimatedOnScroll animationStart="top-bottom">
            <JourneyEarly links={profile.journeyEarly} />
          </AnimatedOnScroll>
        </li>
      </ol>
    </div>
  )
}
