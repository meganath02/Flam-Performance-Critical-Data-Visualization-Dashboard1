'use client'
import React, { useRef, useEffect, useCallback } from 'react'
import { useChartRenderer } from '../../hooks/useChartRenderer'
import { useDataAPI } from '../providers/DataProvider'

export default function LineChart({ height = 420 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const api = useDataAPI()

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const { values, writeIndex } = api.getBuffer()
    const len = values.length
    const N = Math.min(10000, writeIndex)
    if (N <= 2) return

    // clear background
    const w = canvas.width / devicePixelRatio
    const h = canvas.height / devicePixelRatio
    ctx.clearRect(0, 0, w, h)

    // draw subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'
    ctx.lineWidth = 1
    for (let x = 0; x < w; x += 80) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let y = 0; y < h; y += 60) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    // find min/max
    let min = Infinity
    let max = -Infinity
    for (let i = 0; i < N; i++) {
      const v = values[(writeIndex - 1 - i + len) % len]
      if (v < min) min = v
      if (v > max) max = v
    }

    // glowing line style
    const gradient = ctx.createLinearGradient(0, 0, w, 0)
    gradient.addColorStop(0, '#00ffff')
    gradient.addColorStop(0.5, '#0066ff')
    gradient.addColorStop(1, '#ff00ff')
    ctx.lineWidth = 2
    ctx.shadowBlur = 12
    ctx.shadowColor = '#00ffff'
    ctx.strokeStyle = gradient
    ctx.beginPath()

    for (let i = 0; i < N; i++) {
      const v = values[(writeIndex - 1 - i + len) % len]
      const x = w - (i / N) * w
      const y = h - ((v - min) / (max - min || 1)) * h
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // trailing glow fill
    const fade = ctx.createLinearGradient(0, 0, 0, h)
    fade.addColorStop(0, 'rgba(0,255,255,0.2)')
    fade.addColorStop(1, 'rgba(0,255,255,0)')
    ctx.fillStyle = fade
    ctx.lineTo(0, h)
    ctx.lineTo(w, h)
    ctx.closePath()
    ctx.fill()
  }, [api])

  useEffect(() => {
    const canvas = canvasRef.current!
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * dpr
    canvas.height = height * dpr
    canvas.style.width = '100%'
    canvas.style.height = `${height}px`
    ctxRef.current = canvas.getContext('2d')!
    ctxRef.current.scale(dpr, dpr)
  }, [height])

  useChartRenderer(draw)

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#0a0f1a] to-[#0f172a] p-4 shadow-lg">
      <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
    </div>
  )
}
