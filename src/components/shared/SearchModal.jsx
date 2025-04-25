"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import Image from "next/image";
import products from "@/lib/products";

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 flex items-start justify-center p-4 z-50">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl mt-20 border border-gray-100">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for plants..."
                  className="w-full px-4 py-3 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                  autoFocus
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-600 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl cursor-pointer border border-gray-100 transition-all duration-200"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-base font-medium text-orange-600 mt-1">
                        ${product.price}
                      </p>
                      {product.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500 text-lg">
                  No products found matching your search.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Try different keywords or browse our collection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
