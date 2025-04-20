"use client";
import React from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <figure className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-between items-center">
          <span className="text-lg font-bold">৳{product.price}</span>
          <button className="btn btn-sm btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
