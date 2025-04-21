"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, Search, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const placeholderTexts = [
  "Search indoor plants...",
  "Find your lucky money plant...",
  "Try vegetable garden kits...",
  "Shop air-purifying greens...",
];

export default function Navbar() {
  const [placeholder, setPlaceholder] = useState(placeholderTexts[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % placeholderTexts.length;
      setPlaceholder(placeholderTexts[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-orange-100 text-neutral shadow sticky top-0 z-50">
      {/* Top section */}
      <div className="flex items-center justify-between px-4 py-2 md:px-6 lg:px-10 gap-2">
        {/* Left: Logo & menu */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Ebrikkho Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>

        {/* Middle: Search */}
        <div className="flex-1 mx-2 max-w-md hidden sm:flex">
          <div className="join w-full">
            <input
              type="text"
              placeholder={placeholder}
              className="input input-bordered join-item w-full placeholder:text-sm text-sm"
            />
            <button className="btn join-item bg-primary text-white hover:bg-primary/90">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-circle">
            <User size={20} />
          </button>
          <button className="btn btn-ghost btn-circle relative">
            <ShoppingCart size={20} />
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Desktop nav links */}
      <div className="hidden lg:flex justify-center bg-orange-200 border-t border-orange-300 text-neutral">
        <div className="flex gap-6 py-2 text-sm font-medium">
          <Link href="/plants" className="hover:text-primary">
            Plants
          </Link>
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="cursor-pointer flex items-center gap-1 hover:text-primary"
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
          <Link href="/services" className="hover:text-primary">
            Services
          </Link>
          <Link href="/community/blog" className="hover:text-primary">
            Blog
          </Link>
          <Link href="/community/forum" className="hover:text-primary">
            Forum
          </Link>
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
    </nav>
  );
}
