import type { ISourceOptions } from '@tsparticles/engine'

// particles drawn along the paths of an svg; only the values that differ from the tsParticles defaults
export const polygonMaskParticles = (scale: number, density: number, url: string): ISourceOptions => ({
  fullScreen: { enable: false },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'bubble' },
    },
    modes: {
      bubble: { distance: 40, duration: 2, opacity: 8, size: 6 },
    },
  },
  particles: {
    color: { value: '#ffffff' },
    links: { enable: true, color: { value: '#ffffff' }, distance: 30, opacity: 0.4 },
    move: { enable: true, speed: 1, outModes: { default: 'bounce' } },
    number: { value: density },
    opacity: { value: { min: 0.05, max: 0.4 }, animation: { enable: true } },
    size: { value: 1 },
  },
  polygon: {
    draw: { enable: true, stroke: { color: '#fff', width: 0.3, opacity: 0.3 } },
    move: { radius: 10 },
    inline: { arrangement: 'equidistant' },
    scale,
    url,
    type: 'inline',
  },
})
