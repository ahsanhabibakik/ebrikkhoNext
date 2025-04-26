"use client";

import LeafPattern from "../shared/LeafPattern";

export default function CTASection() {
  // Additional leaves for a more intricate pattern
  const additionalLeaves = [
    { top: "15%", left: "30%", rotate: "30", size: 28 },
    { top: "25%", right: "25%", rotate: "-45", size: 24 },
    { bottom: "20%", left: "35%", rotate: "60", size: 26 },
    { bottom: "30%", right: "30%", rotate: "-60", size: 22 },
    { top: "40%", left: "20%", rotate: "15", size: 20 },
    { top: "50%", right: "15%", rotate: "-25", size: 18 },
    { bottom: "40%", left: "25%", rotate: "75", size: 24 },
    { bottom: "50%", right: "20%", rotate: "-35", size: 20 },
  ];

  return (
    <section className="py-16 bg-orange-600 text-white relative overflow-hidden">
      <LeafPattern
        opacity={15}
        leafSizes={{
          topLeft: 40,
          topRight: 35,
          bottomLeft: 30,
          bottomRight: 38,
        }}
        leafPositions={{
          topLeft: { top: "10%", left: "10%", rotate: "12" },
          topRight: { top: "15%", right: "15%", rotate: "-12" },
          bottomLeft: { bottom: "10%", left: "15%", rotate: "45" },
          bottomRight: { bottom: "15%", right: "10%", rotate: "-30" },
        }}
        additionalLeaves={additionalLeaves}
        color="orange-200"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Space?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of happy customers who have already enhanced their
          homes with our plants
        </p>
        <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Shop Now
        </button>
      </div>
    </section>
  );
}
