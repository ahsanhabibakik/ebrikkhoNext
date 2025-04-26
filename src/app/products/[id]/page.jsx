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
import { addToCart, toggleCart } from "@/redux/slices/cartSlice";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showShareModal, setShowShareModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2023-05-15",
      text: "This plant is beautiful and arrived in perfect condition. It's growing well and I'm very happy with my purchase!",
      helpful: 12,
      notHelpful: 2,
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "2023-06-02",
      text: "The plant was healthy but the pot was a bit smaller than expected. Still, it's doing well in my home office.",
      helpful: 8,
      notHelpful: 1,
    },
    {
      id: 3,
      user: "Mike Johnson",
      rating: 5,
      date: "2023-07-10",
      text: "Excellent quality and fast shipping. The care instructions were very helpful. Would definitely recommend!",
      helpful: 15,
      notHelpful: 0,
    },
  ]);
  const imageRef = useRef(null);
  const product = products.find((p) => p.id === parseInt(params.id));

  // Get related products (same category)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  // Mock image gallery (in a real app, this would come from the product data)
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ];

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    dispatch(toggleCart());
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Handle image navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // Handle share functionality
  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show a notification that the URL was copied
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    notification.textContent = "URL copied to clipboard!";
    document.body.appendChild(notification);

    // Remove the notification after 2 seconds
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      user: "Current User",
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      text: reviewText,
      helpful: 0,
      notHelpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setReviewText("");
    setReviewRating(5);
  };

  // Handle helpful/not helpful
  const handleHelpful = (reviewId, isHelpful) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful,
          };
        }
        return review;
      })
    );
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-orange-600">
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => isZoomed && setIsZoomed(false)}
            >
              <Image
                src={galleryImages[selectedImage]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              />

              {/* Zoom Controls */}
              <button
                onClick={toggleZoom}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800"
              >
                {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800"
              >
                <ChevronRight size={20} />
              </button>

              {/* Badges */}
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  New
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                  Best Seller
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-orange-600" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-2xl font-bold text-gray-900">
                  ৳{product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-lg text-gray-500 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Product Actions */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-800 font-bold text-xl flex items-center justify-center min-w-[40px]"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 font-bold text-lg min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-800 font-bold text-xl flex items-center justify-center min-w-[40px]"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-3 rounded-lg border ${
                    isWishlist
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-gray-300 hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <Heart
                    size={20}
                    className={isWishlist ? "fill-current" : ""}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-800"
                >
                  <Share2 size={20} />
                </button>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package size={18} className="text-orange-600" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield size={18} className="text-orange-600" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RefreshCw size={18} className="text-orange-600" />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={18} className="text-orange-600" />
                  <span>In stock</span>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-gray-600">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Tabs */}
            <div className="border-t pt-6">
              <div className="flex border-b mb-6">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "description"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "care"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Care Instructions
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "features"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "reviews"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600 mt-4">
                    This beautiful plant will add a touch of nature to your home
                    or office. It's perfect for both beginners and experienced
                    plant enthusiasts.
                  </p>
                  <p className="text-gray-600 mt-4">
                    Each plant is carefully selected and packaged to ensure it
                    arrives in perfect condition. We include detailed care
                    instructions to help your plant thrive.
                  </p>
                </div>
              )}

              {activeTab === "care" && (
                <div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Light</p>
                        <p className="text-gray-600">{product.care.light}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Droplet className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Water</p>
                        <p className="text-gray-600">{product.care.water}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Leaf className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Humidity</p>
                        <p className="text-gray-600">{product.care.humidity}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Thermometer className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Temperature</p>
                        <p className="text-gray-600">
                          {product.care.temperature}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Info size={18} className="text-orange-600" />
                      Care Tips
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>
                        Rotate your plant every few weeks to ensure even growth
                      </li>
                      <li>Clean the leaves with a damp cloth to remove dust</li>
                      <li>Use well-draining soil to prevent root rot</li>
                      <li>
                        Fertilize during the growing season (spring and summer)
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Plant Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Height</p>
                        <p className="font-medium">30-40 cm</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Pot Size</p>
                        <p className="font-medium">15 cm</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Growth Rate</p>
                        <p className="font-medium">Moderate</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Lifespan</p>
                        <p className="font-medium">Perennial</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {/* Review Summary */}
                  <div className="flex items-center gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {product.rating.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {reviews.length} reviews
                      </p>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(
                          (r) => Math.floor(r.rating) === rating
                        ).length;
                        const percentage =
                          reviews.length > 0
                            ? (count / reviews.length) * 100
                            : 0;
                        return (
                          <div
                            key={rating}
                            className="flex items-center gap-2 mb-1"
                          >
                            <span className="text-sm text-gray-600 w-6">
                              {rating}
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-10">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Write a Review Form */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Write a Review
                    </h3>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setReviewRating(rating)}
                              className={`p-1 ${
                                rating <= reviewRating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              <Star
                                size={24}
                                className={
                                  rating <= reviewRating ? "fill-current" : ""
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Review
                        </label>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={4}
                          placeholder="Share your thoughts about this product..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {review.user}
                              </p>
                              <p className="text-xs text-gray-500">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{review.text}</p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleHelpful(review.id, true)}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-orange-600"
                          >
                            <ThumbsUp size={16} />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          <button
                            onClick={() => handleHelpful(review.id, false)}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-orange-600"
                          >
                            <ThumbsDown size={16} />
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
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {relatedProduct.isBestSeller && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Seller
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(relatedProduct.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-orange-600 font-semibold">
                      ৳{relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Share this product
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} className="text-gray-800" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-800 font-medium">
                  Product URL
                </span>
                <button
                  onClick={() => copyToClipboard(window.location.href)}
                  className="text-orange-600 text-sm font-medium hover:text-orange-700"
                >
                  Copy
                </button>
              </div>
              <div className="flex justify-center gap-4">
                <button className="flex flex-col items-center gap-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 size={20} />
                  <span className="text-xs">Facebook</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Share2 size={20} />
                  <span className="text-xs">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Share2 size={20} />
                  <span className="text-xs">Pinterest</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
