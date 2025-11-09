import { NextResponse } from 'next/server'


export async function GET() {
// a very small route that returns an initial data snapshot
const data = { ok: true, timestamp: Date.now() }
return NextResponse.json(data)
}