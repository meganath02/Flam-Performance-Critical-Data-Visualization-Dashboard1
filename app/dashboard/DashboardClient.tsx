'use client'
import React, { useState } from 'react'
import LineChart from '../../components/charts/LineChart'
import { useDataStream } from '../../hooks/useDataStream'
import PerformanceMonitor from '../../components/ui/PerformanceMonitor'
import Navbar from '../../components/ui/Navbar'
import DataSpeedSlider from '../../components/controls/DataSpeedSlider'

export default function DashboardClient() {
  const [speed, setSpeed] = useState(100)
  useDataStream(speed)

  return (
    <div className="space-y-4">
      <Navbar title="🚀 Smart Analytics Dashboard" />
      <div className="grid md:grid-cols-[1fr_320px] gap-4">
        <LineChart />
        <div className="space-y-4">
          <PerformanceMonitor />
          <DataSpeedSlider speed={speed} setSpeed={setSpeed}/>
        </div>
      </div>
    </div>
  )
}
