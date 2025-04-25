"use client";

import { Calendar, Clock, Tag, Search } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const featuredPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Indoor Plant Care",
      excerpt:
        "Learn the best practices for keeping your indoor plants healthy and thriving throughout the year.",
      image: "/images/blog/indoor-plants.jpg",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Plant Care",
    },
    {
      id: 2,
      title: "Creating a Sustainable Garden in Urban Spaces",
      excerpt:
        "Discover how to transform your small urban space into a sustainable garden oasis.",
      image: "/images/blog/urban-garden.jpg",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Gardening",
    },
  ];

  const recentPosts = [
    {
      id: 3,
      title: "Best Plants for Beginners",
      excerpt:
        "A guide to choosing the perfect plants for those new to gardening.",
      image: "/images/blog/beginner-plants.jpg",
      date: "March 5, 2024",
      readTime: "4 min read",
      category: "Plant Care",
    },
    {
      id: 4,
      title: "Seasonal Plant Care Guide",
      excerpt: "Learn how to care for your plants during different seasons.",
      image: "/images/blog/seasonal-care.jpg",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "Plant Care",
    },
    {
      id: 5,
      title: "DIY Plant Decor Ideas",
      excerpt: "Creative ways to incorporate plants into your home decor.",
      image: "/images/blog/plant-decor.jpg",
      date: "February 20, 2024",
      readTime: "5 min read",
      category: "Decor",
    },
  ];

  const categories = [
    "All Posts",
    "Plant Care",
    "Gardening",
    "Decor",
    "Sustainability",
    "Tips & Tricks",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/images/blog-bg.jpg')] bg-cover bg-center" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl md:text-2xl">
              Expert tips and insights for plant lovers
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Search */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Search
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-50 text-gray-600 hover:text-orange-600 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Indoor Plants",
                      "Gardening",
                      "Care Tips",
                      "Decor",
                      "Sustainability",
                      "Beginner Guide",
                    ].map((tag, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm hover:bg-orange-100 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-12">
                {/* Featured Posts */}
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {post.category}
                          </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                          Read More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Posts */}
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recent Posts
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {recentPosts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                      >
                        <div className="relative h-40">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {post.category}
                            </div>
                          </div>
                          <h2 className="text-lg font-bold text-gray-900 mb-2">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                            Read More →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
