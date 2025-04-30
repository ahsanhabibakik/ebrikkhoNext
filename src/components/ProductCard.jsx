"use client";

import React from "react";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-xl"
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span>{product.price}</span>
    </div>
  );
}