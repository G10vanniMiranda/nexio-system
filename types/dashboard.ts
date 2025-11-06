// Interface de métricas de performance exibidas no gráfico
export interface Performance {
  conversions: number            // Total de conversões (soma do array de conversões)
  clicks: number                 // Total de cliques (exibido em K na UI)
  growth: number                 // Percentual de crescimento estimado
  labels: string[]               // Labels do eixo X (ex: horas)
  dataClicks: number[]           // Série de dados de cliques
  dataConv: number[]             // Série de dados de conversões
}

// Interface de Lead individual mostrado na tabela
export interface Lead {
  name: string                   // Nome completo do lead
  phone: string                  // Telefone formatado
  source: string                 // Origem (Facebook Ads, Google Ads, etc.)
  status: string                 // Status no funil (Novo, Qualificado...)
  date: string                   // Data/hora da captura formatada
}
