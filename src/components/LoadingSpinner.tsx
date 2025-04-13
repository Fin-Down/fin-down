'use client'

import { motion } from 'framer-motion'
import LoadingImage from '../../public/loading.png'
import Image from 'next/image'
import { ImPointUp } from 'react-icons/im'

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear",
        }}
        className="relative w-24 h-24" 
      >
        <Image
          src={LoadingImage}
          alt="Loading"
          width={96}
          height={96}
          className="object-contain"
          priority
        />
      </motion.div>
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">Loading</h1>
    </motion.div>
  )
}