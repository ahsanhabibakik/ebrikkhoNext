"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { generateOrderPDF } from "@/utils/generateOrderPDF";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";
import Image from "next/image";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { cart, total, clearCart } = useCart();
  const { customerInfo } = useCustomer();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get order details from localStorage
    const savedOrderDetails = localStorage.getItem("lastOrderDetails");
    if (!savedOrderDetails) {
      router.push("/checkout");
      return;
    }

    const orderInfo = JSON.parse(savedOrderDetails);
    // Ensure date is in English numbers
    if (orderInfo.date) {
      const dateParts = orderInfo.date.split("/");
      if (dateParts.length === 3) {
        orderInfo.date = `${dateParts[0].padStart(
          2,
          "0"
        )}/${dateParts[1].padStart(2, "0")}/${dateParts[2]}`;
      }
    }
    setOrderDetails(orderInfo);
    setIsLoading(false);
  }, [router]);

  const handleDownloadPDF = () => {
    if (!orderDetails) return;
    generateOrderPDF(orderDetails);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Order Found
          </h1>
          <p className="text-gray-600 mb-6">
            Please complete your checkout process first.
          </p>
          <button
            onClick={() => router.push("/checkout")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4">
              <Image
                src="/logo.png"
                alt="Ebrikkho Logo"
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is
              being processed. You will receive an email confirmation shortly.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Order #{orderDetails.orderNumber}
                </h2>
                <p className="text-sm text-gray-600">
                  Placed on {orderDetails.date}
                </p>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Order Details
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Order Status
                </h3>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {orderDetails.status}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Customer Information
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{orderDetails.customer.name}</p>
                  {orderDetails.customer.email && (
                    <p>{orderDetails.customer.email}</p>
                  )}
                  <p>{orderDetails.customer.phone}</p>
                  <p>{orderDetails.customer.address}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        {formatPrice(orderDetails.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">
                        {formatPrice(orderDetails.shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        {formatPrice(orderDetails.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Method: {orderDetails.payment.method}</p>
                  {orderDetails.payment.transactionId && (
                    <p>Transaction ID: {orderDetails.payment.transactionId}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/orders")}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              View Order Status
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
