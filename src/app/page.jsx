"use client";

import HeroSection from "@/components/Homepage/HeroSection";
import FeaturedProducts from "@/components/Homepage/FeaturedProducts";
import SpecialOffers from "@/components/Homepage/SpecialOffers";
import BlogSection from "@/components/Homepage/BlogSection";
import AboutSection from "@/components/Homepage/AboutSection";
import {
  homepageData,
  slides,
  categories,
  features,
  stats,
  plantCareTips,
} from "@/data/homepage";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturedProducts
        products={homepageData.featuredProducts}
        title="Featured Products"
        description="Discover our most popular and trending products"
      />
      <SpecialOffers />
      <AboutSection />
      <FeaturedProducts
        products={homepageData.bestSellers}
        title="Best Sellers"
        description="Our most loved products by customers"
      />
      <BlogSection />
      <FeaturedProducts
        products={homepageData.newArrivals}
        title="New Arrivals"
        description="Check out our latest products"
      />
    </main>
  );
}
