"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/Homepage/HeroSection";
import FeaturedProducts from "@/components/Homepage/FeaturedProducts";
import SpecialOffers from "@/components/shared/SpecialOffers";
import AboutSection from "@/components/Homepage/AboutSection";
import USPSection from "@/components/Homepage/USPSection";
import PlantCategories from "@/components/Homepage/PlantCategories";
import BlogSection from "@/components/Homepage/BlogSection";
import CTASection from "@/components/Homepage/CTASection";
import { homepageData, categories } from "@/data/homepage";
import CategorySlider from "@/components/Homepage/CategorySlider";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures client-specific rendering
  }, []);

  return (
    <main className="min-h-screen max-w-screen-xl mx-auto mb-10 bg-white">
      <HeroSection />
      <CategorySlider />
      <div className="mt-0">
        <FeaturedProducts products={homepageData.featuredProducts} />
      </div>
      <SpecialOffers />
      <AboutSection />

      {/* USP Section */}
      {/* <USPSection /> */}

      {/* Plant Categories */}
      <PlantCategories categories={categories} />

      {/* Best Sellers */}
      <FeaturedProducts
        products={homepageData.bestSellers}
        title="Best Sellers"
        description="Our most loved products by customers"
      />

      {/* Blog Section */}
      <BlogSection />

      {/* New Arrivals */}
      {isClient && (
        <FeaturedProducts
          products={homepageData.newArrivals}
          title="New Arrivals"
          description="Check out our latest products"
        />
      )}

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
