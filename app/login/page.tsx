"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import gsap from 'gsap'

/* ===== ESTILOS GERAIS ===== */
const Wrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  position: relative;
`

const Card = styled(motion.div)`
  width: 400px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 50px 40px;
  text-align: center;
  box-shadow: 0 0 40px rgba(27, 107, 255, 0.1);
  backdrop-filter: blur(12px);
  z-index: 5;
`

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  padding: 14px;
  margin-bottom: 16px;
  font-size: 15px;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-color: #1b6bff;
    box-shadow: 0 0 20px rgba(27, 107, 255, 0.4);
  }
`

const Button = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #1b6bff, #c88a2a);
  border: none;
  border-radius: 12px;
  color: #fff;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 0 30px rgba(200, 138, 42, 0.25);
  transition: 0.3s;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 50px rgba(27, 107, 255, 0.4);
  }
`

/* ===== FUNDO ENERGÉTICO ===== */
function EnergyField() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) * 100
      const y = (e.clientY / innerHeight) * 100
      gsap.to(el, {
        background: `radial-gradient(circle at ${x}% ${y}%, rgba(27,107,255,0.25), rgba(200,138,42,0.15), rgba(0,0,0,1))`,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        filter: 'blur(60px)',
        transition: 'background 0.3s ease',
      }}
    />
  )
}

/* ===== PARTÍCULAS ===== */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    type Particle = { x: number; y: number; r: number; dx: number; dy: number; color: string }
    const particles: Particle[] = []
    const num = 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < num; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        color: Math.random() > 0.5 ? '#1B6BFF' : '#C88A2A',
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      requestAnimationFrame(draw)
    }
    draw()
  }, [])
  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}

/* ===== LOGIN PAGE ===== */
export default function LoginPage() {
  const [phase, setPhase] = useState<'loading' | 'form'>('loading')
  const logoRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Boot sound (use existing asset)
    const boot = new Audio('/startup-sound.mp3')
    boot.volume = 0.4
    boot.play().catch(() => {})

    // Animação de pulsos no logo
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(logoRef.current, {
      textShadow:
        '0 0 25px rgba(27,107,255,0.7), 0 0 45px rgba(200,138,42,0.6), 0 0 90px rgba(27,107,255,0.3)',
      scale: 1.05,
      duration: 2,
      ease: 'power2.inOut',
    }).to(logoRef.current, {
      textShadow:
        '0 0 15px rgba(200,138,42,0.5), 0 0 25px rgba(27,107,255,0.4), 0 0 60px rgba(200,138,42,0.2)',
      scale: 1,
      duration: 2,
      ease: 'power2.inOut',
    })

    const t = setTimeout(() => {
      tl.kill()
      setPhase('form')
    }, 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <Wrapper>
      <EnergyField />
      <Particles />

      {phase === 'loading' && (
        <motion.h1
          ref={logoRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            fontSize: '62px',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #1B6BFF, #C88A2A, #1B6BFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '5px',
          }}
        >
          NEXIO SYSTEM
        </motion.h1>
      )}

      {phase === 'form' && (
        <Card
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '22px',
              color: '#C88A2A',
              marginBottom: '8px',
              letterSpacing: '2px',
            }}
          >
            Inteligência Conectada
          </motion.h2>
          <p style={{ color: '#aaa', marginBottom: 30, fontSize: 15 }}>
            Acesse o ecossistema NEXIO com autenticação segura e performance em tempo real.
          </p>

          <Input type="email" placeholder="E-mail corporativo" />
          <Input type="password" placeholder="Senha" />
          <Button
            onClick={() => {
              const click = new Audio('/startup-sound.mp3')
              click.volume = 0.4
              click.play().catch(() => {})
              try { localStorage.setItem('auth', '1') } catch {}
              // small delay to let the click sound start
              setTimeout(() => { window.location.href = '/dashboard' }, 700)
            }}
          >
            ENTRAR
          </Button>
        </Card>
      )}
    </Wrapper>
  )
}
