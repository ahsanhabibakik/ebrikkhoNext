"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ৳{product.price.toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Care Instructions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Light</p>
                  <p className="font-medium">{product.care.light}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Water</p>
                  <p className="font-medium">{product.care.water}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="font-medium">{product.care.humidity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="font-medium">{product.care.temperature}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Availability:</span>{" "}
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
