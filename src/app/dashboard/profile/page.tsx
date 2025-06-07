'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
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
    <div className=" p-6 text-center items-center pt-20">
              <h1 className="text-2xl font-bold mb-4">Pofile</h1>

    <button
      onClick={async () => {
        await auth.signOut();
        router.push("/login");
      }}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Выйти
    </button>
    </div>
  );
}
