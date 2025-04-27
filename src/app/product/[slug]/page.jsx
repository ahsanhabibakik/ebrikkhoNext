"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { products } from "@/data/products";
import { Star, ShoppingCart, Heart, Share2, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Find the product based on the slug
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black">Product not found.</p>
      </div>
    );
  }

  // Mock product images
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce0?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60",
  ];

  // Mock product features
  const productFeatures = [
    "Low maintenance",
    "Air purifying",
    "Pet friendly",
    "Drought tolerant",
  ];

  // Mock product care instructions
  const productCare = {
    light: "Bright indirect light",
    water: "Water when top 2 inches of soil is dry",
    humidity: "Average household humidity",
    temperature: "65-80°F (18-27°C)",
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2023-04-15",
      comment:
        "This plant is beautiful and arrived in perfect condition. It's been thriving in my home office for the past month!",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      date: "2023-04-10",
      comment:
        "Great quality plant, but shipping took a bit longer than expected. The plant itself is healthy and growing well.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      rating: 5,
      date: "2023-04-05",
      comment:
        "I'm so happy with this purchase! The plant is exactly as described and the customer service was excellent.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleAddToWishlist = () => {
    // In a real app, this would add the product to the wishlist
    alert(`Added ${product.name} to wishlist!`);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-black hover:text-orange-600">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronDown className="w-4 h-4 rotate-[-90deg] text-gray-500" />
                    <Link
                      href="/products"
                      className="ml-1 text-black hover:text-orange-600 md:ml-2"
                    >
                      Products
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronDown className="w-4 h-4 rotate-[-90deg] text-gray-500" />
                    <span className="ml-1 text-gray-500 md:ml-2">
                      {product.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-md overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-orange-500" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-black">
                  ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold text-black mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-black mb-6">{product.description}</p>

              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <label className="block text-black mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center text-black"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="flex-1 border border-gray-300 text-black py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Features
                </h3>
                <ul className="space-y-2">
                  {productFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-black">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === "description"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === "care"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Care Instructions
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === "reviews"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-black">{product.description}</p>
                  <p className="text-black">
                    This beautiful plant will add a touch of nature to your home
                    or office. It's easy to care for and will thrive in most
                    indoor environments.
                  </p>
                  <p className="text-black">
                    Our plants are carefully selected and shipped in specially
                    designed boxes to ensure they arrive in perfect condition.
                    Each plant comes with detailed care instructions to help you
                    keep it healthy and growing.
                  </p>
                </div>
              )}

              {activeTab === "care" && product.care && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4">
                      Light
                    </h4>
                    <p className="text-black">{productCare.light}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4">
                      Water
                    </h4>
                    <p className="text-black">{productCare.water}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4">
                      Humidity
                    </h4>
                    <p className="text-black">{productCare.humidity}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4">
                      Temperature
                    </h4>
                    <p className="text-black">{productCare.temperature}</p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < product.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-black font-medium">
                      {product.rating.toFixed(1)} out of 5
                    </span>
                    <span className="ml-2 text-black">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-0"
                      >
                        <div className="flex items-center mb-2">
                          <Image
                            src={review.avatar}
                            alt={review.author}
                            width={40}
                            height={40}
                            className="rounded-full mr-3"
                          />
                          <div>
                            <h4 className="font-medium text-black">
                              {review.author}
                            </h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                              <span className="mx-2">•</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-black">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 bg-white border border-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(
                  (p) => p.category === product.category && p.id !== product.id
                )
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-black group-hover:text-orange-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < relatedProduct.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-black">
                            ({relatedProduct.reviews})
                          </span>
                        </div>
                        <p className="mt-2 font-bold text-black">
                          ${relatedProduct.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
