
import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="page">
        <ForgotPasswordForm />
      </div>
    </Suspense>
  )
}