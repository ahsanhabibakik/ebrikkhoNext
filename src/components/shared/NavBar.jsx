"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, Search, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "./SearchModal";
import { useCart } from "@/context/CartContext";

const placeholderTexts = [
  "Search indoor plants...",
  "Find your lucky money plant...",
  "Try vegetable garden kits...",
  "Shop air-purifying greens...",
];

const categories = [
  { name: "All Plants", href: "/plants" },
  { name: "Indoor Plants", href: "/categories/indoor" },
  { name: "Outdoor Plants", href: "/categories/outdoor" },
  { name: "Flowering Plants", href: "/categories/flowering" },
  { name: "Succulents", href: "/categories/succulents" },
  { name: "Herbs", href: "/categories/herbs" },
  { name: "Bonsai", href: "/categories/bonsai" },
  { name: "Air Plants", href: "/categories/air-plants" },
];

export default function Navbar() {
  const [placeholder, setPlaceholder] = useState(placeholderTexts[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { setIsCartOpen, getCartCount } = useCart();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % placeholderTexts.length;
      setPlaceholder(placeholderTexts[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.closest("button")) {
      setIsSearchOpen(true);
    }
  };

  return (
    <nav className="bg-orange-800 text-white shadow sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2 md:px-6 lg:px-10 gap-2">
        {/* Left: Logo & menu */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost btn-circle lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Ebrikkho Logo" width={80} height={80} />
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/plants"
            className="hover:text-orange-200 transition-colors"
          >
            Plants
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center gap-1 hover:text-orange-200 transition-colors"
            >
              Categories <ChevronDown size={14} />
            </button>
            {isCategoriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-3 hover:bg-orange-50 text-base font-medium text-gray-800"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/services"
            className="hover:text-orange-200 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/community/blog"
            className="hover:text-orange-200 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/community/forum"
            className="hover:text-orange-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Forum
          </Link>
        </div>

        {/* Right: Search and Icons */}
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex">
            <div
              className={`join w-full transition-all duration-200 ${
                isSearchFocused ? "ring-2 ring-orange-300" : ""
              }`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="input input-bordered join-item w-full placeholder:text-sm text-sm bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/20"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button
                type="submit"
                className="btn join-item bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Mobile Search Icon */}
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>

          <Link href="/account" className="btn btn-ghost btn-circle">
            <User size={20} />
          </Link>
          <button
            className="btn btn-ghost btn-circle relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} />
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              {getCartCount()}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-orange-100 text-gray-800 shadow-md px-4 pb-4">
          <ul className="menu menu-vertical gap-2">
            <li>
              <Link
                href="/plants"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800"
              >
                Plants
              </Link>
            </li>
            <li>
              <details>
                <summary className="text-base font-medium text-gray-800">
                  Categories
                </summary>
                <ul className="pl-4">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium py-2 text-gray-800"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/community/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/community/forum"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800"
              >
                Forum
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
}
