"use client";

import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="text-center md:text-left mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Ebrikkho
              </h1>
              <p className="text-lg text-gray-600">
                Sign in to your account to manage your plants, track orders, and
                access exclusive content.
              </p>
            </div>
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60"
                alt="Plant care"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <AuthForm mode="login" />
          </div>
        </div>
      </div>
    </div>
  );
}
