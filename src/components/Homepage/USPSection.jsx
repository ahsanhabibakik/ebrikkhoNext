"use client";

import Image from "next/image";
import { Leaf, Zap, Sparkles } from "lucide-react";

export default function USPSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
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
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Blend Beauty & Purpose
              </h2>
              <p className="text-gray-600">
                Transform your space with our carefully curated collection of
                plants that bring both aesthetic appeal and functional benefits
                to your home.
              </p>
            </div>

            <div className="space-y-6">
              {/* Living Decor */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
