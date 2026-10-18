import React, { useContext, useEffect, useState } from 'react'
import { Particles as TSParticles } from '@tsparticles/react'
import { ParticlesContext } from '@/context/particlesContext'
import './style.css'
import { polygonMaskParticles } from '@/constants/polygonMaskParticles'

export type ParticlesProps = {
  url: string
  id: string
}

export default function PolygonMaskParticles({ url, id }: ParticlesProps) {
  const { init } = useContext(ParticlesContext)
  const [options, setOptions] = useState(polygonMaskParticles(1, 200, url))

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setOptions(polygonMaskParticles(0.5, 100, url))
    }
  }, [url])

  // @ts-expect-error options type do not match but it works
  return <TSParticles className="particlesNormal" init={init} options={options} id={id} />
}
