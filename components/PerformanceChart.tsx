"use client"

import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import type { Performance } from '@/types/dashboard'

// Gráfico de performance (Cliques x Conversões) usando Chart.js
// Recebe o objeto de performance com labels e datasets
export default function PerformanceChart({ performance }: { performance: Performance }) {
    return (
        <div className="bg-[#111] p-6 rounded-2xl shadow-[0_0_15px_rgba(27,107,255,0.15)]">
            {/* KPIs rápidos acima do gráfico */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-4">
                <div>
                    <p className="text-3xl font-bold text-[#1B6BFF]">{performance.conversions}</p>
                    <p className="text-gray-400 text-sm">Conversões</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-[#C8A048]">{performance.clicks}K</p>
                    <p className="text-gray-400 text-sm">Cliques</p>
                </div>
                <div>
                    <p className="text-3xl font-bold">{performance.growth}%</p>
                    <p className="text-gray-400 text-sm">Crescimento</p>
                </div>
            </div>

            <Line
                data={{
                    labels: performance.labels,
                    datasets: [
                        {
                            label: 'Cliques',
                            data: performance.dataClicks,
                            borderColor: '#1B6BFF',
                            tension: 0.3,
                        },
                        {
                            label: 'Conversões',
                            data: performance.dataConv,
                            borderColor: '#C8A048',
                            tension: 0.3,
                        },
                    ],
                }}
                options={{
                    plugins: { legend: { labels: { color: '#fff' } } },
                    scales: {
                        x: { ticks: { color: '#888' }, grid: { color: '#222' } },
                        y: { ticks: { color: '#888' }, grid: { color: '#222' } },
                    },
                }}
            />
        </div>
    )
}
