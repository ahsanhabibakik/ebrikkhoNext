"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import {
  Package,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  Truck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getOrderHistory } from "@/utils/customerData";
import { generateOrderPDF } from "@/utils/generateOrderPDF";
import { toast } from "sonner";

// Fallback mock order data - will be used if no orders are found in storage
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
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60",
      },
    ],
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Load orders from localStorage
    const loadOrders = () => {
      try {
        const storedOrders = getOrderHistory();

        // If we have stored orders, use those; otherwise use mock data
        if (storedOrders && storedOrders.length > 0) {
          setOrders(storedOrders);
        } else {
          setOrders(mockOrders);
        }
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders(mockOrders);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleDownloadInvoice = async (order) => {
    setIsDownloading(true);
    try {
      // Prepare order details in the format expected by generateOrderPDF
      const orderDetails = {
        orderNumber: order.id,
        date: order.date,
        status: order.status,
        customer: {
          name: "Customer Name", // This would come from user data in a real app
          email: "customer@example.com",
          phone: "1234567890",
          address: "Customer Address",
        },
        items: order.items,
        subtotal: order.total,
        shipping: 0, // Assuming free shipping
        total: order.total,
        payment: {
          method: "Credit Card", // This would come from order data in a real app
          transactionId:
            "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        },
      };

      await generateOrderPDF(orderDetails);
      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download invoice. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTrackOrder = (order) => {
    setIsTracking(true);

    // Simulate tracking information
    setTimeout(() => {
      // In a real app, this would fetch tracking data from an API
      const trackingInfo = {
        orderId: order.id,
        status: order.status,
        estimatedDelivery: new Date(
          new Date(order.date).getTime() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        trackingNumber:
          "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        currentLocation: "Distribution Center",
        steps: [
          { status: "Order Placed", date: order.date, completed: true },
          {
            status: "Processing",
            date: new Date(
              new Date(order.date).getTime() + 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
            completed: true,
          },
          {
            status: "Shipped",
            date: new Date(
              new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000
            ).toISOString(),
            completed: order.status !== "Processing",
          },
          {
            status: "Out for Delivery",
            date: new Date(
              new Date(order.date).getTime() + 6 * 24 * 60 * 60 * 1000
            ).toISOString(),
            completed: order.status === "Delivered",
          },
          {
            status: "Delivered",
            date: new Date(
              new Date(order.date).getTime() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
            completed: order.status === "Delivered",
          },
        ],
      };

      // Show tracking modal
      setTrackingInfo(trackingInfo);
      setShowTrackingModal(true);
      setIsTracking(false);
    }, 1000);
  };

  const [trackingInfo, setTrackingInfo] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link
              href="/account"
              className="flex items-center text-black hover:text-orange-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Account
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-black mb-8">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-black mb-2">
                No orders yet
              </h2>
              <p className="text-black mb-6">
                You haven't placed any orders yet. Start shopping to see your
                orders here.
              </p>
              <Link
                href="/products"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-black">
                          Order #{order.id}
                        </h3>
                        <p className="text-black">
                          Placed on {formatDate(order.date)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between md:justify-end">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span className="ml-4 text-lg font-semibold text-black">
                          {formatPrice(order.total)}
                        </span>
                        <span className="ml-4">
                          {expandedOrders[order.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {expandedOrders[order.id] && (
                    <div className="border-t border-gray-200 p-6">
                      <h4 className="font-semibold text-black mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center border-b border-gray-100 pb-4 last:border-0"
                          >
                            <div className="relative h-20 w-20 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="ml-4 flex-grow">
                              <h5 className="font-medium text-black">
                                {item.name}
                              </h5>
                              <p className="text-black">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-black">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-black">Subtotal</span>
                          <span className="text-black">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-black">Shipping</span>
                          <span className="text-black">Free</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                          <span className="text-black">Total</span>
                          <span className="text-black">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => handleTrackOrder(order)}
                          disabled={isTracking}
                          className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isTracking ? (
                            <>
                              <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                              Loading...
                            </>
                          ) : (
                            <>
                              <Truck className="w-4 h-4" />
                              Track Order
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(order)}
                          disabled={isDownloading}
                          className="flex-1 border border-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-4 h-4 border-t-2 border-b-2 border-orange-600 rounded-full animate-spin"></div>
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download Invoice
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tracking Modal */}
      {showTrackingModal && trackingInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">
                  Order Tracking
                </h2>
                <button
                  onClick={() => setShowTrackingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium text-black">
                    {trackingInfo.orderId}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tracking Number:</span>
                  <span className="font-medium text-black">
                    {trackingInfo.trackingNumber}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-medium ${
                      trackingInfo.status === "Delivered"
                        ? "text-green-600"
                        : trackingInfo.status === "Processing"
                        ? "text-blue-600"
                        : "text-orange-600"
                    }`}
                  >
                    {trackingInfo.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium text-black">
                    {new Date(
                      trackingInfo.estimatedDelivery
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Tracking Timeline
                </h3>
                <div className="relative">
                  {trackingInfo.steps.map((step, index) => (
                    <div key={index} className="flex mb-6 last:mb-0">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {step.completed ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <span className="text-white font-medium">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        {index < trackingInfo.steps.length - 1 && (
                          <div
                            className={`w-0.5 h-16 ${
                              step.completed ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6 last:pb-0">
                        <h4 className="font-medium text-black">
                          {step.status}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(step.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowTrackingModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
