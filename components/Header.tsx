"use client"

import Image from 'next/image'

export default function Header({ name = 'Vini' }: { name?: string }) {
    return (
        <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
                <Image src="/logo-nexio.png" alt="NEXIO" width={120} height={32} />
            </div>
            <div className="flex items-center gap-3">
                <p className="text-gray-400">Olá, {name}</p>
                <Image src="/avatars/avatar.svg" alt="Avatar" width={40} height={40} className="rounded-full border border-[#C8A048]" />
            </div>
        </header>
    )
}
