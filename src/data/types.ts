export type NamedLink = {
  name: string
  url: string
}

export type Journey = {
  kind: 'work' | 'education'
  title: string
  organizations: NamedLink[]
  period?: string
  active?: boolean
  share?: string
  highlights?: NamedLink[]
}

// an array groups activities done at the same time (e.g. work + study), rendered side by side on one timeline step
export type JourneyStep = Journey | Journey[]

export type Certification = {
  name: string
  url: string
  image: string
}

export type SocialName = 'GitHub' | 'LinkedIn' | 'Instagram'

export type Social = {
  name: SocialName
  url: string
}
