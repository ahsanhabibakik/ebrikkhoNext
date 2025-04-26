"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "New Arrivals",
    subtitle: "Fresh Plants",
    description: "Check out our latest collection of indoor plants",
    cta: "Explore",
    link: "/new-arrivals",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Summer Special",
    subtitle: "Up to 40% Off",
    description: "Get your favorite plants at amazing prices",
    cta: "View Offers",
    link: "/offers",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Expert Care",
    subtitle: "Plant Care Guides",
    description: "Learn how to keep your plants thriving",
    cta: "Learn More",
    link: "/care-guides",
  },
];

const categories = [
  {
    id: 1,
    name: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/category/indoor",
  },
  {
    id: 2,
    name: "Outdoor Plants",
    image:
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/category/outdoor",
  },
  {
    id: 3,
    name: "Gardening Tools",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/category/tools",
  },
  {
    id: 4,
    name: "Plant Care",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/category/care",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative">
      {/* Hero Slider */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 sm:mb-4">
                    {slide.subtitle}
                  </h2>
                  <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-8">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-block bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-orange-700 transition-colors"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 -mt-8 sm:-mt-12 md:-mt-20 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative h-24 sm:h-32 overflow-hidden rounded-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-sm sm:text-base font-semibold text-center px-2">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
