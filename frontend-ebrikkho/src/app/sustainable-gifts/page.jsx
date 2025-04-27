import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sustainable Gifts & Home Decor | Ebrikkho",
  description:
    "Discover our collection of eco-friendly gifts and sustainable home decor. From plant-based gifts to natural home accessories, find thoughtful presents that make a positive impact.",
};

export default function SustainableGiftsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[40vh] mb-8 rounded-lg overflow-hidden">
        <Image
          src="/slider/slider-sustainable-gifts-decor.jpg"
          alt="Sustainable Gifts & Home Decor"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sustainable Gifts & Home Decor
            </h1>
            <p className="text-xl text-white/90">
              Thoughtful gifts that make a positive impact
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link href="/category/gift-sets" className="group">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/gallery/gift-sets.jpg"
              alt="Gift Sets"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">Gift Sets</h3>
            </div>
          </div>
        </Link>

        <Link href="/category/home-decor" className="group">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/gallery/home-decor.jpg"
              alt="Home Decor"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">Home Decor</h3>
            </div>
          </div>
        </Link>

        <Link href="/category/eco-friendly" className="group">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/gallery/eco-friendly.jpg"
              alt="Eco-Friendly Products"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                Eco-Friendly Products
              </h3>
            </div>
          </div>
        </Link>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Sustainable Gifts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Add your featured products here */}
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="bg-orange-50 rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Sustainability Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Eco-Friendly Materials
            </h3>
            <ul className="space-y-2">
              <li>• Sustainable packaging</li>
              <li>• Recycled materials</li>
              <li>• Biodegradable products</li>
              <li>• Local sourcing</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Social Impact</h3>
            <ul className="space-y-2">
              <li>• Support local artisans</li>
              <li>• Fair trade practices</li>
              <li>• Community initiatives</li>
              <li>• Environmental conservation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
