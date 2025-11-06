"use client"

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import SectionTitle from '@/components/SectionTitle'
import PerformanceChart from '@/components/PerformanceChart'
import LeadsTable from '@/components/LeadsTable'
import FeatureCard from '@/components/FeatureCard'
import Footer from '@/components/Footer'
import type { Performance, Lead } from '@/types/dashboard'
import { TrendingUp, Users, MessageCircle, Bot, BarChart3 } from 'lucide-react'

// Página principal do Dashboard
// - Busca dados das APIs mock (/api/performance e /api/leads)
// - Exibe gráficos, tabela e cards de features
// - Toca um áudio ambiente sutil ao abrir
export default function DashboardPage() {
    const router = useRouter()
    const [performance, setPerformance] = useState<Performance | null>(null)
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const ambientRef = useRef<HTMLAudioElement | null>(null)

    // Guarda simples no cliente (demo): se não estiver logado, redireciona para /login
    useEffect(() => {
        try {
            if (localStorage.getItem('auth') !== '1') {
                router.replace('/login')
            }
        } catch { }
    }, [router])

    useEffect(() => {
        // Função para buscar dados do backend (mock)
        async function fetchData() {
            const perfRes = await fetch('/api/performance')
            const leadsRes = await fetch('/api/leads')
            setPerformance(await perfRes.json())
            setLeads(await leadsRes.json())
        }
        fetchData()
        // Atualiza automaticamente a cada 60s
        const interval = setInterval(fetchData, 60000)

        // Áudio ambiente sutil ao abrir (loop baixo)
        if (typeof Audio !== 'undefined') {
            ambientRef.current = new Audio('/ambient-loop.mp3')
            ambientRef.current.loop = true
            ambientRef.current.volume = 0.01
            ambientRef.current.play().catch(() => {
                // Se o autoplay for bloqueado, destrava no primeiro gesto do usuário
                const unlock = async () => {
                    try { await ambientRef.current?.play() } catch { }
                    window.removeEventListener('pointerdown', unlock)
                    window.removeEventListener('keydown', unlock)
                }
                window.addEventListener('pointerdown', unlock)
                window.addEventListener('keydown', unlock)
            })
        }

        // Atraso suave para esconder a tela de carregamento
        const t = setTimeout(() => setLoading(false), 1200)

        return () => {
            clearInterval(interval)
            clearTimeout(t)
            if (ambientRef.current) {
                ambientRef.current.pause()
                ambientRef.current = null
            }
        }
    }, [])

    // Estado de carregamento inicial
    if (loading || !performance) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-[Outfit]"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="w-16 h-16 border-t-4 border-[#1B6BFF] border-solid rounded-full mb-6"
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="text-gray-400 tracking-widest"
                >
                    CARREGANDO DADOS DO SISTEMA...
                </motion.p>
            </motion.div>
        )
    }

    // Conteúdo principal do dashboard
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0A0A0A] text-white font-[Outfit]">
            <div className="pointer-events-none absolute inset-0 opacity-80 mask-[radial-gradient(closest-side,black,transparent)] bg-[radial-gradient(1000px_500px_at_20%_0%,rgba(27,107,255,0.18),transparent),radial-gradient(800px_400px_at_85%_10%,rgba(200,160,72,0.14),transparent)]" />
            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
                <Header name="Vini" />

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Painel de Performance Inteligente</h1>
                    <p className="text-gray-400 mb-6">Aqui está o desempenho do seu sistema automatizado.</p>

                    <div className="border-t border-gray-800 my-6"></div>

                    <SectionTitle icon={<TrendingUp size={20} />} title="Resultados em Tempo Real" subtitle="Atualização automática do seu domínio NEXIO." />
                    <PerformanceChart performance={performance} />

                    <div className="mt-10">
                        <SectionTitle icon={<Users size={20} />} title="Leads Capturados" />
                        <LeadsTable leads={leads} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        {[
                            { icon: <MessageCircle size={32} />, title: 'WhatsappIA', text: 'Suporte artificial: Na minutos' },
                            { icon: <Bot size={32} />, title: 'IA Ativa', text: 'Monitorando leads e conversões' },
                            { icon: <BarChart3 size={32} />, title: 'Relatórios Atualizados', text: 'Atualização naturalizada a cada 10 minutos' },
                        ].map((card, i) => (
                            <FeatureCard key={i} icon={<span className="text-[#C8A048]">{card.icon}</span>} title={card.title} text={card.text} />
                        ))}
                    </div>

                    <Footer />
                </motion.section>
            </div>
        </div>
    )
}
