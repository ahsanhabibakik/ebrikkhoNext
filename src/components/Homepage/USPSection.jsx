"use client";

import Image from "next/image";
import { Leaf, Zap, Sparkles } from "lucide-react";
import LeafPattern from "../shared/LeafPattern";

export default function USPSection() {
  // Additional leaves for a more intricate pattern
  const additionalLeaves = [
    { top: "8%", left: "20%", rotate: "20", size: 18 },
    { top: "15%", right: "15%", rotate: "-25", size: 22 },
    { bottom: "10%", left: "25%", rotate: "40", size: 20 },
    { bottom: "20%", right: "20%", rotate: "-45", size: 16 },
    { top: "30%", left: "10%", rotate: "5", size: 14 },
    { top: "40%", right: "8%", rotate: "-15", size: 18 },
    { bottom: "30%", left: "15%", rotate: "55", size: 20 },
    { bottom: "40%", right: "12%", rotate: "-35", size: 16 },
  ];

  return (
    <section className="py-12 bg-orange-50 relative overflow-hidden">
      <LeafPattern
        opacity={8}
        leafSizes={{
          topLeft: 40,
          topRight: 30,
          bottomLeft: 35,
          bottomRight: 25,
        }}
        leafPositions={{
          topLeft: { top: "10%", left: "5%", rotate: "12" },
          topRight: { top: "5%", right: "10%", rotate: "-12" },
          bottomLeft: { bottom: "5%", left: "15%", rotate: "45" },
          bottomRight: { bottom: "15%", right: "5%", rotate: "-30" },
        }}
        additionalLeaves={additionalLeaves}
        color="orange-800"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Leaf className="w-10 h-10 text-orange-600" />
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the unique benefits of choosing our plant collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60"
              alt="Beautiful indoor plants"
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Living Decor */}
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Leaf className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Living Decor
                  </h3>
                  <p className="text-gray-600">
                    Elevate your interior with nature's finest. Our plants add
                    vibrant colors, textures, and life to any room, creating an
                    inviting and refreshing atmosphere.
                  </p>
                </div>
              </div>

              {/* Energy Boost */}
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Energy Boost
                  </h3>
                  <p className="text-gray-600">
                    Experience the natural energy that plants bring to your
                    space. Our selection includes air-purifying plants that
                    improve indoor air quality and create a more vibrant living
                    environment.
                  </p>
                </div>
              </div>

              {/* Timeless Elegance */}
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Sparkles className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Timeless Elegance
                  </h3>
                  <p className="text-gray-600">
                    Discover the perfect balance of style and sustainability.
                    Our plants are chosen for their enduring beauty and ability
                    to enhance your home's aesthetic while requiring minimal
                    maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
