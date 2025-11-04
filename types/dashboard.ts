export interface Performance {
  conversions: number
  clicks: number
  growth: number
  labels: string[]
  dataClicks: number[]
  dataConv: number[]
}

export interface Lead {
  name: string
  phone: string
  source: string
  status: string
  date: string
}
