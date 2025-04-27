"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Truck,
  Leaf,
  Droplet,
  Sun,
  Thermometer,
  ZoomIn,
  ZoomOut,
  X,
  Info,
  Check,
  Package,
  Shield,
  RefreshCw,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "react-hot-toast";

export default function ProductPage({ params }) {
  const { slug } = params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlist, setIsWishlist] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const imageRef = useRef(null);
  const dispatch = useAppDispatch();

  // Find the product based on the slug
  const product = products.find((p) => p.slug === slug);

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
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60",
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2023-05-15",
      comment:
        "This plant is beautiful and arrived in perfect condition. It's growing well and I'm very happy with my purchase!",
      helpful: 12,
      notHelpful: 2,
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "2023-05-10",
      comment:
        "The plant was healthy but a bit smaller than expected. Still, it's doing well in my home office.",
      helpful: 8,
      notHelpful: 1,
    },
    {
      id: 3,
      user: "Mike Johnson",
      rating: 5,
      date: "2023-05-05",
      comment:
        "Excellent quality and fast shipping. The packaging was secure and the plant arrived in perfect condition.",
      helpful: 15,
      notHelpful: 0,
    },
  ];

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Added to cart!");
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !isZoomed) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    toast.success("Review submitted successfully!");
    setShowReviewForm(false);
    setReviewText("");
    setReviewRating(5);
  };

  const handleHelpful = (reviewId, isHelpful) => {
    // In a real app, you would update this in your backend
    toast.success(`Marked as ${isHelpful ? "helpful" : "not helpful"}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <div
            ref={imageRef}
            className={`relative aspect-square overflow-hidden rounded-lg ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
          >
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              style={
                isZoomed
                  ? {
                      transform: `scale(2)`,
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
            />
            {isZoomed && (
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <ZoomOut className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-orange-500" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>

          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Plant Care</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-orange-500" />
                <span>Bright indirect light</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-500" />
                <span>Water weekly</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-500" />
                <span>18-24°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" />
                <span>Air purifying</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-circle btn-sm"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                className="btn btn-circle btn-sm"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              className="btn btn-primary flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              className="btn btn-outline btn-circle"
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlist ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
            <button
              className="btn btn-outline btn-circle"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-600" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                <span>Secure packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <span>30-day guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              className={`py-4 border-b-2 font-medium ${
                activeTab === "description"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`py-4 border-b-2 font-medium ${
                activeTab === "care"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("care")}
            >
              Care Guide
            </button>
            <button
              className={`py-4 border-b-2 font-medium ${
                activeTab === "reviews"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({reviews.length})
            </button>
          </nav>
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">About this plant</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-700">
                This beautiful plant is perfect for adding a touch of nature to
                your home or office. It's easy to care for and will thrive in
                most indoor environments with proper care.
              </p>
            </div>
          )}

          {activeTab === "care" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                How to care for your plant
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-2">Light</h4>
                  <p className="text-gray-700 mb-4">
                    Place your plant in bright, indirect light. Avoid direct
                    sunlight as it can scorch the leaves.
                  </p>
                  <h4 className="text-lg font-medium mb-2">Water</h4>
                  <p className="text-gray-700 mb-4">
                    Water your plant when the top inch of soil feels dry. Be
                    careful not to overwater as this can lead to root rot.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Temperature</h4>
                  <p className="text-gray-700 mb-4">
                    Keep your plant in a room with a temperature between
                    18-24°C. Avoid placing it near drafts or heating vents.
                  </p>
                  <h4 className="text-lg font-medium mb-2">Humidity</h4>
                  <p className="text-gray-700 mb-4">
                    This plant prefers a humid environment. You can increase
                    humidity by misting the leaves or placing a humidifier
                    nearby.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowReviewForm(true)}
                >
                  Write a Review
                </button>
              </div>

              {showReviewForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h4 className="text-lg font-medium mb-4">Write a Review</h4>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`text-2xl ${
                              star <= reviewRating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            onClick={() => setReviewRating(star)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Submit Review
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-6"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleHelpful(review.id, true)}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleHelpful(review.id, false)}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>Not Helpful ({review.notHelpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Share this product</h3>
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={() => setShowShareModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="input input-bordered flex-1"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => copyToClipboard(window.location.href)}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="flex justify-center gap-4">
                <button className="btn btn-circle btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </button>
                <button className="btn btn-circle btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </button>
                <button className="btn btn-circle btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </button>
                <button className="btn btn-circle btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
