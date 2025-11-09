'use client'
import React from 'react'

export default function DataSpeedSlider({ speed, setSpeed }: { speed:number, setSpeed:(v:number)=>void }) {
  return (
    <div className="p-4 bg-slate-800/40 rounded-xl text-sm text-cyan-200 space-y-1">
      <label className="font-semibold">Update Interval</label>
      <input
        type="range"
        min={20}
        max={500}
        step={10}
        value={speed}
        onChange={(e)=>setSpeed(Number(e.target.value))}
        className="w-full accent-cyan-500"
      />
      <div>{speed} ms</div>
    </div>
  )
}
