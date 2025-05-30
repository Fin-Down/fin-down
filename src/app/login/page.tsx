import LoginForm from '@/components/LoginForm'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="page">
        <LoginForm />
      </div>
    </Suspense>
  )
}