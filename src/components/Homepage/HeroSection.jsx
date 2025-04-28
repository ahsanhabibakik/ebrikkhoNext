"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/images/slider/slider-green-living-indoor-plants.jpg",
    link: "/indoor-plants",
  },
  {
    id: 2,
    image: "/images/slider/slider-outdoor-plant-collection.jpg",
    link: "/outdoor-plants",
  },
  {
    id: 3,
    image: "/images/slider/slider-gardening-kits-essentials.jpg",
    link: "/gardening-kits",
  },
  {
    id: 4,
    image: "/images/slider/slider-sustainable-gifts-decor.jpg",
    link: "/sustainable-gifts",
  },
  {
    id: 5,
    image: "/images/slider/slider-grow-greener-tomorrow.jpg",
    link: "/urban-green",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Touch/mouse drag state
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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

  // Touch event handlers
  const handleTouchStart = (e) => {
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    // Prevent scrolling while dragging
    if (e.touches) e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging || startX === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX;
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    setIsDragging(false);
    setStartX(null);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    // Prevent unwanted selection
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (!isDragging || startX === null) return;
    const endX = e.clientX;
    const diff = endX - startX;
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <div className="relative">
      {/* Hero Slider */}
      <div
        className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
          setStartX(null);
        }}
        style={{ touchAction: "pan-y" }}
      >
        {slides.map((slide, index) => (
          <Link
            key={slide.id}
            href={slide.link}
            className={`absolute inset-0 transition-opacity duration-1000 z-0 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0"
            }`}
            tabIndex={-1}
            draggable={false}
          >
            <Image
              src={slide.image}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover pointer-events-none"
              priority={index === 0}
              draggable={false}
            />
          </Link>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-56 h-2 flex items-center z-20">
          <div className="relative w-full h-2 bg-white/40 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500"
              style={{
                width: `${100 / slides.length}%`,
                left: `${(100 / slides.length) * currentSlide}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
