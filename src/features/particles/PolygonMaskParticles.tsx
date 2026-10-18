import { useContext, useMemo } from 'react'
import Particles from '@tsparticles/react'
import './particles.css'
import { ParticlesContext } from '@/features/particles/particlesContext'
import { polygonMaskParticles } from '@/features/particles/presets/polygonMask'
import { MOBILE_MAX_WIDTH } from '@/config'

export type PolygonMaskParticlesProps = {
  url: string
  id: string
}

export default function PolygonMaskParticles({ url, id }: PolygonMaskParticlesProps) {
  const { init } = useContext(ParticlesContext)
  // smaller and sparser on mobile, decided once on mount
  const options = useMemo(
    () => (window.innerWidth <= MOBILE_MAX_WIDTH ? polygonMaskParticles(0.5, 100, url) : polygonMaskParticles(1, 200, url)),
    [url]
  )

  return init ? <Particles className="particlesNormal" options={options} id={id} /> : null
}
