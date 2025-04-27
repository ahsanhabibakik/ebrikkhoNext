"use client";

import { useState, useEffect, useRef } from "react";
import { X, Filter } from "lucide-react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { products, categories } from "@/data/products";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = [
        ...products
          .filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((product) => ({
            type: "product",
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
          })),
        ...categories
          .filter((category) =>
            category.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((category) => ({
            type: "category",
            id: category.id,
            name: category.name,
            slug: category.slug,
          })),
      ];
      setSuggestions(searchResults);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(query)}${
          selectedCategory !== "all" ? `&category=${selectedCategory}` : ""
        }`
      );
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "product") {
      router.push(`/product/${suggestion.id}`);
    } else if (suggestion.type === "category") {
      router.push(`/category/${suggestion.slug}`);
    }
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="max-h-96 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <button
                key={`${suggestion.type}-${suggestion.id}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
              >
                {suggestion.type === "product" && (
                  <img
                    src={suggestion.image}
                    alt={suggestion.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {suggestion.name}
                  </div>
                  {suggestion.type === "product" && (
                    <div className="text-sm text-gray-500">
                      ${suggestion.price.toFixed(2)} • {suggestion.category}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
