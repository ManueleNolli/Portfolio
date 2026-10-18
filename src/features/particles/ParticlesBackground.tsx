import React, { useContext } from 'react'
import Particles from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'
import './particles.css'
import { ParticlesContext } from '@/features/particles/particlesContext'

export type ParticlesBackgroundProps = {
  children: React.ReactNode
  options: ISourceOptions
  id: string
}

export default function ParticlesBackground({ children, options, id }: ParticlesBackgroundProps) {
  const { init } = useContext(ParticlesContext)

  return (
    <div style={{ position: 'relative' }}>
      {init && <Particles className="particlesBackground" options={options} id={id} />}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
