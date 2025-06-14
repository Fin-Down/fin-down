"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
   <>
   </>
  );
}

    {/* <button
              onClick={async () => {
                await auth.signOut();
                router.push("/login");
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Выйти
            </button> */}


// import { Suspense } from "react";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import Image from "next/image";
// import CatImage from "../../../public/auth.png";

// export default function DashboardPage() {
//   return (
//     <Suspense fallback={<LoadingSpinner />}>
//       <div className="page text-center flex-col">
//         <div>
//           <h1 className="text-3xl font-bold text-black mb-6">Главная</h1>
//           <p className="text-gray-500 text-sm text-center">
//             Вы в приложении!!!
//           </p>
//         </div>

//         <div className="mb-0">
//           <Image
//             src={CatImage}
//             alt="Логотип FinDown"
//             width={280}
//             height={280}
//             className="w-60 mb-4 object-contain"
//             priority
//           />
//         </div>
//       </div>
//     </Suspense>
//   );
// }
