import { useState } from 'react'
import Section from '@/components/ui/Section'
import Divider from '@/components/ui/Divider'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import LiqueurPicker from '@/features/mixology/components/LiqueurPicker'
import LiqueursCalculator from '@/features/mixology/components/LiqueursCalculator'
import { liqueurs } from '@/features/mixology/data/liqueurs'

export default function MixologyPage() {
  const [selectedLiqueur, setSelectedLiqueur] = useState(liqueurs[0])

  return (
    <div className="overflow-hidden font-mono bg-primary-50 flex pt-[8vh] min-h-screen pb-4">
      <Section id="liqueurs" label="Liqueurs Calculator" className="mt-[2%] text-primary-600 flex w-full flex-col">
        <div className="w-full flex justify-center">
          <AnimatedOnScroll className="mb-6 font-bold text-3xl md:text-5xl">Liqueurs Calculator</AnimatedOnScroll>
        </div>

        <LiqueurPicker selected={selectedLiqueur} onSelect={setSelectedLiqueur} />

        <AnimatedOnScroll>
          <Divider className="my-8 md:my-4" />
        </AnimatedOnScroll>

        {/* keyed so the calculator state resets when another liqueur is picked */}
        <div key={selectedLiqueur.ingredient.name} className="flex w-full">
          <AnimatedOnScroll className="flex w-full" animationStart="top-bottom">
            <LiqueursCalculator liqueur={selectedLiqueur} />
          </AnimatedOnScroll>
        </div>

        <p className="text-primary-600 text-xs text-center mt-4 px-4">
          This page is intended for informational and educational purposes only. The production of alcohol may be subject to local laws and regulations depending
          on your country or region. Before attempting any recipe or method described here, please ensure that you are complying with all applicable laws regarding
          the production, possession, and consumption of alcohol. The authors and maintainers of this content do not assume any responsibility for the use or misuse
          of this information.
        </p>
      </Section>
    </div>
  )
}
