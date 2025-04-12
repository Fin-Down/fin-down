import RegisterForm from '@/components/RegisterForm'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <RegisterForm />
      </div>
    </Suspense>
  )
}