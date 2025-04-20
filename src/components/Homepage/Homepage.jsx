import React from "react";
import Banner from "./Banner";
import About from "./About";
import Services from "./Services";
import ProductCard from "../ProductCard";
import products from "@/lib/products";

const Homepage = () => {
  return (
    <div className="w-full">
      {/* Banner Section */}
      <section className="w-full">
        <Banner />
      </section>

      {/* Products Section */}
      <section className="w-full py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="btn btn-primary">See All Products</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <About />
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4">
          <Services />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
