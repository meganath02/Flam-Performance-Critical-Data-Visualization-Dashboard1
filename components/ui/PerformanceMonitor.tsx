'use client'
import React, { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [mem, setMem] = useState('n/a')

  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let raf: number
    function loop(now: number) {
      frames++
      if (now - last >= 1000) {
        setFps(frames)
        frames = 0
        last = now
        const perf: any = performance
        if (perf.memory) {
          const usedMB = Math.round(perf.memory.usedJSHeapSize / 1024 / 1024)
          setMem(`${usedMB} MB`)
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-4 text-cyan-200 shadow-lg backdrop-blur-md">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        ⚙️ Performance Monitor
      </h3>
      <div className="space-y-1 text-sm">
        <div>FPS : <span className="font-bold text-cyan-400">{fps}</span></div>
        <div>Memory : <span className="font-bold text-cyan-400">{mem}</span></div>
      </div>
      <button
        onClick={() => location.reload()}
        className="mt-3 rounded-md bg-cyan-600 px-3 py-1 text-white hover:bg-cyan-500 transition"
      >
        🔄 Refresh
      </button>
    </div>
  )
}
