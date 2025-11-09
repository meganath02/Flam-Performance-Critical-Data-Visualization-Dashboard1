'use client'
import React, { createContext, useContext, useRef, useState, useEffect } from 'react'
import type { DataPoint } from '../../lib/dataGenerator'


type Subscriber = (buf: Float32Array, timestamps: Float64Array) => void


const DataContext = createContext<any>(null)


export default function DataProvider({ initialData, children }: { initialData: DataPoint[]; children: React.ReactNode }) {
// sliding window size
const size = 20000
const valuesRef = useRef(new Float32Array(size))
const timestampsRef = useRef(new Float64Array(size))
const writeRef = useRef(0)
const subsRef = useRef<Set<Subscriber>>(new Set())


useEffect(() => {
// seed
if (initialData) {
for (let i = 0; i < initialData.length && i < size; i++) {
valuesRef.current[i] = initialData[i].value
timestampsRef.current[i] = initialData[i].timestamp
writeRef.current = i + 1
}
}
}, [initialData])


// API exposed to consumers
const api = {
push(point: DataPoint) {
const i = writeRef.current % size
valuesRef.current[i] = point.value
timestampsRef.current[i] = point.timestamp
writeRef.current += 1
// notify subscribers (lightweight) — we don't pass whole arrays when not needed
subsRef.current.forEach((s) => s(valuesRef.current, timestampsRef.current))
},
subscribe(cb: Subscriber) {
subsRef.current.add(cb)
return () => subsRef.current.delete(cb)
},
getBuffer() {
return { values: valuesRef.current, timestamps: timestampsRef.current, writeIndex: writeRef.current }
}
}


return <DataContext.Provider value={api}>{children}</DataContext.Provider>
}


export function useDataAPI() {
return useContext(DataContext)
}