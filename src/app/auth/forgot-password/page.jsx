"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call backend to send reset email or SMS
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="max-w-sm w-full bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-orange-800 mb-4 text-center">
          Forgot Password
        </h2>
        {sent ? (
          <div className="text-green-600 text-center">
            If your account exists, you will receive a reset link.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="block w-full px-3 py-2 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
