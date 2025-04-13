"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CatLoadingImage from "../../public/loading.png";

export default function InitialLoading() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push("/auth");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative w-32 h-32 mx-auto"
        >
          <Image
            src={CatLoadingImage}
            alt="Loading"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <div className="items-center justify-center">
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            Подождите, пожалуйста
          </h1>
          <p className="mt-2 text-gray-500 text-center text-sm">
            Осталось разобрать ещё <br />
            {countdown} пачки с кормом
          </p>
        </div>
      </motion.div>
    </div>
  );
}
