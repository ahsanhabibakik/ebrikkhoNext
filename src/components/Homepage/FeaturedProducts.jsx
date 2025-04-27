"use client";

import { useState } from "react";
import ProductCard from "@/components/shared/ProductCard";

export default function FeaturedProducts({
  products,
  title = "Featured Products",
  description = "Discover our most popular and trending products",
}) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return product.isNew;
    if (activeTab === "best") return product.isBestSeller;
    return true;
  });

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors whitespace-nowrap ${
              activeTab === "all"
                ? "bg-orange-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors whitespace-nowrap ${
              activeTab === "new"
                ? "bg-orange-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            New Arrivals
          </button>
          <button
            onClick={() => setActiveTab("best")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors whitespace-nowrap ${
              activeTab === "best"
                ? "bg-orange-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Best Sellers
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
