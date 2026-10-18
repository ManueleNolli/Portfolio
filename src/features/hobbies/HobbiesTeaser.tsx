import { Link } from 'react-router-dom'
import Section from '@/components/ui/Section'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import HobbiesHighlights from '@/features/hobbies/HobbiesHighlights'
import { profile } from '@/data/profile'

// home page preview of the hobbies page
export default function HobbiesTeaser() {
  return (
    <Section id="hobbies" label="Hobbies">
      <div className="flex items-center justify-center flex-col w-full text-primary-50 p-16">
        <AnimatedOnScroll className="mb-6 font-bold text-3xl md:text-5xl">
          <Link className="hover:text-primary-600" to="/hobbies">
            Hobbies
          </Link>
        </AnimatedOnScroll>
        <AnimatedOnScroll className="w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl md:max-w-[40%]">
          <Link className="hover:text-primary-600" to="/hobbies">
            {profile.hobbies.description}
          </Link>
        </AnimatedOnScroll>
        <HobbiesHighlights className="mt-24" />
      </div>
    </Section>
  )
}
