import { Link, NavLink } from "react-router-dom"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItem = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? "bg-orange-100 text-orange-900" : "text-orange-900 hover:bg-orange-100/70"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {label}
    </NavLink>
  )

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-orange-50/80 border-b border-orange-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold shadow">SR</div>
            <span className="font-semibold text-orange-900">Sri Raghavendra Swamy Matha</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItem("/", "Home")}
            {navItem("/seva-booking", "Seva Booking")}
            {navItem("/room-booking", "Room Booking")}
            {navItem("/history", "Booking History")}
            {navItem("/news", "News")}
            {navItem("/contact", "Contact")}
            {navItem("/login", "Login")}
          </nav>

          <button className="md:hidden p-2 rounded hover:bg-orange-100" onClick={() => setOpen(!open)}>
            <Menu className="text-orange-900" />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 grid gap-2">
            {navItem("/", "Home")}
            {navItem("/seva-booking", "Seva Booking")}
            {navItem("/room-booking", "Room Booking")}
            {navItem("/history", "Booking History")}
            {navItem("/news", "News")}
            {navItem("/contact", "Contact")}
            {navItem("/login", "Login")}
          </div>
        )}
      </div>
    </header>
  )
}
