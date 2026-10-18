import Section from '@/components/ui/Section'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import Certifications from '@/features/projects/Certifications'
import GithubRepositories from '@/features/projects/GithubRepositories'

export default function ProjectsSection() {
  return (
    <Section id="projects" label="Projects">
      <div className="p-16 flex justify-center text-primary-50 text-center">
        <AnimatedOnScroll className="text-3xl md:text-5xl mb-6 font-bold">Projects & Certifications</AnimatedOnScroll>
      </div>
      <div className="pb-12">
        <Certifications />
      </div>
      <div className="pb-16">
        <GithubRepositories />
      </div>
    </Section>
  )
}
