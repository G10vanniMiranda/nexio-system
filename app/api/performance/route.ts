import { NextResponse } from 'next/server'

// Endpoint de performance (mock)
// Em produção, substituir por fonte real (DB/serviço externo)
export async function GET() {
  const now = new Date()
  const hours = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now)
    d.setHours(now.getHours() - (11 - i))
    return `${d.getHours()}:00`
  })

  // Gera dados suavizados de exemplo
  const base = 50
  const clicks = hours.map((_, i) => Math.round(base + i * 8 + Math.sin(i / 2) * 6 + Math.random() * 5))
  const conv = clicks.map((c) => Math.round(c * (0.12 + Math.random() * 0.05)))

  const payload = {
    conversions: conv.reduce((a, b) => a + b, 0),
    clicks: Math.round(clicks.reduce((a, b) => a + b, 0) / 100) / 10, // shown as K on UI
    growth: 18 + Math.round(Math.random() * 10),
    labels: hours,
    dataClicks: clicks,
    dataConv: conv,
  }

  // Desabilita cache para sempre trazer dados "atuais" no demo
  return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } })
}
