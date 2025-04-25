"use client";

import { Filter, Search, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function ShopPage() {
  const categories = [
    "All Plants",
    "Indoor Plants",
    "Outdoor Plants",
    "Flowering Plants",
    "Succulents",
    "Herbs",
    "Bonsai",
    "Air Plants",
  ];

  const products = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: "৳1,200",
      category: "Indoor Plants",
      rating: 4.5,
      image: "/images/shop/monstera.jpg",
      isNew: true,
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Snake Plant",
      price: "৳800",
      category: "Indoor Plants",
      rating: 4.8,
      image: "/images/shop/snake-plant.jpg",
      isBestSeller: true,
    },
    {
      id: 3,
      name: "Peace Lily",
      price: "৳950",
      category: "Flowering Plants",
      rating: 4.3,
      image: "/images/shop/peace-lily.jpg",
    },
    {
      id: 4,
      name: "Aloe Vera",
      price: "৳600",
      category: "Succulents",
      rating: 4.7,
      image: "/images/shop/aloe-vera.jpg",
    },
    {
      id: 5,
      name: "Fiddle Leaf Fig",
      price: "৳1,500",
      category: "Indoor Plants",
      rating: 4.6,
      image: "/images/shop/fiddle-leaf.jpg",
      isNew: true,
    },
    {
      id: 6,
      name: "Lavender",
      price: "৳700",
      category: "Herbs",
      rating: 4.4,
      image: "/images/shop/lavender.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/images/shop-bg.jpg')] bg-cover bg-center" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Shop</h1>
            <p className="text-xl md:text-2xl">
              Find your perfect plant companion
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search plants..."
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full">
                          Best Seller
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        {product.price}
                      </span>
                      <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
