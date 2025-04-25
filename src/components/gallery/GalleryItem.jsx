"use client";

import Image from "next/image";
import { Heart, Share2 } from "lucide-react";

export default function GalleryItem({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative h-64">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white font-semibold mb-2">{item.title}</h3>
          <p className="text-white/80 text-sm mb-2">{item.category}</p>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {item.likes}
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              {item.shares}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
