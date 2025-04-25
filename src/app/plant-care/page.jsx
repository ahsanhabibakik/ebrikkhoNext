"use client";

import {
  Droplets,
  Sun,
  Thermometer,
  Leaf,
  BookOpen,
  Video,
} from "lucide-react";
import Image from "next/image";

export default function PlantCarePage() {
  const careGuides = [
    {
      id: 1,
      title: "Watering Guide",
      description:
        "Learn the right way to water your plants for optimal growth.",
      icon: <Droplets className="w-8 h-8" />,
      image: "/images/plant-care/watering.jpg",
    },
    {
      id: 2,
      title: "Light Requirements",
      description: "Understand the lighting needs of different plant species.",
      icon: <Sun className="w-8 h-8" />,
      image: "/images/plant-care/light.jpg",
    },
    {
      id: 3,
      title: "Temperature Control",
      description: "Maintain the perfect temperature for your plants.",
      icon: <Thermometer className="w-8 h-8" />,
      image: "/images/plant-care/temperature.jpg",
    },
    {
      id: 4,
      title: "Plant Nutrition",
      description:
        "Essential nutrients and fertilization tips for healthy plants.",
      icon: <Leaf className="w-8 h-8" />,
      image: "/images/plant-care/nutrition.jpg",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Beginner's Guide to Plant Care",
      type: "Article",
      icon: <BookOpen className="w-6 h-6" />,
      duration: "10 min read",
    },
    {
      id: 2,
      title: "Common Plant Problems & Solutions",
      type: "Video",
      icon: <Video className="w-6 h-6" />,
      duration: "15 min",
    },
    {
      id: 3,
      title: "Seasonal Plant Care Calendar",
      type: "Guide",
      icon: <BookOpen className="w-6 h-6" />,
      duration: "5 min read",
    },
    {
      id: 4,
      title: "Plant Propagation Techniques",
      type: "Video",
      icon: <Video className="w-6 h-6" />,
      duration: "20 min",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/images/plant-care-bg.jpg')] bg-cover bg-center" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plant Care Guide
            </h1>
            <p className="text-xl md:text-2xl">
              Expert tips and resources for healthy plants
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Care Guides */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Essential Care Guides
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {careGuides.map((guide) => (
                  <div
                    key={guide.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={guide.image}
                        alt={guide.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                          {guide.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {guide.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{guide.description}</p>
                      <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                        Learn More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Helpful Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        {resource.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {resource.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Personalized Help?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Our plant care experts are here to help you with any questions
                or concerns about your plants.
              </p>
              <button className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
