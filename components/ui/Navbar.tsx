'use client'
import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Navbar({ title }: { title: string }) {
  const [dark, setDark] = useState(true)

  function toggleTheme() {
    const html = document.documentElement
    setDark(!dark)
    html.classList.toggle('dark')
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-800/40 to-blue-900/40
                    backdrop-blur-md border border-cyan-600/20 shadow-lg text-cyan-100">
      <h1 className="text-xl font-semibold tracking-wide flex items-center gap-2">
        <span className="inline-block w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></span>
        {title}
      </h1>
      <button onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-cyan-600/30 transition">
        {dark ? <Sun size={18}/> : <Moon size={18}/>}
      </button>
    </nav>
  )
}
