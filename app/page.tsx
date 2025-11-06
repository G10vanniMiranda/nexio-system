import { redirect } from 'next/navigation'

// Página raiz apenas redireciona para o dashboard
export default function Home() {
  redirect('/dashboard')
}
