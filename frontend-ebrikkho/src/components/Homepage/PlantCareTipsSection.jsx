"use client";

import { Droplet, Sun, Flower, Bug, Leaf } from "lucide-react";
import LeafPattern from "../shared/LeafPattern";

export default function PlantCareTipsSection({ tips }) {
  // Default tips if none are provided
  const defaultTips = [
    {
      title: "Watering Guide",
      description:
        "Learn the right way to water your plants based on their type and season",
      icon: <Droplet className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Light Requirements",
      description: "Understand how much light your plants need to thrive",
      icon: <Sun className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Soil & Fertilizer",
      description:
        "Choose the right soil and fertilizer for healthy plant growth",
      icon: <Flower className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Pest Control",
      description: "Natural ways to keep your plants pest-free",
      icon: <Bug className="w-6 h-6 text-orange-600" />,
    },
  ];

  // Use provided tips or default tips
  const displayTips = tips || defaultTips;

  // Additional leaves for a more intricate pattern
  const additionalLeaves = [
    { top: "5%", left: "15%", rotate: "15", size: 20 },
    { top: "12%", right: "12%", rotate: "-20", size: 18 },
    { bottom: "8%", left: "20%", rotate: "35", size: 22 },
    { bottom: "15%", right: "18%", rotate: "-40", size: 16 },
    { top: "25%", left: "10%", rotate: "5", size: 14 },
    { top: "35%", right: "8%", rotate: "-15", size: 18 },
    { bottom: "25%", left: "15%", rotate: "45", size: 20 },
    { bottom: "35%", right: "10%", rotate: "-30", size: 16 },
  ];

  return (
    <section className="py-16 bg-orange-50 relative overflow-hidden">
      <LeafPattern
        opacity={8}
        leafSizes={{
          topLeft: 35,
          topRight: 30,
          bottomLeft: 25,
          bottomRight: 32,
        }}
        leafPositions={{
          topLeft: { top: "8%", left: "8%", rotate: "10" },
          topRight: { top: "12%", right: "12%", rotate: "-10" },
          bottomLeft: { bottom: "8%", left: "12%", rotate: "40" },
          bottomRight: { bottom: "12%", right: "8%", rotate: "-25" },
        }}
        additionalLeaves={additionalLeaves}
        color="orange-500"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Flower className="w-10 h-10 text-orange-600" />
            Plant Care Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice to help your plants thrive and grow beautifully
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{tip.title}</h3>
              </div>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
