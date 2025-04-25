"use client";

import { useState } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CategoryFilter from "@/components/gallery/CategoryFilter";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Indoor Arrangements",
    "Outdoor Gardens",
    "Office Spaces",
    "Customer Projects",
    "Seasonal Displays",
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Modern Office Greenery",
      category: "Office Spaces",
      image: "https://picsum.photos/800/600?random=1",
      likes: 128,
      shares: 45,
    },
    {
      id: 2,
      title: "Tropical Indoor Paradise",
      category: "Indoor Arrangements",
      image: "https://picsum.photos/800/600?random=2",
      likes: 256,
      shares: 78,
    },
    {
      id: 3,
      title: "Urban Balcony Garden",
      category: "Outdoor Gardens",
      image: "https://picsum.photos/800/600?random=3",
      likes: 192,
      shares: 62,
    },
    {
      id: 4,
      title: "Customer's Living Room",
      category: "Customer Projects",
      image: "https://picsum.photos/800/600?random=4",
      likes: 164,
      shares: 53,
    },
    {
      id: 5,
      title: "Spring Floral Display",
      category: "Seasonal Displays",
      image: "https://picsum.photos/800/600?random=5",
      likes: 215,
      shares: 71,
    },
    {
      id: 6,
      title: "Corporate Lobby Design",
      category: "Office Spaces",
      image: "https://picsum.photos/800/600?random=6",
      likes: 178,
      shares: 49,
    },
    {
      id: 7,
      title: "Minimalist Plant Corner",
      category: "Indoor Arrangements",
      image: "https://picsum.photos/800/600?random=7",
      likes: 231,
      shares: 67,
    },
    {
      id: 8,
      title: "Rooftop Garden",
      category: "Outdoor Gardens",
      image: "https://picsum.photos/800/600?random=8",
      likes: 203,
      shares: 58,
    },
  ];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?random=9')] bg-cover bg-center" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
            <p className="text-xl md:text-2xl">
              Inspiring plant arrangements and projects
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <GalleryGrid items={filteredItems} />

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Want to Feature Your Space?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Share your plant arrangements with our community and inspire
                others.
              </p>
              <button className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Submit Your Photos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
