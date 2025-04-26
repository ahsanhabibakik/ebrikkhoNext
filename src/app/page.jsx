"use client";

import HeroSection from "@/components/Homepage/HeroSection";
import FeaturedProducts from "@/components/Homepage/FeaturedProducts";
import SpecialOffers from "@/components/Homepage/SpecialOffers";
import AboutSection from "@/components/Homepage/AboutSection";
import USPSection from "@/components/Homepage/USPSection";
import PlantCategories from "@/components/Homepage/PlantCategories";
import FeaturesSection from "@/components/Homepage/FeaturesSection";
import BlogSection from "@/components/Homepage/BlogSection";
import StatsSection from "@/components/Homepage/StatsSection";
import PlantCareTipsSection from "@/components/Homepage/PlantCareTipsSection";
import CTASection from "@/components/Homepage/CTASection";
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
      {/* Hero Section with Featured Categories */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts
        products={homepageData.featuredProducts}
        title="Featured Products"
        description="Discover our most popular and trending products"
      />

      {/* Special Offers */}
      <SpecialOffers />

      {/* About Section */}
      <AboutSection />

      {/* USP Section */}
      <USPSection />

      {/* Plant Categories */}
      <PlantCategories categories={categories} />

      {/* Best Sellers */}
      <FeaturedProducts
        products={homepageData.bestSellers}
        title="Best Sellers"
        description="Our most loved products by customers"
      />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Blog Section */}
      <BlogSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Plant Care Tips */}
      <PlantCareTipsSection tips={plantCareTips} />

      {/* New Arrivals */}
      <FeaturedProducts
        products={homepageData.newArrivals}
        title="New Arrivals"
        description="Check out our latest products"
      />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
