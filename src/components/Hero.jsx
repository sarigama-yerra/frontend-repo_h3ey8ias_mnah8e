export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,88,12,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.12),transparent_35%)]" />
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20 grid lg:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-orange-900">
            Sri Raghavendra Swamy Matha
          </h1>
          <p className="mt-4 text-orange-900/80 text-lg">
            A simple, elegant portal for daily sevas, room booking, temple news, and essential information.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/seva-booking" className="px-5 py-3 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-700">Seva Booking</a>
            <a href="/room-booking" className="px-5 py-3 rounded-md bg-amber-500 text-white font-medium hover:bg-amber-600">Room Booking</a>
            <a href="/news" className="px-5 py-3 rounded-md bg-orange-100 text-orange-900 font-medium hover:bg-orange-200">Latest News</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-200 to-orange-100 border border-amber-300 shadow-inner overflow-hidden">
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop" alt="Temple" className="w-full h-full object-cover opacity-90" />
          </div>
        </div>
      </div>
    </section>
  )
}
