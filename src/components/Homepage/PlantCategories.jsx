"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 24,
    color: "bg-green-50",
  },
  {
    id: 2,
    name: "Outdoor Plants",
    image:
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 18,
    color: "bg-blue-50",
  },
  {
    id: 3,
    name: "Succulents",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 12,
    color: "bg-yellow-50",
  },
  {
    id: 4,
    name: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 15,
    color: "bg-pink-50",
  },
  {
    id: 5,
    name: "Herbs",
    image:
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 8,
    color: "bg-purple-50",
  },
  {
    id: 6,
    name: "Bonsai",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 6,
    color: "bg-red-50",
  },
];

const PlantCategories = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Plant Categories
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Explore our diverse collection
          </p>
        </div>

        {/* Desktop view - grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              key={category.id}
              className="group"
            >
              <div
                className={`${category.color} rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
              >
                <div className="relative w-full aspect-square mb-2">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800 text-center">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 text-center">
                  {category.count} items
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view - horizontal scrollable */}
        <div className="md:hidden relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-md z-10"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <Link
                href={`/categories/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={category.id}
                className="group flex-shrink-0 w-28 snap-center"
              >
                <div
                  className={`${category.color} rounded-lg p-2 transition-all duration-300 hover:shadow-md mx-1`}
                >
                  <div className="relative w-full aspect-square mb-1">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xs font-medium text-gray-800 text-center line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 text-center">
                    {category.count} items
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-md z-10"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlantCategories;
