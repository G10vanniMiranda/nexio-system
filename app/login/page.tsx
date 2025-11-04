"use client"

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const bgAudioRef = useRef<HTMLAudioElement | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ambient loop on login screen
    if (typeof Audio !== 'undefined') {
      bgAudioRef.current = new Audio('/ambient-loop.mp3')
      bgAudioRef.current.loop = true
      bgAudioRef.current.volume = 0.05 // sutil
      bgAudioRef.current.play().catch(() => {})
    }
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause()
        bgAudioRef.current = null
      }
    }
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)

    const ok = email.trim().toLowerCase() === 'admin@teste.com' && password === '123123'
    if (!ok) {
      setError('Credenciais inválidas. Verifique seu email e senha.')
      setSubmitting(false)
      return
    }

    // Startup sound on click
    try {
      const startupAudio = new Audio('/startup-sound.mp3')
      startupAudio.volume = 0.3
      await startupAudio.play()
    } catch {}

    // Mark session (simple client-side) and go to transition
    try {
      localStorage.setItem('auth', '1')
    } catch {}
    setTimeout(() => router.push('/transition'), 3000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0A0A] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-80 mask-[radial-gradient(closest-side,black,transparent)] bg-[radial-gradient(900px_420px_at_20%_0%,rgba(27,107,255,0.18),transparent),radial-gradient(700px_360px_at_85%_10%,rgba(200,160,72,0.14),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <Image src="/logo-nexio.png" alt="NEXIO" width={120} height={32} />
            <span className="text-lg tracking-wide text-gray-300">KHVIER</span>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-semibold mb-3">Bem-vindo ao NEXIO SYSTEM</h1>
            <p className="text-gray-400 mb-8">Acesse seu painel inteligente com segurança.</p>

            <form onSubmit={handleLogin} className="bg-[#111] p-6 rounded-2xl shadow-[0_0_15px_rgba(27,107,255,0.15)] border border-[#1B1B1B]">
              <label className="block text-sm text-gray-400 mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 rounded-xl bg-[#0E0E0E] border border-[#262626] px-4 py-3 outline-none focus:border-[#C8A048]"
                placeholder="voce@nexio.com"
              />
              <label className="block text-sm text-gray-400 mb-2" htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-6 rounded-xl bg-[#0E0E0E] border border-[#262626] px-4 py-3 outline-none focus:border-[#C8A048]"
                placeholder="••••••••"
              />
              {error ? (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              ) : null}
              <Button type="submit" disabled={submitting} className="w-full h-12">
                {submitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:block"
          >
            <div className="bg-[#111] rounded-2xl p-8 border border-[#1B1B1B] shadow-[0_0_15px_rgba(27,107,255,0.15)]">
              <h3 className="text-xl font-semibold mb-2">Experiência Premium</h3>
              <p className="text-gray-400">Design dark moderno com acentos dourados e azuis, responsivo e com animações sutis.</p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
