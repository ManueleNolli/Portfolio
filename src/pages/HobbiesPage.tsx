import Divider from '@/components/ui/Divider'
import HobbiesIntro from '@/features/hobbies/HobbiesIntro'
import MixologyIntro from '@/features/hobbies/MixologyIntro'

export default function HobbiesPage() {
  return (
    <div className="max-w-max overflow-hidden font-mono bg-primary-800">
      <HobbiesIntro />
      <Divider />
      <MixologyIntro />
    </div>
  )
}
