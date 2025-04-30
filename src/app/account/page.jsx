"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Bell, User, LogOut } from "lucide-react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from backend if JWT exists
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (session) {
      setProfile({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      });
      setLoading(false);
    } else if (token) {
      fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!loading && !profile) {
      router.replace("/auth/login");
    }
  }, [loading, profile, router]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex items-center gap-6 mb-8">
          <Image
            src={profile.image || "/default-avatar.png"}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <div className="font-bold text-xl text-orange-800 flex items-center gap-2">
              <User className="w-5 h-5" />
              {profile.name}
            </div>
            <div className="text-gray-600">{profile.email}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Link
            href="/orders"
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
          >
            <ShoppingBag className="w-7 h-7 text-orange-600 mb-2" />
            <span className="font-medium text-orange-800">Orders</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
          >
            <Heart className="w-7 h-7 text-orange-600 mb-2" />
            <span className="font-medium text-orange-800">Wishlist</span>
          </Link>
          <Link
            href="/reminders"
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
          >
            <Bell className="w-7 h-7 text-orange-600 mb-2" />
            <span className="font-medium text-orange-800">Reminders</span>
          </Link>
          <Link
            href="/account/settings"
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
          >
            <User className="w-7 h-7 text-orange-600 mb-2" />
            <span className="font-medium text-orange-800">Profile Settings</span>
          </Link>
        </div>
        <button
          onClick={() => {
            signOut();
            localStorage.removeItem("token");
            localStorage.removeItem("userPhoto");
            router.replace("/auth/login");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
