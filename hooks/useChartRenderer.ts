'use client'

import { useRef, useEffect } from 'react'

export function useChartRenderer(renderCallback: (t: number) => void) {
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let mounted = true

    function loop(now: number) {
      if (!mounted) return
      renderCallback(now)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      mounted = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [renderCallback])
}
