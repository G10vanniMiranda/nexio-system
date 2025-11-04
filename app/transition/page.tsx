"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function TransitionPage() {
  const router = useRouter()

  useEffect(() => {
    // If not authenticated, go back to login
    try {
      if (localStorage.getItem('auth') !== '1') {
        router.replace('/login')
        return
      }
    } catch {}

    const swoosh = new Audio('/transition-sound.mp3')
    swoosh.volume = 0.25

    // Try to play immediately; if blocked, unlock on first user interaction
    const onInteract = async () => {
      try { await swoosh.play() } catch {}
      cleanupUnlock()
    }
    const attachUnlock = () => {
      window.addEventListener('pointerdown', onInteract, { once: true })
      window.addEventListener('keydown', onInteract, { once: true })
    }
    const cleanupUnlock = () => {
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('keydown', onInteract)
    }

    swoosh.play().catch(() => {
      attachUnlock()
    })

    const t = setTimeout(() => router.push('/dashboard'), 2500)
    return () => {
      clearTimeout(t)
      cleanupUnlock()
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="mx-auto mb-6 w-16 h-16 border-t-4 border-[#C8A048] border-solid rounded-full"
        />
        <p className="text-gray-300 tracking-widest">PREPARANDO SEU PAINEL...</p>
      </motion.div>
    </div>
  )
}
