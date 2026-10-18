import { useState } from 'react'
import { Liqueur } from '@/features/mixology/data/liqueurs'
import {
  AlcoholConstants,
  computeFlavour,
  computeIngredient,
  computeIngredientRange,
  computeIntensity,
  computeSugar,
  computeTotalVolume,
  computeWater,
  LiqueurConstants,
  SugarConstants,
} from '@/features/mixology/lib/liqueurMath'

export type StepValue = {
  value: number
  label: string
}

export const stepOptions: StepValue[] = [
  { value: 0.1, label: 'Decimal (0.1)' },
  { value: 1, label: 'Integer (1)' },
]

export type NumberMetadata = {
  min: number
  max: number
  step: number
}

// Only the user inputs are state; volumes, sugar, water, intensity and flavour are derived from them on every render
export default function useLiqueursCalculator({ liqueur }: { liqueur: Liqueur }) {
  const { property, preset } = liqueur

  // Advanced settings
  const [step, setStep] = useState<StepValue>(stepOptions[1]) // Initial step is 1 (Integer)
  const [maxAlcohol, setMaxAlcohol] = useState(AlcoholConstants.MAX_VOLUME)
  const [alcoholPercentage, setAlcoholPercentage] = useState(AlcoholConstants.PERCENTAGE)
  const [maxSugarContent, setMaxSugarContent] = useState(SugarConstants.MAX_CONTENT)

  // Inputs
  const [alcohol, setAlcohol] = useState(preset.alcohol)
  const [finalPercentage, setFinalPercentage] = useState(preset.finalPercentage)
  const [sugarContent, setSugarContent] = useState(preset.sugarContent)
  const [macerationTime, setMacerationTime] = useState(preset.macerationTime)
  const [ingredient, setIngredient] = useState(() =>
    computeIngredient(preset.alcohol, (property.minIngredientPer100ml + property.maxIngredientPer100ml) / 2)
  )

  // Derived values
  const totalVolume = computeTotalVolume(property, alcoholPercentage, alcohol, ingredient, finalPercentage)
  const sugar = computeSugar(totalVolume, sugarContent)
  const water = computeWater(property, alcohol, totalVolume, sugar)
  const intensity = computeIntensity(property, alcohol, ingredient)
  const flavour = computeFlavour(property, macerationTime)

  const alcoholMetadata: NumberMetadata = { min: AlcoholConstants.MIN_VOLUME, max: maxAlcohol, step: step.value }
  const finalPercentageMetadata: NumberMetadata = { min: LiqueurConstants.MIN_PERCENTAGE, max: LiqueurConstants.MAX_PERCENTAGE, step: step.value }
  const sugarContentMetadata: NumberMetadata = { min: SugarConstants.MIN_CONTENT, max: maxSugarContent, step: step.value }
  const ingredientMetadata: NumberMetadata = { ...computeIngredientRange(property, alcohol), step: step.value }
  // the fullest bottle: max alcohol, least ingredient and lowest alcohol by volume
  const maxTotalVolume = computeTotalVolume(property, alcoholPercentage, maxAlcohol, ingredientMetadata.min, finalPercentageMetadata.min)

  // the ingredient follows the alcohol, keeping the same ratio
  const handleAlcoholChange = (value: number) => {
    setIngredient(ingredient * (value / alcohol))
    setAlcohol(value)
  }

  const handleStepChange = (label: string) => {
    const selectedStep = stepOptions.find((s) => s.label === label)
    if (selectedStep) setStep(selectedStep)
  }

  const handleMaxAlcoholChange = (value: number) => {
    if (value < alcoholMetadata.min) return
    setMaxAlcohol(value)
    if (alcohol > value) handleAlcoholChange(value)
  }

  const handleAlcoholPercentageChange = (value: number) => {
    if (value < AlcoholConstants.MIN_ALCOHOL_PERCENTAGE || value > AlcoholConstants.MAX_ALCOHOL_PERCENTAGE) return
    setAlcoholPercentage(value)
  }

  const handleMaxSugarContentChange = (value: number) => {
    if (value < sugarContentMetadata.min) return
    setMaxSugarContent(value)
    if (sugarContent > value) setSugarContent(value)
  }

  return {
    alcohol,
    alcoholMetadata,
    handleAlcoholChange,
    finalPercentage,
    finalPercentageMetadata,
    handleFinalPercentageChange: setFinalPercentage,
    sugarContent,
    sugarContentMetadata,
    handleSugarContentChange: setSugarContent,
    ingredient,
    ingredientMetadata,
    handleIngredientChange: setIngredient,
    sugar,
    water,
    totalVolume,
    maxTotalVolume,
    intensity,
    macerationTime,
    macerationTimeOptions: property.macerationTime,
    handleMacerationTimeChange: setMacerationTime,
    flavour,
    step,
    handleStepChange,
    maxAlcohol,
    handleMaxAlcoholChange,
    alcoholPercentage,
    handleAlcoholPercentageChange,
    maxSugarContent,
    handleMaxSugarContentChange,
  }
}
