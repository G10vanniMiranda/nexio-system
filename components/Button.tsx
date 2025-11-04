"use client"

import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
    const base =
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C8A048]/60 ring-offset-[#0A0A0A]'

    const variants = {
        primary:
            'bg-[#1B1B1B] text-white border border-[#2A2A2A] shadow-[0_0_10px_rgba(27,107,255,0.12)] hover:text-black hover:bg-[#C8A048] hover:border-[#C8A048] hover:shadow-[0_0_20px_rgba(200,160,72,0.55)]',
        ghost:
            'bg-transparent text-[#C8A048] border border-transparent hover:border-[#C8A048] hover:shadow-[0_0_20px_rgba(200,160,72,0.55)]',
    }

    return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
