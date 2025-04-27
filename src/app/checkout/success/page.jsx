"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Download,
  Package,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Truck,
  CreditCard,
  MapPin,
  User,
  Info,
  Leaf,
  Gift,
  Share2,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import { generateOrderPDF } from "@/utils/generateOrderPDF";
import { formatPrice } from "@/utils/formatPrice";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = () => {
      try {
        // Get the last order details
        const storedOrderDetails = localStorage.getItem("lastOrderDetails");
        if (!storedOrderDetails) {
          console.error("No order details found");
          router.push("/");
          return;
        }

        const parsedOrderDetails = JSON.parse(storedOrderDetails);
        console.log("Retrieved order details:", parsedOrderDetails);

        // Validate order details structure
        if (
          !parsedOrderDetails.orderNumber ||
          !parsedOrderDetails.items ||
          !Array.isArray(parsedOrderDetails.items)
        ) {
          console.error("Invalid order details structure:", parsedOrderDetails);
          router.push("/");
          return;
        }

        // Get existing orders
        const existingOrders = localStorage.getItem("orders");
        let orders = [];
        try {
          if (existingOrders) {
            orders = JSON.parse(existingOrders);
            if (!Array.isArray(orders)) {
              orders = [];
            }
          }
        } catch (error) {
          console.error("Error parsing existing orders:", error);
          orders = [];
        }

        // Remove any duplicate orders with the same order number
        orders = orders.filter(
          (order, index, self) =>
            index === self.findIndex((o) => o.orderNumber === order.orderNumber)
        );

        // Check if order already exists
        const orderExists = orders.some(
          (order) => order.orderNumber === parsedOrderDetails.orderNumber
        );
        if (!orderExists) {
          // Add new order to the beginning of the array
          orders.unshift(parsedOrderDetails);
          localStorage.setItem("orders", JSON.stringify(orders));
        }

        setOrderDetails(parsedOrderDetails);
        dispatch(clearCart());
      } catch (error) {
        console.error("Error processing order details:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [dispatch, router]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await generateOrderPDF(orderDetails);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Ebrikkho Order",
          text: `I just placed an order #${orderDetails?.orderNumber} on Ebrikkho!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find your order information. This might happen if you've
            refreshed the page or if your session has expired.
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Return to Home
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  // Calculate estimated delivery dates (3-5 days from order date)
  const orderDate = new Date(orderDetails.date);
  const minDeliveryDate = new Date(orderDate);
  minDeliveryDate.setDate(orderDate.getDate() + 3);
  const maxDeliveryDate = new Date(orderDate);
  maxDeliveryDate.setDate(orderDate.getDate() + 5);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Define order status steps with unique IDs
  const orderStatusSteps = [
    {
      id: "confirmed",
      title: "Order Confirmed",
      description: "Your order has been received",
      icon: <CheckCircle className="w-4 h-4" />,
      status: "completed",
    },
    {
      id: "processing",
      title: "Processing",
      description: "We're preparing your order",
      icon: <Package className="w-4 h-4" />,
      status: "current",
    },
    {
      id: "shipped",
      title: "Shipped",
      description: `Estimated: ${formatDate(minDeliveryDate)} - ${formatDate(
        maxDeliveryDate
      )}`,
      icon: <Truck className="w-4 h-4" />,
      status: "upcoming",
    },
    {
      id: "delivered",
      title: "Delivered",
      description: "Your order will arrive soon",
      icon: <CheckCircle className="w-4 h-4" />,
      status: "upcoming",
    },
  ];

  // Define plant care tips with unique IDs
  const plantCareTips = [
    {
      id: "watering",
      title: "Watering Guide",
      description:
        "Most indoor plants prefer slightly moist soil. Water when the top inch of soil feels dry to the touch.",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      textColor: "text-green-700",
      titleColor: "text-green-800",
    },
    {
      id: "light",
      title: "Light Requirements",
      description:
        "Place your plants in bright, indirect light. Avoid direct sunlight which can scorch leaves.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      textColor: "text-blue-700",
      titleColor: "text-blue-800",
    },
    {
      id: "temperature",
      title: "Temperature",
      description:
        "Most houseplants thrive in temperatures between 65-80°F (18-27°C). Avoid drafts and extreme temperature changes.",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
      textColor: "text-yellow-700",
      titleColor: "text-yellow-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You For Your Order!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order #{orderDetails.orderNumber}
              </h2>
              <p className="text-gray-600">
                Placed on{" "}
                {new Date(orderDetails.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Downloading..." : "Download PDF"}
              </button>
              <button
                onClick={handleShareOrder}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <Link
                href="/orders"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                View All Orders
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items
              </h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Information
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>{orderDetails.customer?.name || "N/A"}</p>
                  <p>{orderDetails.customer?.phone || "N/A"}</p>
                  <p>{orderDetails.customer?.address || "N/A"}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Information
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Method:</span>{" "}
                    {orderDetails.payment?.method || "N/A"}
                  </p>
                  {orderDetails.payment?.transactionId && (
                    <p>
                      <span className="font-medium">Transaction ID:</span>{" "}
                      {orderDetails.payment.transactionId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(orderDetails.total.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{formatPrice(orderDetails.total.shipping)}</span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>{formatPrice(orderDetails.total.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/shop")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
