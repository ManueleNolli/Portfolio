import { Flavour, LiqueurProperty } from '@/features/mixology/data/liqueurs'

export const AlcoholConstants = {
  MIN_VOLUME: 10, // ml
  MAX_VOLUME: 1000,
  PERCENTAGE: 96,
  MIN_ALCOHOL_PERCENTAGE: 70,
  MAX_ALCOHOL_PERCENTAGE: 100,
}

export const SugarConstants = {
  CONVERSION_FACTOR: 0.625, // 1 g of sugar = 0.625 mL of sugar syrup
  MIN_CONTENT: 100, // total sugar content in g/L of total volume
  MAX_CONTENT: 300, // total sugar content in g/L of total volume
}

export const LiqueurConstants = {
  MIN_PERCENTAGE: 15, // 15% of alcohol
  MAX_PERCENTAGE: 45, // 45% of alcohol
}

export enum Intensity {
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

export const IntensityThresholdsPercentage = {
  LIGHT: 33,
  MEDIUM: 67,
}

export const computeSugarVolume = (sugar: number) => sugar * SugarConstants.CONVERSION_FACTOR // [g] * [mL/g] = [mL]

export const computeWaterInIngredient = (property: LiqueurProperty, ingredient: number) => ingredient * (property.ingredientWaterPercentage / 100) // [g] * [%] = [g]

export const computeMaceratedVolume = (property: LiqueurProperty, alcohol: number) => alcohol * (property.afterMacerationPercentage / 100) // [mL] * [%] = [mL]

export const computeTotalVolume = (
  property: LiqueurProperty,
  alcoholPercentage: number,
  alcohol: number,
  ingredient: number,
  finalPercentage: number
) =>
  (alcoholPercentage * (property.afterMacerationPercentage / 100) * alcohol * alcohol) /
  (finalPercentage * (alcohol + computeWaterInIngredient(property, ingredient)))

export const computeSugar = (totalVolume: number, sugarContent: number) => totalVolume * (sugarContent / 1000)

export const computeWater = (property: LiqueurProperty, alcohol: number, totalVolume: number, sugar: number) =>
  totalVolume - computeMaceratedVolume(property, alcohol) - computeSugarVolume(sugar)

// grams of ingredient for `alcohol` mL, given the grams per 100 mL
export const computeIngredient = (alcohol: number, ratioPer100ml: number) => ratioPer100ml * (alcohol / 100)

export const computeIngredientRange = (property: LiqueurProperty, alcohol: number) => ({
  min: computeIngredient(alcohol, property.minIngredientPer100ml),
  max: computeIngredient(alcohol, property.maxIngredientPer100ml),
})

export function computeIntensity(property: LiqueurProperty, alcohol: number, ingredient: number): Intensity {
  const ingredientAlcoholRatioPercentage = (ingredient / alcohol) * 100
  const { minIngredientPer100ml: min, maxIngredientPer100ml: max } = property
  const thresholdAt = (percentage: number) => min + ((max - min) * percentage) / 100

  if (ingredientAlcoholRatioPercentage < thresholdAt(IntensityThresholdsPercentage.LIGHT)) return Intensity.LIGHT
  if (ingredientAlcoholRatioPercentage < thresholdAt(IntensityThresholdsPercentage.MEDIUM)) return Intensity.MEDIUM
  return Intensity.STRONG
}

// maceration times are listed shortest first, matching the flavours from fresh to rich
export function computeFlavour(property: LiqueurProperty, macerationTime: string): Flavour {
  return Object.values(Flavour)[property.macerationTime.indexOf(macerationTime)] ?? Flavour.FRESH_AND_DELICATE
}

export function intensityColor(property: LiqueurProperty, intensity: Intensity): string {
  const colors = { [Intensity.LIGHT]: property.colors.light, [Intensity.MEDIUM]: property.colors.medium, [Intensity.STRONG]: property.colors.strong }
  return colors[intensity]
}
