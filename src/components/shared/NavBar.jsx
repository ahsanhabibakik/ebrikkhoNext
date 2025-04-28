"use client";

import { useState, useEffect } from "react";
import { Menu, ChevronDown, X, Leaf } from "lucide-react";
import { PiBasketThin } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "./SearchModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartSlice";
import LeafPattern from "./LeafPattern";

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

export default function NavBar() {
  const [placeholder, setPlaceholder] = useState(placeholderTexts[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [mounted, setMounted] = useState(false);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCartCount = () => {
    if (!mounted || !cartItems) return 0;
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Handle opening the categories dropdown
  const handleOpenCategories = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsCategoriesOpen(true);
  };

  // Handle closing the categories dropdown with a delay
  const handleCloseCategories = () => {
    const timeout = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 300); // 300ms delay before closing
    setCloseTimeout(timeout);
  };

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % placeholderTexts.length;
      setPlaceholder(placeholderTexts[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Add effect to handle clicking outside the categories dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const categoriesDropdown = document.getElementById("categories-dropdown");
      const categoriesButton = document.getElementById("categories-button");

      if (isCategoriesOpen && categoriesDropdown && categoriesButton) {
        if (
          !categoriesDropdown.contains(event.target) &&
          !categoriesButton.contains(event.target)
        ) {
          setIsCategoriesOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoriesOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearchOpen(true);
  };

  return (
    <nav className="bg-orange-800 text-white shadow sticky top-0 z-50 relative">
      {/* Enhanced decorative leaf pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {/* Top row of leaves */}
        <div className="absolute top-2 left-2 transform rotate-12">
          <Leaf size={20} />
        </div>
        <div className="absolute top-2 left-1/4 transform rotate-45">
          <Leaf size={16} />
        </div>
        <div className="absolute top-2 left-1/2 transform rotate-90">
          <Leaf size={18} />
        </div>
        <div className="absolute top-2 left-3/4 transform rotate-135">
          <Leaf size={14} />
        </div>
        <div className="absolute top-2 right-2 transform -rotate-12">
          <Leaf size={20} />
        </div>

        {/* Bottom row of leaves */}
        <div className="absolute bottom-2 left-2 transform -rotate-45">
          <Leaf size={16} />
        </div>
        <div className="absolute bottom-2 left-1/4 transform -rotate-90">
          <Leaf size={18} />
        </div>
        <div className="absolute bottom-2 left-1/2 transform -rotate-135">
          <Leaf size={14} />
        </div>
        <div className="absolute bottom-2 left-3/4 transform -rotate-180">
          <Leaf size={16} />
        </div>
        <div className="absolute bottom-2 right-2 transform rotate-45">
          <Leaf size={20} />
        </div>

        {/* Center leaves */}
        <div className="absolute top-1/2 left-1/4 transform rotate-30">
          <Leaf size={22} />
        </div>
        <div className="absolute top-1/2 right-1/4 transform -rotate-30">
          <Leaf size={22} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2 relative z-10">
        {/* Top row for mobile: Logo and icons */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 relative">
          {/* Left: Logo & menu */}
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-circle block md:hidden text-white hover:bg-orange-700/20 active:bg-orange-700/30"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Center: Logo - absolute on mobile, static on md+ */}
          <div className="block md:hidden absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Ebrikkho Logo"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Ebrikkho Logo"
                width={80}
                height={80}
              />
            </Link>
          </div>

          {/* Right: Icons for mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/account"
              className="btn btn-ghost btn-circle text-white hover:bg-orange-700/20 active:bg-orange-700/30"
            >
              <VscAccount size={20} />
            </Link>
            <button
              onClick={() => dispatch(toggleCart())}
              className="btn btn-ghost btn-circle text-white hover:bg-orange-700/20 active:bg-orange-700/30 relative"
            >
              <PiBasketThin size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation - Now on the same line */}
        <div className="hidden md:flex items-center space-x-3 text-white">
          <Link
            href="/plants"
            className="hover:text-orange-300 transition-colors text-sm"
          >
            Plants
          </Link>
          <div className="relative group">
            <button
              className="flex items-center hover:text-orange-300 transition-colors text-sm"
              onMouseEnter={handleOpenCategories}
              onMouseLeave={handleCloseCategories}
            >
              Categories
              <ChevronDown size={14} className="ml-1" />
            </button>
            {isCategoriesOpen && (
              <div
                id="categories-dropdown"
                className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                onMouseEnter={handleOpenCategories}
                onMouseLeave={handleCloseCategories}
              >
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-orange-100 hover:text-orange-800"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/services"
            className="hover:text-orange-300 transition-colors text-sm"
          >
            Services
          </Link>
          <Link
            href="/community/blog"
            className="hover:text-orange-300 transition-colors text-sm"
          >
            Blog
          </Link>
          <Link
            href="/community/forum"
            className="hover:text-orange-300 transition-colors text-sm"
          >
            Forum
          </Link>
        </div>

        {/* Center: Search - Full width on mobile, normal on desktop */}
        <div className="w-full md:flex-1 md:max-w-xl md:mx-2 mt-2 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm md:text-base cursor-pointer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onClick={() => setIsSearchOpen(true)}
            />
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={() => setIsSearchOpen(true)}
            >
              <BsSearch size={18} />
            </button>
          </div>
        </div>

        {/* Right: Icons for desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/account"
            className="btn btn-ghost btn-circle text-white hover:bg-orange-700/20 active:bg-orange-700/30"
          >
            <VscAccount size={20} />
          </Link>
          <button
            onClick={() => dispatch(toggleCart())}
            className="btn btn-ghost btn-circle text-white hover:bg-orange-700/20 active:bg-orange-700/30 relative"
          >
            <PiBasketThin size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-orange-100 text-gray-800 shadow-md px-4 pb-4 relative z-10">
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
      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          initialQuery={searchQuery}
        />
      )}

      {/* Social Media Links */}
      <div className="flex justify-center items-center gap-4 py-3 bg-orange-900/80">
        <a
          href="https://facebook.com/ebrikkho"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-white hover:text-orange-300 transition-colors"
        >
          <FaFacebook size={22} />
        </a>
        <a
          href="https://twitter.com/ebrikkho"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="text-white hover:text-orange-300 transition-colors"
        >
          <FaTwitter size={22} />
        </a>
        <a
          href="https://instagram.com/ebrikkho"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white hover:text-orange-300 transition-colors"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://youtube.com/ebrikkho"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="text-white hover:text-orange-300 transition-colors"
        >
          <FaYoutube size={22} />
        </a>
        <a
          href="https://linkedin.com/in/ebrikkho"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white hover:text-orange-300 transition-colors"
        >
          <FaLinkedin size={22} />
        </a>
      </div>
    </nav>
  );
}
