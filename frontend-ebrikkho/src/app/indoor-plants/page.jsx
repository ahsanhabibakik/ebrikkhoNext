import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/shared/CategoryCard";

export const metadata = {
  title: "Indoor Plants Collection | Ebrikkho",
  description:
    "Discover our beautiful collection of indoor plants. From air-purifying plants to decorative succulents, find the perfect green companion for your home.",
};

export default function IndoorPlantsPage() {
  const categories = [
    {
      title: "Low Light Plants",
      description: "Perfect for spaces with minimal natural light",
      image: "/images/categories/low-light-plants.jpg",
      link: "/indoor-plants/low-light",
    },
    {
      title: "Air Purifying Plants",
      description: "Natural air filters for your home",
      image: "/images/categories/air-purifying.jpg",
      link: "/indoor-plants/air-purifying",
    },
    {
      title: "Succulents & Cacti",
      description: "Low-maintenance desert beauties",
      image: "/images/categories/succulents.jpg",
      link: "/indoor-plants/succulents",
    },
    {
      title: "Tropical Plants",
      description: "Bring the jungle to your home",
      image: "/images/categories/tropical.jpg",
      link: "/indoor-plants/tropical",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 49.99,
      image: "/images/products/monstera.jpg",
      link: "/products/monstera-deliciosa",
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 39.99,
      image: "/images/products/snake-plant.jpg",
      link: "/products/snake-plant",
    },
    {
      id: 3,
      name: "Peace Lily",
      price: 34.99,
      image: "/images/products/peace-lily.jpg",
      link: "/products/peace-lily",
    },
    {
      id: 4,
      name: "Fiddle Leaf Fig",
      price: 59.99,
      image: "/images/products/fiddle-leaf.jpg",
      link: "/products/fiddle-leaf-fig",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] mb-12">
        <Image
          src="/images/slider/slider-green-living-indoor-plants.jpg"
          alt="Indoor Plants Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Indoor Plants Collection
              </h1>
              <p className="text-xl text-white/90">
                Transform your living space with our carefully curated selection
                of indoor plants
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-green-200 pb-2">
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
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-green-200 pb-2">
            Featured Indoor Plants
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
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-green-600 font-medium">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Care Guide Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Indoor Plant Care Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="text-green-500 mr-2">✓</span> Basic Care Tips
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Water when the top soil feels dry to the touch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Provide indirect sunlight for most indoor plants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Maintain proper humidity levels, especially in winter
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Clean leaves regularly to remove dust</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="text-green-500 mr-2">✓</span> Common Issues
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Yellow leaves - Usually indicates overwatering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Brown tips - Often caused by low humidity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Drooping - May be a sign of underwatering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Pests - Check regularly and treat promptly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
