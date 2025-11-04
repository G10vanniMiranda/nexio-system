"use client"

import { ReactNode } from 'react'

export default function SectionTitle({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle?: string }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-[#C8A048] flex items-center">{icon}</span> {title}
            </h2>
            {subtitle ? <p className="text-gray-400 mb-4">{subtitle}</p> : null}
        </div>
    )
}
