import React from 'react'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
return (
<main className="dashboard-grid">
<section style={{minHeight:0}}>{children}</section>
<aside className="card" style={{height:'calc(100vh - 32px)', overflow:'auto'}}>
<h3>Controls & Monitor</h3>
<div id="monitor"></div>
</aside>
</main>
)
}