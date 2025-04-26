"use client";

import { Droplet, Sun, Flower, Bug } from "lucide-react";

export default function PlantCareTipsSection({ tips }) {
  // Default tips if none are provided
  const defaultTips = [
    {
      title: "Watering Guide",
      description:
        "Learn the right way to water your plants based on their type and season",
      icon: <Droplet className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Light Requirements",
      description: "Understand how much light your plants need to thrive",
      icon: <Sun className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Soil & Fertilizer",
      description:
        "Choose the right soil and fertilizer for healthy plant growth",
      icon: <Flower className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Pest Control",
      description: "Natural ways to keep your plants pest-free",
      icon: <Bug className="w-6 h-6 text-green-600" />,
    },
  ];

  // Use provided tips or default tips
  const displayTips = tips || defaultTips;

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Flower className="w-10 h-10 text-green-600" />
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
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
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
