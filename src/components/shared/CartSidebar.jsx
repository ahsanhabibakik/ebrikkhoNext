"use client";

import Image from "next/image";
import Link from "next/link";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Tag,
  Truck,
  Info,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  applyCoupon as applyCouponAction,
  setShippingCost as setShippingCostAction,
} from "@/redux/slices/cartSlice";

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const cartTotal = useAppSelector((state) => state.cart.total);
  const shippingCost = useAppSelector((state) => state.cart.shippingCost);
  const discount = useAppSelector((state) => state.cart.discount);
  const couponCode = useAppSelector((state) => state.cart.couponCode);

  const [inputCouponCode, setInputCouponCode] = useState("");
  const [freeShippingThreshold] = useState(5000); // Free shipping above 5000 BDT

  useEffect(() => {
    // Calculate shipping cost based on cart total
    if (cartTotal >= freeShippingThreshold) {
      dispatch(setShippingCostAction(0));
    } else {
      dispatch(setShippingCostAction(100)); // Standard shipping cost
    }
  }, [cartTotal, freeShippingThreshold, dispatch]);

  const applyCoupon = () => {
    // Simple coupon logic - you can enhance this
    if (inputCouponCode.toLowerCase() === "welcome10") {
      dispatch(
        applyCouponAction({
          code: inputCouponCode,
          discount: cartTotal * 0.1, // 10% discount
        })
      );
    }
  };

  const getFinalTotal = () => {
    return cartTotal - discount + shippingCost;
  };

  const getAmountNeededForFreeShipping = () => {
    const amountNeeded = freeShippingThreshold - cartTotal;
    return amountNeeded > 0 ? amountNeeded : 0;
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-10 z-[998]"
          onClick={() => dispatch(toggleCart())}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[999] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Shopping Cart
            </h2>
            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2  bg-gray-500 hover:bg-gray-400 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
                <Link
                  href="/products"
                  className="mt-4 text-orange-600 hover:text-orange-700"
                  onClick={() => dispatch(toggleCart())}
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg relative"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        ৳{item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700 hover:text-gray-900"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700 hover:text-gray-900"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shipping Information */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">
                  Shipping Information
                </h3>
              </div>
              {cartTotal >= freeShippingThreshold ? (
                <div className="text-green-600 text-sm">
                  You qualify for free shipping!
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  Add ৳{getAmountNeededForFreeShipping().toLocaleString()} more
                  to qualify for free shipping
                </div>
              )}
            </div>
          )}

          {/* Coupon Section */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">Apply Coupon</h3>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={inputCouponCode}
                    onChange={(e) => setInputCouponCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponCode && (
                <div className="mb-4 p-2 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>Coupon applied: 10% off</span>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ৳{cartTotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="font-medium">Coupon Discount</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Shipping</span>
                  <span
                    className={
                      shippingCost === 0
                        ? "text-green-600 font-medium"
                        : "text-gray-900 font-medium"
                    }
                  >
                    {shippingCost === 0
                      ? "Free"
                      : `৳${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ৳{getFinalTotal().toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  onClick={() => dispatch(toggleCart())}
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="block w-full text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
