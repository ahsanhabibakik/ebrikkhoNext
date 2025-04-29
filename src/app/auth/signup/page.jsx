"use client";
import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <AuthForm mode="register" />
    </div>
  );
}
