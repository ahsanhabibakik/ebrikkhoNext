import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/shared/CategoryCard";

export const metadata = {
  title: "Outdoor Plant Collection | Ebrikkho",
  description:
    "Explore our diverse collection of outdoor plants. From flowering plants to trees and shrubs, create a beautiful garden that thrives in your outdoor space.",
};

export default function OutdoorPlantsPage() {
  const categories = [
    {
      title: "Flowering Plants",
      description: "Add color and beauty to your garden",
      image: "/images/categories/flowering.jpg",
      link: "/outdoor-plants/flowering",
    },
    {
      title: "Trees & Shrubs",
      description: "Create structure and shade in your landscape",
      image: "/images/categories/trees.jpg",
      link: "/outdoor-plants/trees",
    },
    {
      title: "Seasonal Plants",
      description: "Plants that change with the seasons",
      image: "/images/categories/seasonal.jpg",
      link: "/outdoor-plants/seasonal",
    },
    {
      title: "Herbs & Vegetables",
      description: "Grow your own food and seasonings",
      image: "/images/categories/herbs.jpg",
      link: "/outdoor-plants/herbs",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Hydrangea",
      price: 44.99,
      image: "/images/products/hydrangea.jpg",
      link: "/products/hydrangea",
    },
    {
      id: 2,
      name: "Japanese Maple",
      price: 79.99,
      image: "/images/products/japanese-maple.jpg",
      link: "/products/japanese-maple",
    },
    {
      id: 3,
      name: "Lavender",
      price: 24.99,
      image: "/images/products/lavender.jpg",
      link: "/products/lavender",
    },
    {
      id: 4,
      name: "Tomato Plant",
      price: 19.99,
      image: "/images/products/tomato.jpg",
      link: "/products/tomato-plant",
    },
    {
      id: 5,
      name: "Hydrangea",
      price: 44.99,
      image: "/images/products/hydrangea.jpg",
      link: "/products/hydrangea",
    },
    {
      id: 6,
      name: "Japanese Maple",
      price: 79.99,
      image: "/images/products/japanese-maple.jpg",
      link: "/products/japanese-maple",
    },
    {
      id: 7,
      name: "Lavender",
      price: 24.99,
      image: "/images/products/lavender.jpg",
      link: "/products/lavender",
    },
    {
      id: 8,
      name: "Tomato Plant",
      price: 19.99,
      image: "/images/products/tomato.jpg",
      link: "/products/tomato-plant",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] mb-12">
        <Image
          src="/images/slider/slider-outdoor-plant-collection.jpg"
          alt="Outdoor Plant Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Outdoor Plant Collection
              </h1>
              <p className="text-xl text-white/90">
                Transform your garden with our selection of beautiful outdoor
                plants
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-blue-200 pb-2">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-blue-200 pb-2">
            Featured Outdoor Plants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={product.link}
                className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-medium">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Care Guide Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Outdoor Plant Care Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="text-blue-500 mr-2">✓</span> Basic Care Tips
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Water according to plant needs and weather conditions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Ensure proper sunlight exposure for each plant type
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Prune regularly to maintain shape and health</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Fertilize during the growing season</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="text-blue-500 mr-2">✓</span> Seasonal Care
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Spring - Start fertilizing and increase watering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Summer - Regular watering and pest control</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Fall - Prepare plants for winter dormancy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Winter - Protect sensitive plants from frost</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
