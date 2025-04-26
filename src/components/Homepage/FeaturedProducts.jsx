"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { Star, ShoppingCart, Heart } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 1200,
    image: "/images/products/monstera.jpg",
    category: "Indoor Plants",
    rating: 4.5,
    reviews: 128,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 800,
    image: "/images/products/snake-plant.jpg",
    category: "Indoor Plants",
    rating: 4.8,
    reviews: 95,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    price: 1500,
    image: "/images/products/fiddle-leaf.jpg",
    category: "Indoor Plants",
    rating: 4.3,
    reviews: 76,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Peace Lily",
    price: 900,
    image: "/images/products/peace-lily.jpg",
    category: "Indoor Plants",
    rating: 4.6,
    reviews: 112,
    isNew: false,
    isBestSeller: true,
  },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = featuredProducts.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return product.isNew;
    if (activeTab === "best") return product.isBestSeller;
    return true;
  });

  return (
    <section className="py-8 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium plants and
            gardening essentials
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors whitespace-nowrap ${
              activeTab === "all"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors whitespace-nowrap ${
              activeTab === "new"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            New Arrivals
          </button>
          <button
            onClick={() => setActiveTab("best")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors whitespace-nowrap ${
              activeTab === "best"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Best Sellers
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-48 sm:h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {product.isNew && (
                  <span className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    Best Seller
                  </span>
                )}
                <button className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white p-1.5 sm:p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center mb-1 sm:mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">
                    ({product.reviews})
                  </span>
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-1">
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <button className="bg-orange-600 text-white p-1.5 sm:p-2 rounded-full hover:bg-orange-700 transition-colors">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/products"
            className="inline-block bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-orange-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
