"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, Search, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "./SearchModal";

const placeholderTexts = [
  "Search indoor plants...",
  "Find your lucky money plant...",
  "Try vegetable garden kits...",
  "Shop air-purifying greens...",
];

export default function Navbar({ onCartOpen }) {
  const [placeholder, setPlaceholder] = useState(placeholderTexts[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
    // Only open modal when search icon is clicked
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
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="cursor-pointer flex items-center gap-1 hover:text-orange-200 transition-colors"
            >
              Categories <ChevronDown size={14} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 bg-orange-100 shadow rounded-box w-52"
            >
              <li>
                <Link href="/categories/indoor">Indoor Plants</Link>
              </li>
              <li>
                <Link href="/categories/outdoor">Outdoor Plants</Link>
              </li>
              <li>
                <Link href="/categories/vegetables">Vegetables & Fruits</Link>
              </li>
              <li>
                <Link href="/categories/tools">Tools & Soil</Link>
              </li>
            </ul>
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

          <button className="btn btn-ghost btn-circle">
            <User size={20} />
          </button>
          <button
            className="btn btn-ghost btn-circle relative"
            onClick={onCartOpen}
          >
            <ShoppingCart size={20} />
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-orange-100 text-neutral shadow-md px-4 pb-4">
          <ul className="menu menu-vertical gap-2">
            <li>
              <Link href="/plants">Plants</Link>
            </li>
            <li>
              <details open>
                <summary>Categories</summary>
                <ul className="pl-4">
                  <li>
                    <Link href="/categories/indoor">Indoor Plants</Link>
                  </li>
                  <li>
                    <Link href="/categories/outdoor">Outdoor Plants</Link>
                  </li>
                  <li>
                    <Link href="/categories/vegetables">
                      Vegetables & Fruits
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/tools">Tools & Soil</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <details>
                <summary>Community</summary>
                <ul className="pl-4">
                  <li>
                    <Link href="/community/events">Events</Link>
                  </li>
                  <li>
                    <Link href="/community/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/community/forum">Forum</Link>
                  </li>
                </ul>
              </details>
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
