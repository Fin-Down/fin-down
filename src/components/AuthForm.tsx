"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import AuthImage from "../../public/auth.png";
import LeftImage from "../../public/left-header.png";
import RightImage from "../../public/right-header.png";

export default function AuthForm() {
  return (
    <div className="flex  items-center justify-center">
      <div className="w-full flex absolute top-0 left-0 right-0">
        <div className="w-25 h-25">
          <Image
            src={LeftImage}
            alt="Левый котик"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <div className="w-25 h-25 ml-auto">
          <Image
            src={RightImage}
            alt="Правый котик"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-72 bg-transparent flex flex-col items-center relative"
      >
        <div className="mt-24">
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
          <h2 className="text-4xl font-bold text-center text-black mb-20">
            FinDown
          </h2>
          <div className="w-full space-y-6">
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
        </div>
      </motion.div>
    </div>
  );
}
