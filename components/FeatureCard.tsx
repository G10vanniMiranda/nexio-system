"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function FeatureCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111] p-6 rounded-2xl border border-[#1B1B1B] text-center shadow-[0_0_15px_rgba(27,107,255,0.15)] hover:shadow-[0_0_28px_rgba(200,160,72,0.35)] transition"
        >
            <div className="mb-3 text-[#C8A048] flex items-center justify-center">{icon}</div>
            <h4 className="text-lg font-semibold mb-1">{title}</h4>
            <p className="text-gray-400 text-sm">{text}</p>
        </motion.div>
    )
}
