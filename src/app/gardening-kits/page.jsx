import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/shared/CategoryCard";

export const metadata = {
  title: "Gardening Kits & Essentials | Ebrikkho",
  description:
    "Discover our comprehensive range of gardening kits and essentials. From basic tools to complete starter kits, find everything you need to start and maintain your garden.",
};

export default function GardeningKitsPage() {
  const categories = [
    {
      title: "Starter Kits",
      description: "Everything you need to begin your gardening journey",
      image: "/images/categories/starter-kits.jpg",
      link: "/gardening-kits/starter",
    },
    {
      title: "Gardening Tools",
      description: "Quality tools for every gardening task",
      image: "/images/categories/tools.jpg",
      link: "/gardening-kits/tools",
    },
    {
      title: "Plant Care Kits",
      description: "Specialized kits for plant maintenance",
      image: "/images/categories/care-kits.jpg",
      link: "/gardening-kits/care",
    },
    {
      title: "Accessories",
      description: "Essential accessories for your garden",
      image: "/images/categories/accessories.jpg",
      link: "/gardening-kits/accessories",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Beginner's Garden Kit",
      price: 89.99,
      image: "/images/products/beginner-kit.jpg",
      link: "/products/beginners-garden-kit",
    },
    {
      id: 2,
      name: "Premium Pruning Set",
      price: 49.99,
      image: "/images/products/pruning-set.jpg",
      link: "/products/premium-pruning-set",
    },
    {
      id: 3,
      name: "Soil Testing Kit",
      price: 29.99,
      image: "/images/products/soil-kit.jpg",
      link: "/products/soil-testing-kit",
    },
    {
      id: 4,
      name: "Watering System",
      price: 39.99,
      image: "/images/products/watering-system.jpg",
      link: "/products/watering-system",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] mb-12">
        <Image
          src="/images/slider/slider-gardening-kits-essentials.jpg"
          alt="Gardening Kits & Essentials"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Gardening Kits & Essentials
              </h1>
              <p className="text-xl text-white/90">
                Everything you need to start and maintain your garden
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-amber-200 pb-2">
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
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-amber-200 pb-2">
            Featured Gardening Essentials
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
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-amber-600 font-medium">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Guide Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Essential Gardening Tools Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="text-amber-500 mr-2">✓</span> Basic Tools
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Hand trowel - For planting and transplanting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Pruning shears - For trimming and shaping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Garden fork - For soil aeration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Watering can - For proper hydration</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="text-amber-500 mr-2">✓</span> Advanced Tools
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Soil pH meter - For soil testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Garden knife - For precise cutting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Wheelbarrow - For transporting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Garden hose - For efficient watering</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
