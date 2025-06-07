import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MobileNavbar from "./navbar/MobileNavbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} flex h-screen`}>
      
      <div className="flex-1 overflow-auto">
        <div className="">
          {children}
          <MobileNavbar />
        </div>
      </div>
    </div>
  )
}