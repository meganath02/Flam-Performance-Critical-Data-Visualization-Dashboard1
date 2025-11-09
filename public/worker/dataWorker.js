// Simple worker to emit synthetic points
let running = true
let id = 0
function tick(ms) {
if (!running) return
const t = Date.now()
const value = 100 + Math.sin(t / 1000) * 5 + (Math.random() - 0.5) * 3
postMessage({ timestamp: t, value, id: id++ })
setTimeout(() => tick(ms), ms)
}


self.onmessage = (e) => {
const { action, interval } = e.data || {}
if (action === 'start') {
running = true
tick(interval || 100)
}
if (action === 'stop') running = false
}