"use client";

import React from "react";
import Image from "next/image";

export default function CategorySlider({ categories }) {
  return (
    <div className="flex overflow-x-auto space-x-4">
      {categories.map((category) => (
        <div key={category.id} className="relative w-64 h-64">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-b-xl">
            {category.name}
          </div>
        </div>
      ))}
    </div>
  );
}
