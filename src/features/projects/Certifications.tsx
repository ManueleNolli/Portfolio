import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'

export default function Certifications() {
  return (
    <AnimatedOnScroll animationStart="top-bottom">
      <div className="flex flex-wrap justify-center gap-4 mx-[5%]">
        {profile.certifications.map((certification) => (
          <a
            key={certification.name}
            href={certification.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-5 rounded-xl border border-primary-300/30 hover:border-primary-100/70 bg-primary-750/60 hover:bg-primary-700/60 py-4 pl-4 pr-8 w-full md:w-auto transition-colors"
          >
            <img src={certification.image} alt={certification.name} className="w-24 md:w-28 shrink-0 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-primary-50 font-semibold md:text-lg">{certification.name}</span>
              <span className="inline-flex items-center gap-1 text-primary-200 text-sm group-hover:text-primary-50">
                Verify on Credly <ArrowUpRight size={14} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </AnimatedOnScroll>
  )
}
