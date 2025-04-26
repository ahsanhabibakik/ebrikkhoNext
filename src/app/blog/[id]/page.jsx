"use client";

import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// This would typically come from an API or database
const blogPosts = {
  1: {
    id: 1,
    title: "Essential Plant Care Tips for Beginners",
    content: `
      <p>Taking care of plants can seem daunting at first, but with the right knowledge and approach, anyone can become a successful plant parent. Here are some essential tips to get you started:</p>
      
      <h2>1. Understand Your Plant's Needs</h2>
      <p>Every plant has specific requirements for light, water, and soil. Research your plant's needs or ask for care instructions when purchasing.</p>
      
      <h2>2. Proper Watering Techniques</h2>
      <p>Overwatering is one of the most common mistakes. Check the soil moisture before watering and ensure proper drainage.</p>
      
      <h2>3. Light Requirements</h2>
      <p>Place your plants in appropriate lighting conditions. Some plants thrive in direct sunlight, while others prefer indirect or low light.</p>
      
      <h2>4. Soil and Fertilizer</h2>
      <p>Use the right type of soil for your plants and fertilize during the growing season to promote healthy growth.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
    category: "Plant Care",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  2: {
    id: 2,
    title: "Best Indoor Plants for Low Light",
    content: `
      <p>Not all homes have abundant natural light, but that doesn't mean you can't enjoy indoor plants. Here are some of the best plants that thrive in low-light conditions:</p>
      
      <h2>1. Snake Plant (Sansevieria)</h2>
      <p>Known for its hardiness and ability to survive in almost any condition, the snake plant is perfect for beginners.</p>
      
      <h2>2. ZZ Plant (Zamioculcas zamiifolia)</h2>
      <p>This plant can survive with minimal light and water, making it ideal for busy plant parents.</p>
      
      <h2>3. Pothos</h2>
      <p>A versatile vine that can adapt to various light conditions and is easy to care for.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
    category: "Indoor Plants",
    date: "March 12, 2024",
    readTime: "4 min read",
  },
  3: {
    id: 3,
    title: "Creating a Plant Care Routine",
    content: `
      <p>Establishing a consistent plant care routine is key to maintaining healthy, thriving plants. Here's how to create an effective routine:</p>
      
      <h2>1. Daily Tasks</h2>
      <p>Check soil moisture, remove dead leaves, and ensure proper light exposure.</p>
      
      <h2>2. Weekly Tasks</h2>
      <p>Water plants as needed, dust leaves, and inspect for pests.</p>
      
      <h2>3. Monthly Tasks</h2>
      <p>Fertilize during growing season, prune if necessary, and rotate plants for even growth.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
    category: "Plant Care",
    date: "March 10, 2024",
    readTime: "6 min read",
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts[params.id];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link href="/blog" className="text-green-600 hover:text-green-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-white mb-4 hover:text-green-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80">
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
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg prose-green max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
