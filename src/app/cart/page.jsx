"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API or localStorage
    // For now, we'll use mock data
    const mockCartItems = [
      {
        id: 1,
        name: "Monstera Deliciosa",
        price: 29.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&auto=format&fit=crop&q=60",
      },
      {
        id: 2,
        name: "Snake Plant",
        price: 24.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce0?w=500&auto=format&fit=crop&q=60",
      },
    ];

    setTimeout(() => {
      setCartItems(mockCartItems);
      setIsLoading(false);
    }, 500);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-black mb-8">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-black mb-2">
                Your cart is empty
              </h2>
              <p className="text-black mb-6">
                Looks like you haven't added any plants to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center py-4 border-b border-gray-200 last:border-0"
                      >
                        <div className="relative h-24 w-24 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="text-lg font-semibold text-black">
                            {item.name}
                          </h3>
                          <p className="text-black">${item.price.toFixed(2)}</p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4 text-black" />
                            </button>
                            <span className="mx-2 text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4 text-black" />
                            </button>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 p-1 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-black">Subtotal</span>
                      <span className="text-black">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Shipping</span>
                      <span className="text-black">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Tax</span>
                      <span className="text-black">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                      <span className="text-black">Total</span>
                      <span className="text-black">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <div className="mt-4 text-center">
                    <Link
                      href="/products"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
