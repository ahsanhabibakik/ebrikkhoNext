"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            New
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            Best Seller
          </div>
        )}
        <button className="absolute bottom-3 right-3 bg-white/90 text-orange-600 p-2.5 rounded-full hover:bg-white transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button className="bg-orange-600 text-white p-2.5 rounded-lg hover:bg-orange-700 transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
