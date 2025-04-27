"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, Share2 } from "lucide-react";

// This would typically come from an API or database
const blogs = [
  {
    id: 1,
    title: "10 Essential Tips for Indoor Plant Care",
    author: "Sarah Johnson",
    date: "2024-03-10",
    category: "Plant Care",
    image: "https://placehold.co/600x400/orange/white?text=Indoor+Plant+Care",
    content: `
      <p class="text-gray-800">Indoor plants can transform your living space into a vibrant, healthy environment. However, keeping them thriving requires some knowledge and attention. Here are 10 essential tips to help your indoor plants flourish:</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Choose the Right Plant for Your Space</h2>
      <p class="text-gray-800">Consider the lighting conditions, humidity levels, and temperature of your space before selecting a plant. Some plants thrive in bright, indirect light, while others prefer low-light conditions.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Water Properly</h2>
      <p class="text-gray-800">Overwatering is one of the most common causes of plant death. Check the soil moisture before watering, and ensure your pots have proper drainage. Most plants prefer to dry out slightly between waterings.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Provide Adequate Light</h2>
      <p class="text-gray-800">Different plants have different light requirements. Place your plants in locations that match their needs, and rotate them occasionally to ensure even growth.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">4. Maintain Proper Humidity</h2>
      <p class="text-gray-800">Many indoor plants come from tropical environments and prefer higher humidity. Consider using a humidifier or placing plants on a pebble tray with water.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">5. Fertilize Regularly</h2>
      <p class="text-gray-800">Use a balanced fertilizer during the growing season to provide essential nutrients. Follow the package instructions for proper application.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">6. Prune and Clean</h2>
      <p class="text-gray-800">Regular pruning helps maintain plant shape and encourages new growth. Clean leaves regularly to remove dust and allow for better light absorption.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">7. Monitor for Pests</h2>
      <p class="text-gray-800">Check your plants regularly for signs of pests. Early detection and treatment can prevent serious infestations.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">8. Repot When Necessary</h2>
      <p class="text-gray-800">Plants outgrow their containers over time. Repot when roots become crowded or when the plant shows signs of stress.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">9. Consider Seasonal Changes</h2>
      <p class="text-gray-800">Adjust your care routine based on the season. Plants typically need less water and fertilizer during winter months.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">10. Learn Your Plant's Specific Needs</h2>
      <p class="text-gray-800">Each plant species has unique requirements. Take time to research and understand the specific needs of your plants.</p>

      <p class="text-gray-800 mt-6">By following these tips, you'll be well on your way to creating a thriving indoor garden. Remember that plant care is a learning process, and each plant will teach you something new about its needs and preferences.</p>
    `,
    tags: ["Indoor Plants", "Plant Care", "Gardening Tips"],
    relatedPosts: [2, 3],
  },
  {
    id: 2,
    title: "The Ultimate Guide to Succulent Care",
    author: "Michael Chen",
    date: "2024-03-08",
    category: "Plant Care",
    image: "https://placehold.co/600x400/orange/white?text=Succulent+Care",
    content: `
      <p class="text-gray-800">Succulents are known for their low-maintenance nature and unique beauty. However, they still require proper care to thrive. Here's your comprehensive guide to succulent care:</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Understanding Succulents</h2>
      <p class="text-gray-800">Succulents are plants that store water in their leaves, stems, or roots. This adaptation allows them to survive in arid conditions, but it also means they have specific care requirements.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Light Requirements</h2>
      <p class="text-gray-800">Most succulents need bright, indirect light. Place them near a south or east-facing window for optimal growth. Be careful with direct sunlight, as it can cause sunburn.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Watering Techniques</h2>
      <p class="text-gray-800">The key to succulent care is proper watering. Water deeply but infrequently, allowing the soil to dry out completely between waterings. Overwatering is the most common cause of succulent death.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">4. Soil and Potting</h2>
      <p class="text-gray-800">Use a well-draining soil mix specifically designed for succulents. The pot should have drainage holes to prevent water from accumulating at the bottom.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">5. Temperature and Humidity</h2>
      <p class="text-gray-800">Succulents prefer warm temperatures and low humidity. Most varieties do well in temperatures between 60-80°F (15-27°C).</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">6. Propagation</h2>
      <p class="text-gray-800">Succulents are easy to propagate. You can grow new plants from leaves, stem cuttings, or offsets. This is a great way to expand your collection or share with friends.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">7. Common Problems</h2>
      <p class="text-gray-800">Learn to recognize signs of overwatering, underwatering, and pest infestations. Early detection and treatment can save your plants.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">8. Seasonal Care</h2>
      <p class="text-gray-800">Adjust your care routine based on the season. Succulents typically need less water during winter months when they're dormant.</p>

      <p class="text-gray-800 mt-6">With proper care, your succulents will reward you with their unique beauty and resilience. Remember that each species may have slightly different requirements, so always research your specific plants.</p>
    `,
    tags: ["Succulents", "Plant Care", "Desert Plants"],
    relatedPosts: [1, 3],
  },
  {
    id: 3,
    title: "Seasonal Gardening: Spring Edition",
    author: "Emma Wilson",
    date: "2024-03-05",
    category: "Seasonal Gardening",
    image: "https://placehold.co/600x400/orange/white?text=Spring+Gardening",
    content: `
      <p class="text-gray-800">Spring is a time of renewal and growth in the garden. It's the perfect season to start new projects and prepare your garden for the year ahead. Here's your guide to spring gardening:</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Spring Garden Preparation</h2>
      <p class="text-gray-800">Start by cleaning up your garden. Remove dead leaves, prune winter damage, and prepare your soil for new plantings. This is also a good time to test your soil and add necessary amendments.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Early Spring Planting</h2>
      <p class="text-gray-800">Many vegetables and flowers can be planted early in spring. Consider cool-season crops like lettuce, spinach, and peas. For flowers, start with pansies, violas, and early-blooming bulbs.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Lawn Care</h2>
      <p class="text-gray-800">Spring is the time to revive your lawn. Rake out thatch, aerate if necessary, and apply a spring fertilizer. Early spring is also the best time to overseed thin areas.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">4. Pruning and Maintenance</h2>
      <p class="text-gray-800">Prune summer-flowering shrubs and trees before they start new growth. Remove any winter damage and shape plants for the coming season.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">5. Pest and Disease Prevention</h2>
      <p class="text-gray-800">Start monitoring for early signs of pests and diseases. Early detection and treatment can prevent major problems later in the season.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">6. Container Gardening</h2>
      <p class="text-gray-800">Spring is the perfect time to refresh your container gardens. Clean containers, replace old soil, and plant new combinations of annuals and perennials.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">7. Watering and Irrigation</h2>
      <p class="text-gray-800">Check your irrigation systems and make any necessary repairs. Adjust watering schedules as temperatures rise and plants begin active growth.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">8. Garden Planning</h2>
      <p class="text-gray-800">Use spring to plan your garden for the entire year. Consider crop rotation, companion planting, and succession planting for continuous harvests.</p>

      <p class="text-gray-800 mt-6">Spring gardening sets the foundation for a successful growing season. Take the time to prepare properly, and you'll be rewarded with a beautiful and productive garden throughout the year.</p>
    `,
    tags: ["Seasonal Gardening", "Spring", "Outdoor Plants"],
    relatedPosts: [1, 2],
  },
];

export default function BlogPostPage({ params }) {
  const { id } = params;
  const post = blogs.find((b) => b.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">Blog post not found</p>
          <Link
            href="/community/blog"
            className="text-orange-600 hover:text-orange-700"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Share</h2>
            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share this post</span>
            </button>
          </div>

          {/* Related Posts */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.relatedPosts.map((relatedId) => {
                const relatedPost = blogs.find((b) => b.id === relatedId);
                if (!relatedPost) return null;
                return (
                  <Link
                    key={relatedId}
                    href={`/community/blog/${relatedId}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {relatedPost.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
