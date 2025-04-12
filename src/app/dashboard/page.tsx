import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </div>
      </div>
    </Suspense>
  )
}