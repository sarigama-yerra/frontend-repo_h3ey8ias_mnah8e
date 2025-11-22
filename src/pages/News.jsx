import { useEffect, useState } from "react"

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

export default function News() {
  const [news, setNews] = useState([])

  useEffect(()=>{ fetch(`${API}/api/news`).then(r=>r.json()).then(setNews) }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-900 mb-2">News & Announcements</h1>
      <p className="text-orange-900/70 mb-6">Temple updates and festival announcements.</p>

      <div className="grid gap-4">
        {news.length===0 && <p className="text-sm text-orange-900/70">No announcements yet.</p>}
        {news.map(n => (
          <article key={n.id} className="bg-white border border-orange-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-orange-900">{n.title}</h2>
            <p className="text-xs text-orange-900/60 mb-2">{new Date(n.published_on).toLocaleDateString()}</p>
            <p className="text-orange-900/80">{n.content}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
