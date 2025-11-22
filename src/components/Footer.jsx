export default function Footer() {
  return (
    <footer className="mt-16 border-t border-orange-200 bg-orange-50/60">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-orange-900/80 flex flex-col sm:flex-row gap-2 items-center justify-between">
        <p>© {new Date().getFullYear()} Sri Raghavendra Swamy Matha</p>
        <p>Minimal portal for sevas, rooms, news & contact</p>
      </div>
    </footer>
  )
}
