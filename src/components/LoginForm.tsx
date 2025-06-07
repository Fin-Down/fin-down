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
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      loginSchema.parse(formData);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/dashboard/home");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        switch (err.message) {
          case "Firebase: Error (auth/user-not-found).":
            setError("Пользователь не найден");
            break;
          case "Firebase: Error (auth/wrong-password).":
            setError("Неверный пароль");
            break;
          default:
            setError("Произошла ошибка при входе");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard/home");
    } catch (error) {
      setError("Ошибка при входе через Google");
    } finally {
      setIsLoading(false);
    }
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
        className="w-72 flex flex-col items-center z-10"
      >
        <h2 className="w-full text-3xl font-bold text-left text-black mb-4">
          И снова привет! Почему так часто пропадаешь...
        </h2>
        <p className="w-full mb-12 text-gray-500 text-sm text-left">
          Мы счастливы увидеть вас снова :)))
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none text-black"
              placeholder="Email"
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="Пароль"
              maxLength={20}
              disabled={isLoading}
            />
          </div>

          <div className="text-right mb-8">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-black transition"
            >
              Забыли пароль?
            </Link>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 px-2 rounded-3xl transition text-lg font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? "Пупупу" : "Войти"}
          </motion.button>
        </form>

        <OrCenter />

        <div className="mt-1 text-center w-full">
          <button
            onClick={signInWithGoogle}
            disabled={isLoading}
            className="w-full border-2 border-gray-400 text-gray-700 py-1.5 px-2 rounded-3xl hover:bg-gray-100 transition text-lg font-medium disabled:opacity-50"
          >
            Войти через Google
          </button>
        </div>

        <div className="mt-4 text-center w-full">
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm text-gray-500 hover:text-black transition"
              disabled={isLoading}
            >
              Ещё нет аккаунта? Создать
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="fixed bottom-0 right-0 p-2">
        <Image
          src={CatFooterImage}
          alt="Котик"
          width={150}
          height={150}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
// "use client";
// import Image from "next/image";
// import CatFooterImage from "../../public/login-footer.png";
// import RightImage from "../../public/login-header.png";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { z } from "zod";
// import OrCenter from "./ui/Or";

// const loginSchema = z.object({
//   email: z.string().email("Котик, ты чуть не правильно ввёл свой email"),
//   password: z.string().min(8, "Меньше 8 буковок в пароле ну не может быть :("),
// });

// export default function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       loginSchema.parse(formData);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       router.push("/dashboard");
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         setError(err.errors[0].message);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center ">
//       <div className="w-full flex absolute top-0 right-0">
//         <div className="w-25 h-25 ml-auto">
//           <Image
//             src={RightImage}
//             alt="Левый котик"
//             width={100}
//             height={100}
//             className="object-contain"
//           />
//         </div>
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-72 flex flex-col items-center z-10"
//       >
//         <h2 className="w-full text-3xl font-bold text-left text-black mb-4">
//           И снова привет! Почему так часто пропадаешь...
//         </h2>
//         <p className="w-full mb-12 text-gray-500 text-sm text-left">
//           Мы счастливы увидеть вас снова :)))
//         </p>

//         <form onSubmit={handleSubmit} className="w-full space-y-4">
//           <div>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none text-black "
//               placeholder="Email"
//             />
//           </div>

//           <div>
//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 pb-2 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
//               placeholder="Пароль"
//               maxLength={20}
//             />
//           </div>

//           <div className="text-right mb-8">
//             <Link
//               href="/forgot-password"
//               className="text-sm text-gray-500 hover:text-black transition"
//             >
//               Забыли пароль?
//             </Link>
//           </div>

//           {error && (
//             <div className="text-gray-500 text-sm text-center">{error}</div>
//           )}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-black text-white py-2 px-2 rounded-3xl transition text-lg font-medium hover:bg-gray-800"
//           >
//             {isLoading ? "Пупупу" : "Войти"}
//           </motion.button>
//         </form>

//         <OrCenter />

//         <div className="mt-1 text-center w-full">
//           <Link href="/register">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full border-2 border-gray-400 text-gray-700 py-1.5 px-2 rounded-3xl hover:bg-gray-100 transition text-lg font-medium"
//             >
//               Создать аккаунт
//             </motion.button>
//           </Link>
//         </div>
//       </motion.div>

//       <div className="fixed bottom-0 right-0 p-2 ">
//         <Image
//           src={CatFooterImage}
//           alt="Котик"
//           width={150}
//           height={150}
//           className="object-contain"
//         />
//       </div>
//     </div>
//   );
// }
