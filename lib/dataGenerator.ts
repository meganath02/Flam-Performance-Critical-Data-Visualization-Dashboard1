export interface DataPoint {
timestamp: number
value: number
id?: number
}


export function generateInitialDataset(n = 10000, start = Date.now() - n * 100) {
const out: DataPoint[] = new Array(n)
let t = start
let v = 100
for (let i = 0; i < n; i++) {
v += (Math.sin(i / 50) * 2 + (Math.random() - 0.5) * 4)
out[i] = { timestamp: t, value: v, id: i }
t += 100 // 100ms spacing
}
return out
}