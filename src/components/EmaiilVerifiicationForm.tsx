"use client";
import Image from "next/image";
import CatFooterImage from "../../public/login-footer.png";
import RightImage from "../../public/login-header.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import OrCenter from "./ui/Or";

const EmailCode = z.object({
  code: z.string().length(6, "Коть у кодика должно быть 6 цифр"),
});

export default function EmailValiidation() {
  const [formData, setFormData] = useState({
    code: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      EmailCode.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/password-recovery");
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
          Подтверждение почты
        </h2>
        <p className="w-full mb-12 text-gray-500 text-sm text-left">
          На вашу почту должен придти код, введите его
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="mb-20">
            <input
              type="number"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none text-black "
              placeholder="Код"
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
            {isLoading ? "Пупупу" : "Подтвердить"}
          </motion.button>
        </form>

        <OrCenter/>

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
