"use client";

import { useState, useEffect } from "react";
import { X, Tag, Clock, TrendingUp, Leaf, Filter } from "lucide-react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import products from "@/lib/products";

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches] = useState([
    "Indoor Plants",
    "Succulents",
    "Air Purifying",
    "Low Maintenance",
    "Flowering Plants",
    "Herbs",
    "Bonsai",
    "Garden Tools",
  ]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save search to recent searches
  const saveSearch = (query) => {
    if (!query.trim()) return;

    const updatedSearches = [
      query,
      ...recentSearches.filter((search) => search !== query),
    ].slice(0, 5); // Keep only the 5 most recent searches

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Filter products based on search query and category
  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Apply search query filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, activeCategory]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery);
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 flex items-start justify-center p-4 z-50">
        <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl mt-16 border border-gray-100 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
            <form onSubmit={handleSearch}>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for plants, tools, or accessories..."
                    className="w-full px-4 py-3 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <BsSearch size={20} />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-600 hover:text-gray-800"
                >
                  <X size={22} />
                </button>
              </div>
            </form>
          </div>

          {/* Categories */}
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === "all"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory("indoor")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === "indoor"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                Indoor Plants
              </button>
              <button
                onClick={() => setActiveCategory("outdoor")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === "outdoor"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                Outdoor Plants
              </button>
              <button
                onClick={() => setActiveCategory("succulents")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === "succulents"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                Succulents
              </button>
              <button
                onClick={() => setActiveCategory("herbs")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === "herbs"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                Herbs
              </button>
              <button
                onClick={() => setActiveCategory("tools")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === "tools"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                Tools
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <div className="p-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Clock size={16} />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(search)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1 mb-3">
                    <TrendingUp size={16} />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 rounded-full text-sm text-orange-700 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-3 p-4">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl cursor-pointer border border-gray-100 transition-all duration-200"
                    onClick={onClose}
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                      {product.isNew && (
                        <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-900 truncate">
                          {product.name}
                        </h3>
                        {product.category && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {product.category}
                          </span>
                        )}
                      </div>
                      <p className="text-base font-medium text-orange-600 mt-1">
                        ${product.price}
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </p>
                      {product.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 py-12">
                <BsSearch className="text-gray-400" size={24} />
                <p className="mt-4 text-gray-500">
                  No products found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
