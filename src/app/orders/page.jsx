"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  ArrowRight,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders
    setTimeout(() => {
      setOrders([
        {
          orderNumber: "ORD-123456",
          date: "2024-03-15",
          status: "Processing",
          items: [
            {
              name: "Succulent Collection",
              quantity: 1,
              price: 1500,
            },
          ],
          subtotal: 1500,
          shipping: 100,
          total: 1600,
        },
        {
          orderNumber: "ORD-123457",
          date: "2024-03-14",
          status: "Delivered",
          items: [
            {
              name: "Garden Tools Set",
              quantity: 1,
              price: 2500,
            },
          ],
          subtotal: 2500,
          shipping: 0,
          total: 2500,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <ShoppingBag className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderNumber} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </span>
                    <button
                      onClick={() =>
                        router.push(`/orders/${order.orderNumber}`)
                      }
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Order Summary
                      </h3>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Total
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900">
                            {formatPrice(order.subtotal)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-gray-900">
                            {formatPrice(order.shipping)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-gray-900">Total</span>
                          <span className="text-gray-900">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
