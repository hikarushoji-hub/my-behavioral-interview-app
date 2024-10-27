"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, type: 'signup' })
    })

    if (!res.ok) {
      const { error } = await res.json()
      setError(error)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">新規登録</h2>
      {error && <p className="text-orange-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input mt-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className="btn-primary mt-6 w-full">
        新規登録
      </button>
    </div>
  )
}

export default RegisterPage
