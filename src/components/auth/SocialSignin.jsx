"use client";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

const SocialSignin = () => (
  <div className="flex items-center justify-center">
    <button
      onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
      className="flex items-center gap-2 px-4 py-2 border border-orange-300 rounded text-orange-700 hover:bg-orange-50 transition"
      aria-label="Sign in with Google"
    >
      <BsGoogle className="text-lg" />
      <span className="text-sm font-medium">Sign in with Google</span>
    </button>
  </div>
);

export default SocialSignin;
