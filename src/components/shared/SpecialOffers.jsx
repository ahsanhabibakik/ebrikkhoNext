"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // Set end date to 7 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
    {
      id: 1,
      title: "Summer Bloom Collection",
      description: "Get 30% off on all flowering plants",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/offers/summer-bloom",
      discount: "30% OFF",
    },
    {
      id: 2,
      title: "Garden Starter Kit",
      description: "Complete kit for beginners at 40% off",
      image:
        "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/offers/starter-kit",
      discount: "40% OFF",
    },
    {
      id: 3,
      title: "Premium Tools Bundle",
      description: "Professional gardening tools at 25% off",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/offers/tools-bundle",
      discount: "25% OFF",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Special Offers
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Limited time deals you don't want to miss!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white rounded-md shadow-md p-3 min-w-[70px]"
              >
                <div className="text-xl font-bold text-amber-600">{value}</div>
                <div className="text-xs text-gray-600 uppercase">{unit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48 md:h-56">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-md">
                  {offer.discount}
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  {offer.description}
                </p>
                <Link
                  href={offer.link}
                  className="inline-block bg-amber-500 text-white px-5 py-2 rounded-full font-semibold text-sm md:text-base hover:bg-amber-600 transition-colors shadow-sm"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
