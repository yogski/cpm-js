export type BasicCell = {
  name: string,
  value: number
}

export type WeightedIndicatorCell = {
  name: string,
  weight: number
}

export type ElementCell = {
  indicator: WeightedIndicatorCell,
  value: number,
  weightedValue: number,
  description?: string
}

export type ProfileCell = {
  id: string,
  elements: Array<ElementCell>,
  totalValue: number
}
