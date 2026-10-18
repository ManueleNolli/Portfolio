import type { ISourceOptions } from '@tsparticles/engine'

// only the values that differ from the tsParticles defaults
export const parallaxParticles: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: '#000' } },
  interactivity: {
    events: {
      onClick: { enable: true, mode: 'push' },
      onHover: { enable: true, mode: 'grab', parallax: { enable: true, force: 60 } },
    },
    modes: {
      grab: { distance: 400 },
    },
  },
  particles: {
    color: { value: '#ffffff' },
    links: { enable: true, color: { value: '#ffffff' }, distance: 150, opacity: 0.4 },
    move: { enable: true },
    number: { value: 100, density: { enable: true } },
    opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 3 } },
    size: { value: { min: 1, max: 10 }, animation: { enable: true, speed: 20 } },
  },
}
