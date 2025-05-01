"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { loginSuccess } from "@/redux/slices/authSlice";
import SocialSignin from "./SocialSignin";

export default function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [useEmail, setUseEmail] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    password: "",
    name: mode === "register" ? "" : undefined,
    confirmPassword: mode === "register" ? "" : undefined,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form data
      if (mode === "register") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        if (!formData.name) {
          throw new Error("Name is required");
        }
        if (!formData.mobile && !formData.email) {
          throw new Error("Mobile number or email is required");
        }
      }

      // --- Connect to backend API ---
      const endpoint =
        mode === "login"
          ? `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
            }/api/auth/login`
          : `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
            }/api/auth/register`;

      const payload =
        mode === "login"
          ? {
              email: formData.email,
              mobile: formData.mobile,
              password: formData.password,
            }
          : {
              name: formData.name,
              email: formData.email,
              mobile: formData.mobile,
              password: formData.password,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Save JWT token to localStorage
      localStorage.setItem("token", data.token);
      if (data.user && data.user.photo) {
        localStorage.setItem("userPhoto", data.user.photo);
      }

      // Optionally, fetch user profile with token and dispatch to Redux
      // const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/me`, {
      //   headers: { Authorization: `Bearer ${data.token}` }
      // });
      // const userData = await userRes.json();
      // dispatch(loginSuccess(userData.data));

      // For now, just dispatch loginSuccess with email/mobile
      dispatch(
        loginSuccess({ email: formData.email, mobile: formData.mobile })
      );

      router.push("/account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-orange-800 mb-4 text-center">
        {mode === "login" ? "Sign In" : "Create Account"}
      </h2>
      <SocialSignin />
      <div className="my-4 flex items-center">
        <div className="flex-grow border-t border-orange-200"></div>
        <span className="mx-2 text-xs text-orange-400">or</span>
        <div className="flex-grow border-t border-orange-200"></div>
      </div>
      {error && (
        <div className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="text-xs font-medium text-orange-700">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-orange-300" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full pl-9 pr-3 py-2 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400"
                placeholder="John Doe"
              />
            </div>
          </div>
        )}

        {!useEmail ? (
          <div>
            <label className="text-xs font-medium text-orange-700">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-orange-300" />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required={!formData.email}
                className="block w-full pl-9 pr-3 py-2 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. 017XXXXXXXX"
              />
            </div>
            <button
              type="button"
              className="text-xs text-orange-500 mt-1 underline"
              onClick={() => setUseEmail(true)}
            >
              Use email instead
            </button>
          </div>
        ) : (
          <div>
            <label className="text-xs font-medium text-orange-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-orange-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={!formData.mobile}
                className="block w-full pl-9 pr-3 py-2 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="button"
              className="text-xs text-orange-500 mt-1 underline"
              onClick={() => setUseEmail(false)}
            >
              Use mobile instead
            </button>
          </div>
        )}

        <div>
          <label className="text-xs font-medium text-orange-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-orange-300" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full pl-9 pr-9 py-2 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-orange-300" />
              ) : (
                <Eye className="h-4 w-4 text-orange-300" />
              )}
            </button>
          </div>
        </div>

        {mode === "register" && (
          <div>
            <label className="text-xs font-medium text-orange-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-orange-300" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="block w-full pl-9 pr-9 py-2 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400"
                placeholder="••••••••"
              />
            </div>
          </div>
        )}

        {mode === "login" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-orange-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-xs text-orange-700"
              >
                Remember me
              </label>
            </div>
            <a
              href="/auth/forgot-password"
              className="text-xs text-orange-500 hover:text-orange-700"
            >
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Processing..."
            : mode === "login"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-xs text-orange-700">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a
            href={mode === "login" ? "/auth/signup" : "/auth/login"}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </a>
        </p>
      </div>
    </div>
  );
}
