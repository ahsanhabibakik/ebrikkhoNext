"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const bannerSlides = [
  {
    id: 1,
    title: "Fresh Plants for Your Home",
    description:
      "Transform your living space with our premium selection of indoor and outdoor plants.",
    // Original image: banner-1.jpg
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Expert Plant Care Tips",
    description:
      "Learn how to keep your plants healthy and thriving with our expert care guides.",
    // Original image: banner-2.jpg
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Learn More",
    buttonLink: "/care-guides",
  },
  {
    id: 3,
    title: "Seasonal Plant Collections",
    description:
      "Discover our curated collections of plants perfect for every season.",
    // Original image: banner-3.jpg
    image:
      "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    buttonText: "Explore",
    buttonLink: "/collections",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-white">
      {/* Slides */}
      <div className="relative w-full h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-6">
                    {slide.description}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-green-600"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
