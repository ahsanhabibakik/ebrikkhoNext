"use client";

import { useState } from "react";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import GalleryCTA from "@/components/gallery/GalleryCTA";
import { categories, galleryItems } from "@/data/gallery";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryHero />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <GalleryGrid items={filteredItems} />
            <GalleryCTA />
          </div>
        </div>
      </section>
    </div>
  );
}
