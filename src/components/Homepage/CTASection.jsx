"use client";

import LeafPattern from "../shared/LeafPattern";

export default function CTASection() {
  return (
    <section className="py-16 bg-orange-600 text-white relative overflow-hidden">
      <LeafPattern />

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
