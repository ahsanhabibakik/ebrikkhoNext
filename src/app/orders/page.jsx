"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { Package, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock order data - in a real app, this would come from an API
const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-06-15",
    status: "Delivered",
    total: 2500,
    items: [
      {
        id: 1,
        name: "Monstera Deliciosa",
        price: 1500,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60",
      },
      {
        id: 2,
        name: "Fiddle Leaf Fig",
        price: 1000,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce4?w=800&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2023-05-20",
    status: "Delivered",
    total: 3500,
    items: [
      {
        id: 3,
        name: "Snake Plant",
        price: 1200,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce4?w=800&auto=format&fit=crop&q=60",
      },
      {
        id: 4,
        name: "Peace Lily",
        price: 1100,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce4?w=800&auto=format&fit=crop&q=60",
      },
    ],
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [expandedOrders, setExpandedOrders] = useState({});

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Link
              href="/account"
              className="flex items-center text-orange-600 hover:text-orange-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back to Account</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

          {mockOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-6">
                When you make a purchase, your order history will appear here.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Order {order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="font-medium text-gray-900">
                        ৳{order.total.toLocaleString()}
                      </span>
                      {expandedOrders[order.id] ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedOrders[order.id] && (
                    <div className="border-t p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                              <p className="text-orange-600 font-medium">
                                ৳{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
