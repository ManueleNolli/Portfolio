import { Link } from 'react-router-dom'
import Section from '@/components/ui/Section'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import PolygonMaskParticles from '@/features/particles/PolygonMaskParticles'

export default function MixologyIntro() {
  return (
    <Section id="mixology" label="Mixology" className="text-primary-50 flex md:flex-row flex-col min-h-svh">
      <div className="md:w-1/2 w-full h-[50vh] md:h-screen px-8 md:px-0">
        <PolygonMaskParticles url="/assets/cocktail.svg" id="particlesCocktail" />
      </div>
      <div className="flex items-center justify-center flex-col w-full md:w-1/2 mt-8 md:mt-0">
        <AnimatedOnScroll className="mb-6 font-bold text-3xl md:text-5xl">Mixology</AnimatedOnScroll>
        <AnimatedOnScroll className="w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl">
          Did you ever struggled to find the best recipe to an home-made <span className="italic text-yellow-400">limoncino</span>? Or what about a{' '}
          <span className="italic text-green-400">basilichello</span> and a <span className="italic text-green-600">mentolino</span>?
        </AnimatedOnScroll>

        <AnimatedOnScroll className="w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl mt-8">
          Here you can find my{' '}
          <Link className="font-extrabold hover:text-primary-600 italic" to="/hobbies/mixology">
            calculator
          </Link>{' '}
          with all the recipes to make your own home-made liqueurs. 🥃
        </AnimatedOnScroll>
      </div>
    </Section>
  )
}
