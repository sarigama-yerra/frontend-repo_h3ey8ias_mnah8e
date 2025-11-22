import { useEffect, useState } from "react"

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

export default function RoomBooking() {
  const [rooms, setRooms] = useState([])
  const [roomId, setRoomId] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState("")
  const token = localStorage.getItem("token") || ""

  useEffect(()=>{ fetch(`${API}/api/rooms`).then(r=>r.json()).then(setRooms) }, [])

  const submit = async (e) => {
    e.preventDefault(); setMessage("")
    if (!token) { setMessage("Please login to book."); return }
    try {
      const res = await fetch(`${API}/api/book/room`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ room_id: roomId, check_in: checkIn, check_out: checkOut, guests: Number(guests) })
      })
      if (!res.ok) throw new Error(await res.text())
      await res.json()
      setMessage("Room booked. Receipt will be in history.")
    } catch (e) { setMessage("Booking failed") }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-900">Room Booking</h1>
      <p className="text-orange-900/70 mb-6">Select room type and dates.</p>

      <div className="bg-white border border-orange-200 rounded-xl p-5 grid gap-4">
        <div className="grid gap-3">
          {rooms.length===0 && <p className="text-sm text-orange-900/70">No rooms listed yet.</p>}
          <select value={roomId} onChange={e=>setRoomId(e.target.value)} className="border border-orange-300 rounded-md px-3 py-2">
            <option value="">Select Room</option>
            {rooms.map(r => <option key={r.id} value={r.id}>{r.name} • ₹{r.price} • {r.capacity} guests</option>)}
          </select>
        </div>

        <form onSubmit={submit} className="grid gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-orange-900 mb-1">Check-in</label>
              <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} required className="w-full border border-orange-300 rounded-md px-3 py-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-900 mb-1">Check-out</label>
              <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} required className="w-full border border-orange-300 rounded-md px-3 py-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-900 mb-1">Guests</label>
              <input type="number" min={1} value={guests} onChange={e=>setGuests(e.target.value)} className="w-full border border-orange-300 rounded-md px-3 py-2"/>
            </div>
          </div>
          <button className="px-4 py-2 rounded-md bg-amber-600 text-white font-medium hover:bg-amber-700 w-full sm:w-auto" disabled={!roomId}>Book Room</button>
          {message && <p className="text-sm text-orange-900/80">{message}</p>}
        </form>
      </div>
    </main>
  )
}
