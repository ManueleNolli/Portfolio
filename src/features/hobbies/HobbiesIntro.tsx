import Section from '@/components/ui/Section'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import HobbiesHighlights from '@/features/hobbies/HobbiesHighlights'
import { profile } from '@/data/profile'

export default function HobbiesIntro() {
  return (
    <Section id="introduction" label="Introduction" className="text-primary-50 flex md:flex-row flex-col min-h-svh">
      <div className="flex items-center justify-center flex-col w-full">
        <AnimatedOnScroll className="mb-6 font-bold text-3xl md:text-5xl">Hobbies Introduction</AnimatedOnScroll>
        <AnimatedOnScroll className="w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl md:max-w-[40%]">
          {profile.hobbies.description}
        </AnimatedOnScroll>
        <HobbiesHighlights className="mt-36" />
      </div>
    </Section>
  )
}
