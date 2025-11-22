import { useEffect, useState } from "react"

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

export default function History() {
  const [data, setData] = useState(null)
  const token = localStorage.getItem("token") || ""

  useEffect(()=>{
    if (!token) return
    fetch(`${API}/api/bookings`, { headers: { Authorization: `Bearer ${token}` }})
      .then(r=>r.json()).then(setData)
  }, [token])

  if (!token) {
    return <main className="max-w-3xl mx-auto px-4 py-8"><p className="text-orange-900">Please login to view your booking history.</p></main>
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-900 mb-4">Booking History</h1>
      {!data && <p className="text-orange-900/70">Loading...</p>}
      {data && (
        <div className="grid gap-6">
          <section>
            <h2 className="font-semibold text-orange-900 mb-2">Sevas</h2>
            <div className="grid gap-2">
              {data.sevas && data.sevas.length>0 ? data.sevas.map(s => (
                <div key={s.id} className="bg-white border border-orange-200 rounded-lg p-3 text-sm">
                  <p className="font-medium text-orange-900">Seva: {s.seva_id}</p>
                  <p className="text-orange-900/70">Date: {new Date(s.date).toLocaleDateString()} • Qty: {s.quantity} • Amount: ₹{s.amount}</p>
                </div>
              )) : <p className="text-orange-900/70">No seva bookings yet.</p>}
            </div>
          </section>
          <section>
            <h2 className="font-semibold text-orange-900 mb-2">Rooms</h2>
            <div className="grid gap-2">
              {data.rooms && data.rooms.length>0 ? data.rooms.map(r => (
                <div key={r.id} className="bg-white border border-orange-200 rounded-lg p-3 text-sm">
                  <p className="font-medium text-orange-900">Room: {r.room_id}</p>
                  <p className="text-orange-900/70">{new Date(r.check_in).toLocaleDateString()} → {new Date(r.check_out).toLocaleDateString()} • Guests: {r.guests} • Amount: ₹{r.amount}</p>
                </div>
              )) : <p className="text-orange-900/70">No room bookings yet.</p>}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
