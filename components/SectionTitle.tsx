"use client"

import { ReactNode } from 'react'

// Componente de título de seção reutilizável
// Props:
// - icon: Ícone exibido à esquerda (ReactNode)
// - title: Título principal da seção
// - subtitle (opcional): Texto secundário abaixo do título
export default function SectionTitle({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle?: string }) {
    return (
        <div>
            {/* Linha de título com ícone e texto */}
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-[#C8A048] flex items-center">{icon}</span> {title}
            </h2>
            {/* Renderiza subtítulo somente se for passado */}
            {subtitle ? <p className="text-gray-400 mb-4">{subtitle}</p> : null}
        </div>
    )
}
