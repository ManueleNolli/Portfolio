import Divider from '@/components/ui/Divider'
import Hero from '@/features/home/Hero'
import AboutMe from '@/features/home/AboutMe'
import JourneySection from '@/features/journey/JourneySection'
import ProjectsSection from '@/features/projects/ProjectsSection'
import HobbiesTeaser from '@/features/hobbies/HobbiesTeaser'
import ContactSection from '@/features/contact/ContactSection'

export default function HomePage() {
  return (
    <div className="max-w-max overflow-hidden font-mono">
      <div className="bg-primary-800">
        <Hero />
        <AboutMe />
        <Divider />
        <JourneySection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <HobbiesTeaser />
      </div>
      <ContactSection />
    </div>
  )
}
