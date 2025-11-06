import { NextResponse } from 'next/server'

// Mock de leads simulando múltiplas origens e estados de funil
const sources = ['Facebook Ads', 'Google Ads', 'Orgânico', 'Parceria', 'Landing Page']
const statuses = ['Novo', 'Qualificado', 'Em Contato', 'Em Negociação', 'Convertido']

// Gera telefone aleatório simples
function randomPhone() {
  const ddd = Math.floor(10 + Math.random() * 89)
  const p1 = Math.floor(90000 + Math.random() * 9999)
  const p2 = Math.floor(1000 + Math.random() * 8999)
  return `(${ddd}) 9${p1}-${p2}`
}

const names = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Felipe', 'Giovana', 'Heitor', 'Isabela', 'João', 'Karla', 'Luiz', 'Marina', 'Nina', 'Otávio', 'Paula', 'Rafa', 'Sofia', 'Tiago', 'Vera']

// Combina nome + sobrenome aleatório
function randomName() {
  const first = names[Math.floor(Math.random() * names.length)]
  const last = names[Math.floor(Math.random() * names.length)]
  return `${first} ${last}`
}

export async function GET() {
  const now = new Date()
  const leads = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now)
    d.setMinutes(now.getMinutes() - i * (5 + Math.floor(Math.random() * 20)))
    return {
      name: randomName(),
      phone: randomPhone(),
      source: sources[Math.floor(Math.random() * sources.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: d.toLocaleString('pt-BR'),
    }
  })

  // Retorna lista de leads sem cache para efeito dinâmico
  return NextResponse.json(leads, { headers: { 'Cache-Control': 'no-store' } })
}
