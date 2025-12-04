export interface Plan {
  id: number
  description: string
  price: number
  cycle: 'mensal' | 'anual'
  active: boolean
  external_id: string
  category: string
  descriptionText?: string
}

export interface ClinicPlan {
  idClinicPlan: number
  active: boolean
  plan: Plan
}
