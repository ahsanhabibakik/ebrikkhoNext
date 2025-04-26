"use client";

import {
  ShoppingCart,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Phone,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import { Check } from "lucide-react";
import LeafPattern from "../shared/LeafPattern";

export default function FeaturesSection({ features }) {
  // Default features if none are provided
  const defaultFeatures = [
    {
      title: "Shop Plants",
      description: "Browse our wide selection of indoor and outdoor plants",
      icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
      link: "/shop",
    },
    {
      title: "Plant Care Guide",
      description: "Learn how to care for your plants with our expert tips",
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      link: "/plant-care",
    },
    {
      title: "Our Gallery",
      description: "View inspiring plant arrangements and customer projects",
      icon: <ImageIcon className="w-6 h-6 text-green-600" />,
      link: "/gallery",
    },
    {
      title: "Testimonials",
      description: "Read what our customers say about our services",
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      link: "/testimonials",
    },
    {
      title: "About Us",
      description: "Learn about our story and mission",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      link: "/about",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our plant experts",
      icon: <Phone className="w-6 h-6 text-green-600" />,
      link: "/contact",
    },
  ];

  // Use provided features or default features
  const displayFeatures = features || defaultFeatures;

  // Additional leaves for a more intricate pattern
  const additionalLeaves = [
    { top: "10%", left: "25%", rotate: "25", size: 22 },
    { top: "20%", right: "20%", rotate: "-35", size: 20 },
    { bottom: "15%", left: "30%", rotate: "50", size: 24 },
    { bottom: "25%", right: "25%", rotate: "-55", size: 18 },
    { top: "35%", left: "15%", rotate: "10", size: 16 },
    { top: "45%", right: "10%", rotate: "-20", size: 20 },
    { bottom: "35%", left: "20%", rotate: "65", size: 22 },
    { bottom: "45%", right: "15%", rotate: "-40", size: 18 },
  ];

  return (
    <section className="py-16 bg-orange-50 relative overflow-hidden">
      <LeafPattern
        opacity={8}
        leafSizes={{
          topLeft: 45,
          topRight: 35,
          bottomLeft: 30,
          bottomRight: 40,
        }}
        leafPositions={{
          topLeft: { top: "15%", left: "10%", rotate: "12" },
          topRight: { top: "10%", right: "15%", rotate: "-12" },
          bottomLeft: { bottom: "15%", left: "10%", rotate: "45" },
          bottomRight: { bottom: "10%", right: "15%", rotate: "-30" },
        }}
        additionalLeaves={additionalLeaves}
        color="orange-800"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Leaf className="w-10 h-10 text-orange-600" />
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the best plant care services and products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
