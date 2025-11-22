import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import SevaBooking from "./pages/SevaBooking"
import RoomBooking from "./pages/RoomBooking"
import News from "./pages/News"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import History from "./pages/History"

function App() {
  return (
    <div className="min-h-screen bg-orange-50 text-orange-900 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seva-booking" element={<SevaBooking />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
