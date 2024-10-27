"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, type: 'login' })
    })

    if (!res.ok) {
      const { error } = await res.json()
      setError(error)
    } else {
      router.push('/profile')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ログイン</h2>
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
      <button onClick={handleLogin} className="btn-primary mt-6 w-full">
        ログイン
      </button>
    </div>
  )
}

export default LoginPage
