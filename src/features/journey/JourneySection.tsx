import Section from '@/components/ui/Section'
import JourneyVertical from '@/features/journey/JourneyVertical'
import JourneyHorizontal from '@/features/journey/JourneyHorizontal'
import { config } from '@/config'

export default function JourneySection() {
  return (
    <Section id="journey" label="Journey">
      {config.journeyDesktopLayout === 'horizontal' ? (
        <>
          <div className="md:hidden">
            <JourneyVertical />
          </div>
          <div className="hidden md:block">
            <JourneyHorizontal />
          </div>
        </>
      ) : (
        <JourneyVertical />
      )}
    </Section>
  )
}
