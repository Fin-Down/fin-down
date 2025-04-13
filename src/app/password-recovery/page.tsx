
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function PasswordRecoveryPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="page">
        <PasswordRecoveryForm />
      </div>
    </Suspense>
  )
}