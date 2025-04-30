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

  // Dashboard stats (mocked for now, replace with API calls if needed)
  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    reminders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

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

  useEffect(() => {
    // Example: fetch stats and recent orders from backend
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (profile) {
      // Fetch stats
      fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setStats((s) => ({ ...s, orders: data.data?.length || 0 }));
          setRecentOrders(data.data?.slice(0, 3) || []);
        });
      fetch("/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setStats((s) => ({ ...s, wishlist: data.data?.items?.length || 0 })));
      fetch("/api/reminders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setStats((s) => ({ ...s, reminders: data.data?.length || 0 })));
    }
  }, [profile]);

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
        {/* Dashboard Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <ShoppingBag className="w-6 h-6 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-orange-800">{stats.orders}</div>
            <div className="text-sm text-orange-700">Orders</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <Heart className="w-6 h-6 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-orange-800">{stats.wishlist}</div>
            <div className="text-sm text-orange-700">Wishlist</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <Bell className="w-6 h-6 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-orange-800">{stats.reminders}</div>
            <div className="text-sm text-orange-700">Reminders</div>
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
        {/* Recent Orders */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <div className="text-gray-500 text-sm">No recent orders.</div>
          ) : (
            <ul className="divide-y divide-orange-100">
              {recentOrders.map((order) => (
                <li key={order._id} className="py-2 flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Order #{order._id.slice(-6).toUpperCase()} - {order.items.length} items
                  </span>
                  <span className="text-xs text-orange-600">{order.status}</span>
                </li>
              ))}
            </ul>
          )}
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
