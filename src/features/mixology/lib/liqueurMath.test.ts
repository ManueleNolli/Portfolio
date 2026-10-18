import { describe, expect, it } from 'vitest'
import { Flavour, liqueurs } from '@/features/mixology/data/liqueurs'
import {
  computeFlavour,
  computeIngredient,
  computeIngredientRange,
  computeIntensity,
  computeSugar,
  computeSugarVolume,
  computeTotalVolume,
  computeWater,
  Intensity,
  intensityColor,
} from '@/features/mixology/lib/liqueurMath'

const liqueur = (name: string) => liqueurs.find((l) => l.ingredient.name === name)!.property
const lemon = liqueur('Lemon')
const peach = liqueur('Peach')

describe('volumes', () => {
  it('computes the lemon preset recipe', () => {
    // 250 mL at 96%, 50 g of zest (70% water), 25% ABV, 200 g/L of sugar
    const totalVolume = computeTotalVolume(lemon, 96, 250, 50, 25)
    expect(totalVolume).toBeCloseTo(800)

    const sugar = computeSugar(totalVolume, 200)
    expect(sugar).toBeCloseTo(160)
    expect(computeSugarVolume(sugar)).toBeCloseTo(100)

    // 800 - 237.5 macerated alcohol (95%) - 100 sugar syrup
    expect(computeWater(lemon, 250, totalVolume, sugar)).toBeCloseTo(462.5)
  })

  it('computes the peach preset recipe', () => {
    const totalVolume = computeTotalVolume(peach, 96, 300, 300, 25)
    expect(totalVolume).toBeCloseTo(612.77, 2)
    expect(computeSugar(totalVolume, 200)).toBeCloseTo(122.55, 2)
  })

  it('needs more water to reach a lower alcohol by volume', () => {
    expect(computeTotalVolume(lemon, 96, 250, 50, 15)).toBeGreaterThan(computeTotalVolume(lemon, 96, 250, 50, 25))
  })
})

describe('ingredient', () => {
  it('scales the per-100 mL ratio with the alcohol', () => {
    expect(computeIngredient(250, 20)).toBe(50)
    expect(computeIngredientRange(lemon, 250)).toEqual({ min: 25, max: 75 })
  })
})

describe('computeIntensity', () => {
  // lemon: 10-30 g per 100 mL, thresholds at 33% and 67% of the range -> 16.6 and 23.4
  it.each([
    [16, Intensity.LIGHT],
    [17, Intensity.MEDIUM],
    [23, Intensity.MEDIUM],
    [24, Intensity.STRONG],
  ])('%d g per 100 mL is %s', (ingredient, expected) => {
    expect(computeIntensity(lemon, 100, ingredient)).toBe(expected)
  })
})

describe('computeFlavour', () => {
  it('maps the maceration times in order', () => {
    expect(lemon.macerationTime.map((time) => computeFlavour(lemon, time))).toEqual([
      Flavour.FRESH_AND_DELICATE,
      Flavour.BALANCED,
      Flavour.RICH_AND_FULL,
    ])
  })

  it('falls back to fresh for an unknown time', () => {
    expect(computeFlavour(peach, '1 year')).toBe(Flavour.FRESH_AND_DELICATE)
  })

  it('has one flavour per maceration time for every liqueur', () => {
    for (const { property } of liqueurs) {
      expect(property.macerationTime).toHaveLength(Object.values(Flavour).length)
    }
  })
})

describe('intensityColor', () => {
  it('picks the shade matching the intensity', () => {
    expect(intensityColor(lemon, Intensity.LIGHT)).toBe(lemon.colors.light)
    expect(intensityColor(lemon, Intensity.STRONG)).toBe(lemon.colors.strong)
  })
})
