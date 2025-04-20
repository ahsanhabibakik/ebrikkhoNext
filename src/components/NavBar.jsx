"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, Search, ChevronDown, X } from "lucide-react";
import Link from "next/link";

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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-6 lg:px-8 sticky top-0 z-50">
      {/* Small Screen: Hamburger & Logo */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="/" className="text-xl font-bold">
          Ebrikkho
        </Link>
      </div>

      {/* Medium Screen: Hamburger & Centered Logo */}
      <div className="hidden md:flex lg:hidden items-center justify-between w-full">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="/" className="text-xl font-bold">
          Ebrikkho
        </Link>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Desktop: Logo on Left */}
      <div className="hidden lg:flex items-center lg:ml-4 xl:ml-8">
        <Link href="/" className="text-xl font-bold">
          Ebrikkho
        </Link>
      </div>

      {/* Desktop Navigation - Centered */}
      <div className="hidden lg:flex items-center justify-center flex-1 gap-2 lg:mx-4 xl:mx-8">
        <Link href="/plants" className="btn btn-ghost btn-sm">
          Plants
        </Link>
        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm flex items-center gap-1"
          >
            Categories
            <ChevronDown size={16} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 bg-base-100 shadow-md rounded-box w-52"
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
        <Link href="/services" className="btn btn-ghost btn-sm">
          Services
        </Link>
        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm flex items-center gap-1"
          >
            Community
            <ChevronDown size={16} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 bg-base-100 shadow-md rounded-box w-52"
          >
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
        </div>
      </div>

      {/* Search, Account, Cart - Right Side */}
      <div className="flex items-center gap-2 ml-auto lg:mr-4 xl:mr-8">
        {/* Search bar for medium and large screens */}
        <div className="hidden md:flex">
          <div className="join">
            <input
              type="text"
              className="input input-bordered input-sm join-item w-48 md:w-56 lg:w-64"
              placeholder={placeholder}
            />
            <button className="btn btn-sm join-item btn-primary">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Search icon for small screens */}
        <div className="md:hidden">
          <button className="btn btn-ghost btn-sm">
            <Search size={20} />
          </button>
        </div>

        {/* Account */}
        <button className="btn btn-ghost btn-sm">
          <User size={20} />
        </button>

        {/* Cart */}
        <button className="btn btn-ghost btn-sm relative">
          <ShoppingCart size={20} />
          <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
            0
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-lg z-50">
          <ul className="menu menu-vertical p-4 gap-2">
            <li>
              <Link
                href="/plants"
                className="flex justify-between items-center"
              >
                Plants
                <ChevronDown size={16} />
              </Link>
              <ul className="pl-4">
                <li>
                  <Link href="/plants/indoor">Indoor Plants</Link>
                </li>
                <li>
                  <Link href="/plants/outdoor">Outdoor Plants</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/categories"
                className="flex justify-between items-center"
              >
                Categories
                <ChevronDown size={16} />
              </Link>
              <ul className="pl-4">
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
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link
                href="/community"
                className="flex justify-between items-center"
              >
                Community
                <ChevronDown size={16} />
              </Link>
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
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
