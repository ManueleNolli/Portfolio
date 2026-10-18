import React, { useEffect, useState } from 'react'
import { ParticlesContext } from '@/context/particlesContext'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { loadPolygonMaskPlugin } from '@tsparticles/plugin-polygon-mask'

type ParticlesProviderProps = {
  children: React.ReactNode
}

export default function ParticlesProvider({ children }: ParticlesProviderProps) {
  const [particlesInit, setParticlesInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      await loadPolygonMaskPlugin(engine)
    }).then(() => {
      setParticlesInit(true)
    })
  }, [])

  return <ParticlesContext.Provider value={{ init: particlesInit }}>{children}</ParticlesContext.Provider>
}
