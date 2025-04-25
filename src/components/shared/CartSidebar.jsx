"use client";

import { useState, useEffect } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartSidebar({ isOpen, onClose }) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".cart-sidebar")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Mock cart data
  const cartData = {
    items: [
      {
        id: 1,
        name: "Monstera Deliciosa",
        price: 29.99,
        quantity: 1,
        image: "/plants/monstera.jpg",
      },
      {
        id: 2,
        name: "Snake Plant",
        price: 19.99,
        quantity: 2,
        image: "/plants/snake-plant.jpg",
      },
    ],
    subtotal: 69.97,
    shipping: 5.99,
    discount: appliedCoupon ? 10 : 0,
    total: appliedCoupon ? 65.96 : 75.96,
  };

  const handleApplyCoupon = () => {
    if (couponCode === "WELCOME10") {
      setAppliedCoupon({ code: couponCode, discount: 10 });
    }
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm"
        onClick={onClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />

      {/* Cart Sidebar */}
      <div
        className="fixed inset-y-0 right-0 w-full md:w-96 bg-white transform transition-transform duration-300 ease-in-out z-50 cart-sidebar"
        style={{
          boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartData.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4 border-b last:border-b-0"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="text-gray-500 hover:text-gray-700">
                      +
                    </button>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Coupon Section */}
          <div className="p-4 border-t">
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                <span className="text-green-700">
                  Coupon applied: {appliedCoupon.code}
                </span>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-green-700 hover:text-green-900"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="p-4 border-t">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartData.subtotal.toFixed(2)}</span>
              </div>
              {cartData.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${cartData.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${cartData.shipping.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${cartData.total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Free shipping on orders over $50
              </p>
            </div>
            <button className="w-full mt-4 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
