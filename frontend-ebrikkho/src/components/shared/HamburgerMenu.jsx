"use client";

import { X, ChevronDown, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HamburgerMenu({ isOpen, onClose }) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        onClick={onClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />

      {/* Hamburger Menu */}
      <div
        className="fixed inset-y-0 left-0 w-full md:w-80 bg-white transform transition-transform duration-300 ease-in-out z-50"
        style={{
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-orange-50">
            <h2 className="text-lg font-bold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-orange-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-4">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCategoriesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/categories/indoor"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Indoor Plants
                    </Link>
                    <Link
                      href="/categories/outdoor"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Outdoor Plants
                    </Link>
                    <Link
                      href="/categories/vegetables"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Vegetables & Fruits
                    </Link>
                    <Link
                      href="/categories/tools"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Tools & Soil
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/services"
                className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                Services
              </Link>

              {/* Community Dropdown */}
              <div>
                <button
                  onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <span>Community</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isCommunityOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCommunityOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/community/events"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Events
                    </Link>
                    <Link
                      href="/community/blog"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Blog
                    </Link>
                    <Link
                      href="/community/forum"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Forum
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                Contact
              </Link>

              {/* Account Section */}
              <div className="pt-4 border-t">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isAccountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAccountOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/account/profile"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      className="block px-4 py-2 text-gray-900 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Wishlist
                    </Link>
                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
