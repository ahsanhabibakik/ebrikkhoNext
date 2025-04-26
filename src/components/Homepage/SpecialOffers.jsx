"use client";

import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get up to 40% off on selected plants",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/offers/summer-sale",
    color: "bg-orange-500",
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "On all indoor plants",
    image:
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/offers/buy-2-get-1",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "On orders above ৳5,000",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/offers/free-shipping",
    color: "bg-blue-500",
  },
];

export default function SpecialOffers() {
  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Special Offers
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Take advantage of our limited-time offers and save on your favorite
            plants
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={offer.link}
              className="group relative h-48 sm:h-64 overflow-hidden rounded-lg"
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 ${offer.color} bg-opacity-75 transition-opacity group-hover:bg-opacity-80`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 sm:p-6 text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm sm:text-base mb-4">{offer.description}</p>
                <span className="inline-block bg-white text-gray-900 px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="mt-8 sm:mt-12 bg-orange-50 rounded-lg p-4 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
            Limited Time Offer
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Hurry! This offer ends in:
          </p>
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <div className="bg-white rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]">
              <span className="text-2xl sm:text-3xl font-bold text-orange-600">
                24
              </span>
              <p className="text-xs sm:text-sm text-gray-600">Hours</p>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]">
              <span className="text-2xl sm:text-3xl font-bold text-orange-600">
                45
              </span>
              <p className="text-xs sm:text-sm text-gray-600">Minutes</p>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]">
              <span className="text-2xl sm:text-3xl font-bold text-orange-600">
                60
              </span>
              <p className="text-xs sm:text-sm text-gray-600">Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
