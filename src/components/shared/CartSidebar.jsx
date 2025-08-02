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
  Heart,
  Clock,
  ArrowRight,
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
  saveForLater,
  moveToCart,
  removeFromSaved,
} from "@/redux/slices/cartSlice";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const [isClient, setIsClient] = useState(false);
  const [inputCouponCode, setInputCouponCode] = useState("");
  const [freeShippingThreshold] = useState(5000); // Free shipping above 5000 BDT
  const [showAddedToCart, setShowAddedToCart] = useState({});

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const savedForLater = useAppSelector((state) => state.cart?.savedForLater || []);
  const isCartOpen = useAppSelector((state) => state.cart?.isCartOpen || false);
  const cartTotal = useAppSelector((state) => state.cart?.total || 0);
  const shippingCost = useAppSelector((state) => state.cart?.shippingCost || 0);
  const discount = useAppSelector((state) => state.cart?.discount || 0);
  const couponCode = useAppSelector((state) => state.cart?.couponCode || "");

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Calculate shipping cost based on cart total
    if (cartTotal >= freeShippingThreshold) {
      dispatch(setShippingCostAction(0));
    } else {
      dispatch(setShippingCostAction(100)); // Standard shipping cost
    }
  }, [cartTotal, freeShippingThreshold, dispatch]);

  // Don't render on server side - but maintain component structure
  if (!isClient) {
    return <div style={{ display: 'none' }} />;
  }

  // Get related products based on cart items
  const getRelatedProducts = () => {
    if (!cartItems || cartItems.length === 0) return [];
    
    const categories = [...new Set(cartItems.map((item) => item.category))];
    return products
      .filter(
        (product) =>
          categories.includes(product.category) &&
          !cartItems.some((item) => item.id === product.id)
      )
      .slice(0, 4);
  };

  const relatedProducts = getRelatedProducts();

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

  const handleSaveForLater = (itemId) => {
    dispatch(saveForLater(itemId));
    setShowAddedToCart({ ...showAddedToCart, [itemId]: true });
    setTimeout(() => {
      setShowAddedToCart({ ...showAddedToCart, [itemId]: false });
    }, 2000);
  };

  return (
    <>
      {/* Only render if on client side */}
      {isClient && (
        <>
          {/* Overlay with blur effect */}
          {isCartOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[998] transition-opacity duration-300"
              onClick={() => dispatch(toggleCart())}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-all duration-300 ease-in-out z-[999] ${
              isCartOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
        <div className="h-full flex flex-col">
          {/* Header with gradient background */}
          <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items with improved styling */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 && savedForLater.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
                <Link
                  href="/products"
                  className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                  onClick={() => dispatch(toggleCart())}
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                {/* Cart Items */}
                {cartItems.length > 0 && (
                  <div className="w-full">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Cart Items
                    </h3>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg relative group hover:shadow-md transition-all duration-300 mb-4"
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
                              className="p-2 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700 hover:text-gray-900 transition-colors"
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
                              className="p-2 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700 hover:text-gray-900 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleSaveForLater(item.id)}
                            className="mt-2 text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
                          >
                            <Clock className="w-4 h-4" />
                            Save for later
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Saved for Later Items */}
                {savedForLater.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      Saved for Later
                    </h3>
                    {savedForLater.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg relative group hover:shadow-md transition-all duration-300 mb-4"
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
                              onClick={() => dispatch(removeFromSaved(item.id))}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            ৳{item.price.toLocaleString()}
                          </p>
                          <button
                            onClick={() => dispatch(moveToCart(item.id))}
                            className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Move to cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      You might also like
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {relatedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="group cursor-pointer"
                          onClick={() => {
                            dispatch(toggleCart());
                            router.push(`/products/${product.id}`);
                          }}
                        >
                          <div className="relative aspect-square mb-2">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            ৳{product.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Coupon Section with improved design */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
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

          {/* Footer with improved design */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-white">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ৳{cartTotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `৳${shippingCost.toLocaleString()}`
                    )}
                  </span>
                </div>
                {getAmountNeededForFreeShipping() > 0 && (
                  <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded-lg">
                    Add ৳{getAmountNeededForFreeShipping().toLocaleString()}{" "}
                    more for free shipping
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-orange-600">
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
      )}
    </>
  );
}
