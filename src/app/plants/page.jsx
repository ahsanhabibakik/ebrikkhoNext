"use client";

import { useState } from "react";
import { categories, products } from "@/data/products";
import {
  Star,
  ShoppingCart,
  Filter,
  Leaf,
  Heart,
  Eye,
  Check,
} from "lucide-react";
import Image from "next/image";
import LeafPattern from "@/components/shared/LeafPattern";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, toggleCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PlantsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showAddedToCart, setShowAddedToCart] = useState({});

  const dispatch = useAppDispatch();
  const router = useRouter();

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setShowAddedToCart({ ...showAddedToCart, [product.id]: true });

    // Reset the "Added to Cart" message after 2 seconds
    setTimeout(() => {
      setShowAddedToCart({ ...showAddedToCart, [product.id]: false });
    }, 2000);
  };

  const handleViewProduct = (product) => {
    // Use Next.js router for client-side navigation
    router.push(`/product/${product.id}`);
  };

  // Additional leaves for a more intricate pattern
  const additionalLeaves = [
    { top: "10%", left: "15%", rotate: "15", size: 22 },
    { top: "18%", right: "12%", rotate: "-20", size: 18 },
    { bottom: "12%", left: "18%", rotate: "35", size: 20 },
    { bottom: "20%", right: "15%", rotate: "-40", size: 16 },
    { top: "28%", left: "10%", rotate: "5", size: 14 },
    { top: "38%", right: "8%", rotate: "-15", size: 18 },
    { bottom: "28%", left: "15%", rotate: "45", size: 20 },
    { bottom: "38%", right: "12%", rotate: "-35", size: 16 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60')] bg-cover bg-center" />
        <LeafPattern
          opacity={15}
          leafSizes={{
            topLeft: 35,
            topRight: 30,
            bottomLeft: 25,
            bottomRight: 32,
          }}
          leafPositions={{
            topLeft: { top: "8%", left: "8%", rotate: "10" },
            topRight: { top: "12%", right: "12%", rotate: "-10" },
            bottomLeft: { bottom: "8%", left: "12%", rotate: "40" },
            bottomRight: { bottom: "12%", right: "8%", rotate: "-25" },
          }}
          additionalLeaves={additionalLeaves}
          color="orange-200"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Leaf className="w-10 h-10" />
              Our Plant Collection
            </h1>
            <p className="text-xl md:text-2xl">
              Discover our wide variety of beautiful plants
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.slug
                        ? "bg-orange-600 text-white"
                        : "bg-white text-gray-700 hover:bg-orange-100"
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white text-black border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image with Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Quick Actions Overlay */}
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="bg-white p-2 rounded-full hover:bg-orange-100 transition-colors"
                        title="Quick View"
                      >
                        <Eye size={20} className="text-gray-700" />
                      </button>
                      <button
                        className="bg-white p-2 rounded-full hover:bg-orange-100 transition-colors"
                        title="Add to Wishlist"
                      >
                        <Heart size={20} className="text-gray-700" />
                      </button>
                    </div>

                    {/* Sale Badge */}
                    {product.isOnSale && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}

                    {/* New Badge */}
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-orange-600 transition-colors">
                      <Link href={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 capitalize">
                      {product.category}
                    </p>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        {product.isOnSale ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-orange-600">
                              ৳{product.salePrice || product.price * 0.8}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ৳{product.price}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-orange-600">
                            ৳{product.price}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors relative ${
                          showAddedToCart[product.id] ? "bg-green-600" : ""
                        }`}
                        disabled={showAddedToCart[product.id]}
                      >
                        {showAddedToCart[product.id] ? (
                          <Check size={18} />
                        ) : (
                          <ShoppingCart size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
