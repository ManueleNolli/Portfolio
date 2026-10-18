import React from 'react'
import { Briefcase, GraduationCap, Newspaper } from 'lucide-react'
import { Journey, JourneyLink, JourneyStep } from '@/constants/config'

// shared building blocks of the vertical and horizontal journey timelines

export const toJourneys = (step: JourneyStep) => (Array.isArray(step) ? step : [step])

export function JourneyLinks({ links }: { links: JourneyLink[] }) {
  return links.map((link, index) => (
    <React.Fragment key={link.url}>
      {index > 0 && <span className="text-primary-300"> · </span>}
      <a href={link.url} target="_blank" rel="noreferrer" className="hover:text-primary-50 hover:underline">
        {link.name}
      </a>
    </React.Fragment>
  ))
}

export function JourneyDot({ journeys, className }: { journeys: Journey[]; className: string }) {
  const kinds = [...new Set(journeys.map((journey) => journey.kind))]
  const active = journeys.some((journey) => journey.active)

  return (
    <span
      className={`flex h-10 min-w-10 px-2.5 gap-1 items-center justify-center rounded-full ring-4 ring-primary-800
        ${active ? 'bg-primary-50 text-primary-800' : 'bg-primary-650 text-primary-100'} ${className}`}
    >
      {kinds.map((kind) => {
        const Icon = kind === 'work' ? Briefcase : GraduationCap
        return <Icon key={kind} size={18} className="shrink-0" />
      })}
    </span>
  )
}

// "Now" / "In parallel" label shown once per step, above its cards
export function JourneyStepLabel({ journeys }: { journeys: Journey[] }) {
  const active = journeys.some((journey) => journey.active)
  const isParallel = journeys.length > 1
  if (!active && !isParallel) return null

  return (
    <div className="flex items-center gap-3 mb-3 text-sm uppercase tracking-wider">
      {active && (
        <span className="inline-flex items-center gap-2 font-semibold text-green-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Now
        </span>
      )}
      {active && isParallel && <span className="text-primary-300">·</span>}
      {isParallel && <span className="text-primary-300">In parallel</span>}
    </div>
  )
}

export function JourneyContent({ journey, large }: { journey: Journey; large?: boolean }) {
  return (
    <>
      <h3 className={`font-bold leading-snug ${large ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
        {journey.title}
        {journey.share && (
          <span className="ml-3 align-middle rounded-full bg-primary-100 text-primary-800 px-2 py-0.5 text-sm font-semibold">{journey.share}</span>
        )}
      </h3>
      <div className="mt-1 text-primary-150 md:text-lg">
        <JourneyLinks links={journey.organizations} />
        {journey.period && <span className="text-primary-300"> · {journey.period}</span>}
      </div>
      {journey.highlights && (
        <div className="mt-3 flex flex-wrap gap-2">
          {journey.highlights.map((highlight) => (
            <a
              key={highlight.url}
              href={highlight.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-700 hover:bg-primary-600 px-3 py-1 text-sm text-primary-100"
            >
              <Newspaper size={14} className="shrink-0" />
              {highlight.name}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <div className="rounded-xl border border-primary-300/30 bg-primary-750/60 p-4 md:p-5">
      <JourneyContent journey={journey} />
    </div>
  )
}

export function JourneyEarly({ links }: { links: JourneyLink[] }) {
  return (
    <div className="flex flex-col gap-1 text-sm md:text-base text-primary-200">
      <span className="uppercase tracking-wider text-primary-300">Earlier</span>
      {links.map((early) => (
        <a key={early.url} href={early.url} target="_blank" rel="noreferrer" className="hover:text-primary-50 hover:underline">
          {early.name}
        </a>
      ))}
    </div>
  )
}
