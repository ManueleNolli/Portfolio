export enum Flavour {
  FRESH_AND_DELICATE = 'Fresh and delicate',
  BALANCED = 'Balanced',
  RICH_AND_FULL = 'Rich and full',
}

type LiqueurIngredient = {
  name: string
  imagePath: string
}

export type LiqueurProperty = {
  partToBeMacerated: string
  afterMacerationPercentage: number
  minIngredientPer100ml: number
  maxIngredientPer100ml: number
  ingredientWaterPercentage: number
  // shortest first: each option maps, in order, to a Flavour from fresh to rich
  macerationTime: string[]
  colors: {
    light: string
    medium: string
    strong: string
  }
}

type LiqueurPreset = {
  alcohol: number
  finalPercentage: number
  sugarContent: number
  macerationTime: string
}

export type Liqueur = {
  ingredient: LiqueurIngredient
  property: LiqueurProperty
  preset: LiqueurPreset
}

// basil and mint macerate to the same shades of green
const herbColors = { light: '#A8D5BA', medium: '#6B8E23', strong: '#556B2F' }

export const liqueurs: Liqueur[] = [
  {
    ingredient: {
      name: 'Lemon',
      imagePath: '/assets/mixology/lemon.png',
    },
    property: {
      partToBeMacerated: 'Zest',
      afterMacerationPercentage: 95,
      minIngredientPer100ml: 10,
      maxIngredientPer100ml: 30,
      ingredientWaterPercentage: 70,
      macerationTime: ['1 day', '2 days', '3 days'],
      colors: {
        light: '#FFF9C4',
        medium: '#FFEB3B',
        strong: '#FBC02D',
      },
    },
    preset: {
      alcohol: 250,
      finalPercentage: 25,
      sugarContent: 200,
      macerationTime: '2 days',
    },
  },
  {
    ingredient: {
      name: 'Basil',
      imagePath: '/assets/mixology/basil.png',
    },
    property: {
      partToBeMacerated: 'Leaves',
      afterMacerationPercentage: 95,
      minIngredientPer100ml: 5,
      maxIngredientPer100ml: 15,
      ingredientWaterPercentage: 70,
      macerationTime: ['12 hours', '24 hours', '36 hours'],
      colors: herbColors,
    },
    preset: {
      alcohol: 150,
      finalPercentage: 25,
      sugarContent: 200,
      macerationTime: '24 hours',
    },
  },
  {
    ingredient: {
      name: 'Mint',
      imagePath: '/assets/mixology/mint.png',
    },
    property: {
      partToBeMacerated: 'Leaves',
      afterMacerationPercentage: 95,
      minIngredientPer100ml: 10,
      maxIngredientPer100ml: 20,
      ingredientWaterPercentage: 70,
      macerationTime: ['12 hours', '24 hours', '36 hours'],
      colors: herbColors,
    },
    preset: {
      alcohol: 150,
      finalPercentage: 25,
      sugarContent: 200,
      macerationTime: '24 hours',
    },
  },
  {
    ingredient: {
      name: 'Peach',
      imagePath: '/assets/mixology/peach.png',
    },
    property: {
      partToBeMacerated: 'Fruit',
      afterMacerationPercentage: 100,
      minIngredientPer100ml: 50,
      maxIngredientPer100ml: 150,
      ingredientWaterPercentage: 88,
      macerationTime: ['3 days', '1 week', '2 weeks'],
      colors: {
        light: '#faeed9',
        medium: '#FFE5B4',
        strong: '#d2c186',
      },
    },
    preset: {
      alcohol: 300,
      finalPercentage: 25,
      sugarContent: 200,
      macerationTime: '1 week',
    },
  },
]
