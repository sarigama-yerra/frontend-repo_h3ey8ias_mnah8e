import { useState } from "react"

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSent(res.ok)
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold text-orange-900 mb-2">Contact Us</h1>
        <p className="text-orange-900/70 mb-4">Reach out for enquiries regarding sevas, rooms, or general information.</p>
        <div className="bg-white border border-orange-200 rounded-xl p-5">
          <form onSubmit={submit} className="grid gap-3">
            <input className="border border-orange-300 rounded-md px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
            <input className="border border-orange-300 rounded-md px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            <input className="border border-orange-300 rounded-md px-3 py-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            <textarea className="border border-orange-300 rounded-md px-3 py-2" rows={4} placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
            <button className="px-4 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-700 w-full sm:w-auto">Send</button>
            {sent && <p className="text-sm text-green-700">Thank you. We will get back soon.</p>}
          </form>
        </div>
      </div>
      <div>
        <div className="bg-white border border-orange-200 rounded-xl overflow-hidden">
          <iframe title="Map" className="w-full h-[360px]" src="https://www.google.com/maps?q=Mantralayam&output=embed" allowFullScreen loading="lazy"></iframe>
        </div>
        <div className="mt-4 text-orange-900/80 text-sm">
          <p><span className="font-semibold">Address:</span> Sri Raghavendra Swamy Matha, Mantralayam</p>
          <p><span className="font-semibold">Phone:</span> +91 00000 00000</p>
          <p><span className="font-semibold">Email:</span> info@srsmatha.org</p>
        </div>
      </div>
    </main>
  )
}
