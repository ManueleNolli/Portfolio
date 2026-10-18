import Section from '@/components/ui/Section'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import PolygonMaskParticles from '@/features/particles/PolygonMaskParticles'
import { profile } from '@/data/profile'

export default function AboutMe() {
  return (
    <Section id="aboutme" label="About Me" className="text-primary-50 flex md:flex-row flex-col min-h-svh">
      <div className="flex items-center justify-center flex-col w-full md:w-1/2 mt-8 md:mt-0">
        <AnimatedOnScroll className="mb-6 font-bold text-3xl md:text-5xl">About Me</AnimatedOnScroll>
        <AnimatedOnScroll className="w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl">{profile.aboutMe}</AnimatedOnScroll>
      </div>
      <div className="md:w-1/2 w-full h-[50vh] md:h-screen px-8 md:px-0">
        <PolygonMaskParticles url="/assets/coding.svg" id="particlesAboutMe" />
      </div>
    </Section>
  )
}
