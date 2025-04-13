"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Image from "next/image";
import RightImage from "../../public/login-header.png";
import OrCenter from "./ui/Or";


const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(
        2,
        "Зай, ну очень мала вероятность что у тебя имя состоит меньше чем из 2-х букв"
      ),
    lastName: z.string().min(2, "Давай прям как в паспорте напиши фамилию)))"),
    email: z.string().email("Пупупу... email неточный((("),
    phone: z.string().min(10, "Проверька как в контактах ты сам у себя забит)"),
    password: z.string().min(8, "Паролю нужно минимум 6 буковок..."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Парольчики не идентичны((",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
      registerSchema.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
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
        className="w-72 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-left text-black mb-8">
          Создать аккаунт самого лучшего котика
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
                placeholder="Имя"
                maxLength={20}
              />
            </div>
            <div>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
                placeholder="Фамилия"
                maxLength={20}
              />
            </div>
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="Телефон"
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="Пароль"
              maxLength={20}
            />
          </div>

          <div>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full  p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="Повторите пароль"
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
            className="w-full bg-black text-white py-2 px-2 rounded-3xl transition text-lg font-medium hover:bg-gray-800 mt-10"
          >
            {isLoading ? "Пупупу" : "Создать"}
          </motion.button>
        </form>

        <OrCenter />

        <div className="mt-1 text-center w-full">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border-2 border-gray-400 text-gray-700 py-1.5 px-2 rounded-3xl hover:bg-gray-100 transition text-lg font-medium"
            >
              Войти
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
