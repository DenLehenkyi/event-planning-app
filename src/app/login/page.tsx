"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Завантаження...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-4xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Вхід</h1>

        <div className="flex justify-center">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
