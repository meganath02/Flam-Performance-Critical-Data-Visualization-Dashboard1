'use client'

import { useEffect, useRef } from 'react'
import type { DataPoint } from '../lib/dataGenerator'
import { useDataAPI } from '../components/providers/DataProvider'

export function useDataStream(interval = 100) {
  const api = useDataAPI()
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    // --- Try using Web Worker first ---
    try {
      workerRef.current = new Worker('/worker/dataWorker.js')
      workerRef.current.onmessage = (ev) => {
        const d: DataPoint = ev.data
        api.push(d)
      }
      workerRef.current.postMessage({ action: 'start', interval })
    } catch (e) {
      // --- Fallback: run generator on main thread ---
      let id = 0
      let running = true
      function loop() {
        if (!running) return
        const t = Date.now()
        const value =
          100 + Math.sin(t / 1000) * 5 + (Math.random() - 0.5) * 3
        api.push({ timestamp: t, value, id: id++ })
        setTimeout(loop, interval)
      }
      loop()
      return () => {
        running = false
      }
    }

    // --- Cleanup when component unmounts ---
    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ action: 'stop' })
        workerRef.current.terminate()
        workerRef.current = null
      }
    }
  }, [api, interval])
}
