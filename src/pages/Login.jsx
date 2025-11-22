import { useState } from "react"

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

export default function Login() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try {
      const endpoint = mode==='login'? '/api/auth/login' : '/api/auth/register'
      const body = mode==='login' ? { email, password } : { name, email, password, phone }
      const res = await fetch(`${API}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }))
      window.location.href = '/'
    } catch (e) { setError('Failed. Check details.') }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-900 mb-2">{mode==='login'? 'Login' : 'Create Account'}</h1>
      <p className="text-orange-900/70 mb-6">Use your email to {mode==='login'? 'access booking history' : 'book and view history'}.</p>
      <div className="bg-white border border-orange-200 rounded-xl p-5">
        <form onSubmit={submit} className="grid gap-3">
          {mode==='register' && (
            <input className="border border-orange-300 rounded-md px-3 py-2" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required />
          )}
          <input className="border border-orange-300 rounded-md px-3 py-2" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="border border-orange-300 rounded-md px-3 py-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {mode==='register' && (
            <input className="border border-orange-300 rounded-md px-3 py-2" placeholder="Phone (optional)" value={phone} onChange={e=>setPhone(e.target.value)} />
          )}
          <button className="px-4 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-700">{mode==='login'? 'Login' : 'Create Account'}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
        <button onClick={()=>setMode(mode==='login'?'register':'login')} className="mt-3 text-sm text-orange-900/80 underline">
          {mode==='login'? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </main>
  )
}
