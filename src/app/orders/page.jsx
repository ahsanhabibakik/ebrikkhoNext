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
  Filter,
  Calendar,
  Package,
} from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { generateOrderPDF } from "@/utils/generateOrderPDF";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Get orders from localStorage
    const storedOrders = localStorage.getItem("orders");
    console.log("Stored orders:", storedOrders); // Debug log

    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        console.log("Parsed orders:", parsedOrders); // Debug log
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Error parsing orders:", error);
        setOrders([]);
      }
    }
    setIsLoading(false);
  }, []);

  const handleDownloadPDF = async (order) => {
    setIsDownloading(true);
    try {
      await generateOrderPDF(order);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const getStatusColor = (status) => {
    // Handle undefined or null status
    if (!status) return "bg-gray-100 text-gray-800";

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
    // Handle undefined or null status
    if (!status) return <ShoppingBag className="w-5 h-5" />;

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

  const filteredAndSortedOrders = orders
    .filter(
      (order) =>
        statusFilter === "all" ||
        order.status?.toLowerCase() === statusFilter.toLowerCase()
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "total":
          return b.total.total - a.total.total;
        case "status":
          return (a.status || "").localeCompare(b.status || "");
        default:
          return 0;
      }
    });

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
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="total">Sort by Total</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
            </div>
          </div>

          {filteredAndSortedOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet.
              </p>
              <button
                onClick={() => router.push("/shop")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedOrders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="border rounded-lg p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Placed on{" "}
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-2">
                          {order.status || "Processing"}
                        </span>
                      </span>
                      <button
                        onClick={() => handleDownloadPDF(order)}
                        disabled={isDownloading}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {isDownloading ? "Downloading..." : "Download PDF"}
                      </button>
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
                              key={`${item.id}-${index}`}
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
                              {formatPrice(order.total?.subtotal || 0)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-900">
                              {formatPrice(order.total?.shipping || 0)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm font-medium">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">
                              {formatPrice(order.total?.total || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
