import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmailValiidation from '@/components/EmaiilVerifiicationForm'

export default function EmailValiidationPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="page">
        <EmailValiidation />
      </div>
    </Suspense>
  )
}