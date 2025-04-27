"use client";

import { useState } from "react";
import { Mail, CheckCircle, XCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // In a real application, this would send the email to a backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      // Validate email
      if (!email.includes("@") || !email.includes(".")) {
        throw new Error("Please enter a valid email address");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="bg-orange-50 rounded-lg p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
          <Mail className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest products, plant care tips, and exclusive
          offers.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span>Thank you for subscribing!</span>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        <p className="mt-4 text-sm text-gray-500">
          By subscribing, you agree to receive marketing emails from us. You can
          unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
