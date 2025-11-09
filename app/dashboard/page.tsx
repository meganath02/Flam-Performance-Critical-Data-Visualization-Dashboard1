import React from 'react'
import DataProvider from '../../components/providers/DataProvider'
import DashboardClient from './DashboardClient'
import { generateInitialDataset } from '../../lib/dataGenerator'


export default async function Page() {
const initialData = generateInitialDataset(10000) // sync generator; small seed


// Render a client-only dashboard inside provider
return (
<DataProvider initialData={initialData}>
{/* DashboardClient is a client component (interactive) */}
<DashboardClient />
</DataProvider>
)
}