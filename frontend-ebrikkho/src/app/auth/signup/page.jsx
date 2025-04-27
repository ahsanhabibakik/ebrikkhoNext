"use client";

import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="text-center md:text-left mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Join Ebrikkho
              </h1>
              <p className="text-lg text-gray-600">
                Create an account to start your plant journey with us. Get
                access to exclusive offers, track your orders, and more.
              </p>
            </div>
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=60"
                alt="Plant collection"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <AuthForm mode="register" />
          </div>
        </div>
      </div>
    </div>
  );
}
