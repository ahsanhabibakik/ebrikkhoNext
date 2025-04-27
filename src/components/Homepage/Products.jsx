import React from "react";
import ProductCard from "../ProductCard";
import products from "@/lib/products";

const Products = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
          Our Featured Plants
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Discover indoor & outdoor plants, rare greens, and seasonal favorites
          — all handpicked for your home and garden.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="animate-fadeInUp transform transition duration-300 ease-in-out"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition">
          🌿 See All Products
        </button>
      </div>
    </section>
  );
};

export default Products;
