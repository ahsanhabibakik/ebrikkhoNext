"use client";

import Image from "next/image";
import Link from "next/link";

const featuredPosts = [
  {
    id: 1,
    title: "Essential Plant Care Tips for Beginners",
    excerpt:
      "Learn the basics of plant care to keep your green friends thriving.",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
    category: "Plant Care",
    date: "March 15, 2024",
  },
  {
    id: 2,
    title: "Best Indoor Plants for Low Light",
    excerpt: "Discover plants that thrive in low-light conditions.",
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
    category: "Indoor Plants",
    date: "March 12, 2024",
  },
  {
    id: 3,
    title: "Creating a Plant Care Routine",
    excerpt: "Establish a simple yet effective plant care schedule.",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
    category: "Plant Care",
    date: "March 10, 2024",
  },
];

export default function BlogSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Quick tips and guides about plants and gardening
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 sm:h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-green-600">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-sm text-green-600 font-medium hover:text-green-700"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
