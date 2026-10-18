import { Link } from 'react-router-dom'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import { profile } from '@/data/profile'

export default function HobbiesHighlights({ className }: { className: string }) {
  return (
    <div className={className}>
      <AnimatedOnScroll className="mb-6 font-bold text-xl md:text-3xl text-center">Highlights</AnimatedOnScroll>
      {profile.hobbies.highlights.map((highlight, index) => (
        <AnimatedOnScroll key={highlight.url}>
          <Link className="hover:text-primary-600 text-lg" to={highlight.url}>
            {index + 1}. {highlight.name}
          </Link>
        </AnimatedOnScroll>
      ))}
    </div>
  )
}
