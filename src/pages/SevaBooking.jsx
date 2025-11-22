import { useEffect, useState } from "react"

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

export default function SevaBooking() {
  const [sevas, setSevas] = useState([])
  const [selected, setSelected] = useState("")
  const [date, setDate] = useState("")
  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState("")

  const token = localStorage.getItem("token") || ""

  useEffect(() => {
    fetch(`${API}/api/sevas`).then(r => r.json()).then(setSevas)
  }, [])

  const book = async (e) => {
    e.preventDefault()
    setMessage("")
    if (!token) { setMessage("Please login to book."); return }
    try {
      const res = await fetch(`${API}/api/book/seva`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ seva_id: selected, date, quantity: Number(qty) })
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setMessage(`Booked successfully. Receipt will be available in history.`)
    } catch (err) {
      setMessage("Booking failed")
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-900">Seva Booking</h1>
      <p className="text-orange-900/70 mb-6">Daily sevas with timings and cost.</p>

      <div className="bg-white border border-orange-200 rounded-xl p-5 grid gap-4">
        <div className="grid gap-3">
          {sevas.length === 0 && <p className="text-sm text-orange-900/70">No sevas listed yet.</p>}
          {sevas.map(s => (
            <label key={s.id} className={`flex items-center justify-between p-3 rounded-lg border ${selected===s.id? 'border-orange-500 bg-orange-50':'border-orange-200'}`}>
              <div>
                <p className="font-medium text-orange-900">{s.title}</p>
                <p className="text-sm text-orange-900/70">{s.time} • ₹{s.cost}</p>
              </div>
              <input type="radio" name="seva" value={s.id} checked={selected===s.id} onChange={(e)=>setSelected(e.target.value)} />
            </label>
          ))}
        </div>

        <form onSubmit={book} className="grid gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-orange-900 mb-1">Date</label>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} required className="w-full border border-orange-300 rounded-md px-3 py-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-900 mb-1">Quantity</label>
              <input type="number" min={1} value={qty} onChange={e=>setQty(e.target.value)} className="w-full border border-orange-300 rounded-md px-3 py-2"/>
            </div>
          </div>
          <button className="px-4 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-700 w-full sm:w-auto" disabled={!selected}>Book Seva</button>
          {message && <p className="text-sm text-orange-900/80">{message}</p>}
        </form>
      </div>
    </main>
  )
}
