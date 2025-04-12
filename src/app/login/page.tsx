import LoginForm from '@/components/LoginForm'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <LoginForm />
      </div>
    </Suspense>
  )
}