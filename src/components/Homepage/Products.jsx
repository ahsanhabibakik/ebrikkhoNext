import React from "react";
import ProductCard from "../ProductCard";
import products from "@/lib/products";

const Products = () => {
  return (
    <div className="py-12 px-4">
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
  );
};

export default Products;
