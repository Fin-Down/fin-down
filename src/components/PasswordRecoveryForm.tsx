"use client";
import Image from "next/image";
import RightImage from "../../public/login-header.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import OrCenter from "./ui/Or";

const PasswordRecovery = z
  .object({
    password: z.string().min(8, "Паролю нужно минимум 6 буковок..."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Парольчики не идентичны((",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      PasswordRecovery.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/login");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full flex absolute top-0 right-0">
        <div className="w-25 h-25 ml-auto">
          <Image
            src={RightImage}
            alt="Левый котик"
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
        className="w-72 flex flex-col items-center z-10" 
      >
        <h2 className="w-full text-3xl font-bold text-left text-black mb-4">
          Придумайте новый пароль
        </h2>
        <p className="w-full mb-12 text-gray-500 text-sm text-left">
          На колени на колени
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="Новый пароль"
              maxLength={20}
            />
          </div>

          <div>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none mb-16"
              placeholder="Повторите пароль"
              maxLength={20}
            />
          </div>
          {error && (
            <div className="text-gray-500 text-sm text-center">{error}</div>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 px-2 rounded-3xl transition text-lg font-medium hover:bg-gray-800"
          >
            {isLoading ? "Пупупу" : "Сохранить"}
          </motion.button>
        </form>

        <OrCenter />

        <div className="mt-1 text-center w-full">
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border-2 border-gray-400 text-gray-700 py-1.5 px-2 rounded-3xl hover:bg-gray-100 transition text-lg font-medium"
            >
              Создать аккаунт
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
