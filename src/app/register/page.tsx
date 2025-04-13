import RegisterForm from '@/components/RegisterForm'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="page">
        <RegisterForm />
      </div>
    </Suspense>
  )
}