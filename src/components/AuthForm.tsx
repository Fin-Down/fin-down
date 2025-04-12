'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AuthImage from '../../public/auth.png'

export default function AuthForm() {
  return (
    <div className="flex min-h-screen items-center justify-cente">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full min-w-72 bg-white flex flex-col items-center"
      >
        <div className="mb-0">
          <Image 
            src={AuthImage}
            alt="Логотип FinDown"
            width={280}
            height={280}
            className="w-60 mb-4 object-contain"
            priority
          />
        </div>
        
        <h2 className="text-4xl font-bold text-center text-black mb-20">FinDown</h2>
        
        <div className="w-full space-y-4">
          <Link href="/register" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black text-white py-2 px-2 rounded-3xl transition text-lg font-medium hover:bg-gray-800"
            >
              Регистрация
            </motion.button>
          </Link>
          
          <Link href="/login" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border-2 border-gray-400 text-gray-700 py-1.5 px-2 rounded-3xl hover:bg-gray-100 transition text-lg font-medium"
            >
              Вход
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}