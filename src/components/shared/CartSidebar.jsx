"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  toggleCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cart.isCartOpen);
  const items = useAppSelector((state) => state.cart.items);

  const total =
    items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => dispatch(toggleCart())}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-orange-800 text-white">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({items?.length || 0})
          </h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="p-1 hover:bg-orange-700 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items?.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="w-20 h-20 relative rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-orange-600 font-semibold">
                      ৳{item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateCartItem({
                              productId: item.productId,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        className="p-1 hover:bg-orange-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateCartItem({
                              productId: item.productId,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="p-1 hover:bg-orange-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        className="p-1 hover:bg-red-100 text-red-500 rounded ml-auto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p className="mb-4">Your cart is empty</p>
              <Link
                href="/plants"
                className="text-orange-600 hover:text-orange-700 font-medium"
                onClick={() => dispatch(toggleCart())}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {items?.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">৳{total}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-orange-700 transition"
              onClick={() => dispatch(toggleCart())}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
