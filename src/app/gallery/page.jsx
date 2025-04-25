"use client";

import { Image as ImageIcon, Heart, Share2 } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
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
      image: "/images/gallery/office-1.jpg",
      likes: 128,
      shares: 45,
    },
    {
      id: 2,
      title: "Tropical Indoor Paradise",
      category: "Indoor Arrangements",
      image: "/images/gallery/indoor-1.jpg",
      likes: 256,
      shares: 78,
    },
    {
      id: 3,
      title: "Urban Balcony Garden",
      category: "Outdoor Gardens",
      image: "/images/gallery/outdoor-1.jpg",
      likes: 192,
      shares: 62,
    },
    {
      id: 4,
      title: "Customer's Living Room",
      category: "Customer Projects",
      image: "/images/gallery/customer-1.jpg",
      likes: 164,
      shares: 53,
    },
    {
      id: 5,
      title: "Spring Floral Display",
      category: "Seasonal Displays",
      image: "/images/gallery/seasonal-1.jpg",
      likes: 215,
      shares: 71,
    },
    {
      id: 6,
      title: "Corporate Lobby Design",
      category: "Office Spaces",
      image: "/images/gallery/office-2.jpg",
      likes: 178,
      shares: 49,
    },
    {
      id: 7,
      title: "Minimalist Plant Corner",
      category: "Indoor Arrangements",
      image: "/images/gallery/indoor-2.jpg",
      likes: 231,
      shares: 67,
    },
    {
      id: 8,
      title: "Rooftop Garden",
      category: "Outdoor Gardens",
      image: "/images/gallery/outdoor-2.jpg",
      likes: 203,
      shares: 58,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/images/gallery-bg.jpg')] bg-cover bg-center" />
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
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-2">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {item.shares}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
