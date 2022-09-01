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

export type CSFConfig = {
  type : CSFInputType
}

export enum CSFInputType {
  RAW = "raw",          // raw text
  JSON = "json",      // tabulated data in JSON format
  MANUAL = "manual"     // manually inserted name and value
}

export type CSFCell = Array<WeightedIndicatorCell>

export type ProfileInput = Array<BasicCell>