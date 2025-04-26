import Link from "next/link";
import Image from "next/image";

const BlogSection = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Essential Plant Care Tips for Beginners",
      excerpt:
        "Learn the basics of plant care and how to keep your plants thriving...",
      image: "/images/blog/plant-care.jpg",
      category: "Plant Care",
      date: "March 15, 2024",
    },
    {
      id: 2,
      title: "Top 10 Indoor Plants for Air Purification",
      excerpt:
        "Discover which plants are best for improving indoor air quality...",
      image: "/images/blog/air-purifying.jpg",
      category: "Indoor Plants",
      date: "March 10, 2024",
    },
    {
      id: 3,
      title: "How to Create a Beautiful Garden on a Budget",
      excerpt:
        "Tips and tricks for creating an amazing garden without breaking the bank...",
      image: "/images/blog/garden-budget.jpg",
      category: "Gardening",
      date: "March 5, 2024",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest articles, tips, and guides about plants
            and gardening
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
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
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm font-medium text-green-600">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-green-600 font-medium hover:text-green-700"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
