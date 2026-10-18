import { Link } from 'react-router-dom'
import { Image } from 'primereact/image'
import AnimatedText from '@/components/animation/AnimatedText'
import RotatingText from '@/components/animation/RotatingText'
import { profile } from '@/data/profile'

export default function Hero() {
  return (
    <div>
      <Image src="/assets/home.jpg" alt="Myself" imageClassName="h-svh w-screen object-cover object-[25%]" />
      <div className="absolute md:top-[40%] md:left-[40%] top-[60%] left-0 right-0 text-center">
        <AnimatedText className="font-bold leading-relaxed md:text-6xl text-4xl text-primary-650">{profile.name}</AnimatedText>
        <RotatingText className="md:text-4xl text-2xl text-primary-600" items={profile.jobs} />
      </div>
      <Link to="#aboutme">
        <Image
          src="/assets/arrow.png"
          alt="Scroll down"
          imageClassName="md:w-16 w-8 absolute animate-bounce bottom-10 mr-auto ml-auto left-0 right-0"
        />
      </Link>
    </div>
  )
}
