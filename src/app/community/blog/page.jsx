"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag } from "lucide-react";

// This would typically come from an API or database
const blogs = [
  {
    id: 1,
    title: "10 Essential Tips for Indoor Plant Care",
    author: "Sarah Johnson",
    date: "2024-03-10",
    category: "Plant Care",
    image: "https://placehold.co/600x400/orange/white?text=Indoor+Plant+Care",
    excerpt:
      "Learn the essential tips and tricks to keep your indoor plants thriving and healthy.",
    tags: ["Indoor Plants", "Plant Care", "Gardening Tips"],
  },
  {
    id: 2,
    title: "The Ultimate Guide to Succulent Care",
    author: "Michael Chen",
    date: "2024-03-08",
    category: "Plant Care",
    image: "https://placehold.co/600x400/orange/white?text=Succulent+Care",
    excerpt:
      "Discover how to care for succulents and create a beautiful desert garden in your home.",
    tags: ["Succulents", "Plant Care", "Desert Plants"],
  },
  {
    id: 3,
    title: "Seasonal Gardening: Spring Edition",
    author: "Emma Wilson",
    date: "2024-03-05",
    category: "Seasonal Gardening",
    image: "https://placehold.co/600x400/orange/white?text=Spring+Gardening",
    excerpt:
      "Get ready for spring with our comprehensive guide to seasonal gardening and plant care.",
    tags: ["Seasonal Gardening", "Spring", "Outdoor Plants"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-orange-100">
            Discover tips, tricks, and insights about plants and gardening
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <Link
              key={post.id}
              href={`/community/blog/${post.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
