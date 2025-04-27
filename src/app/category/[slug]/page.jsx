"use client";

import { useState } from "react";
import { use } from "react";
import { products, categories } from "@/data/products";
import { Star, ShoppingCart, Filter } from "lucide-react";
import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";

export default function CategoryPage({ params }) {
  const [sortBy, setSortBy] = useState("featured");
  const resolvedParams = use(params);
  const category = categories.find((cat) => cat.slug === resolvedParams.slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Category not found.</p>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.category === category.name
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60')] bg-cover bg-center" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl">
              {category.description ||
                `Browse our collection of ${category.name}`}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Sort */}
            <div className="flex justify-end mb-8">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
