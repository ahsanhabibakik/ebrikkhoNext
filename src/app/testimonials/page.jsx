"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Homeowner",
      image: "/images/testimonials/sarah.jpg",
      rating: 5,
      text: "Ebrikkho transformed my balcony into a beautiful garden. Their expertise in plant selection and maintenance is exceptional. My plants have never looked better!",
      date: "March 15, 2024",
    },
    {
      id: 2,
      name: "Rahim Khan",
      role: "Office Manager",
      image: "/images/testimonials/rahim.jpg",
      rating: 5,
      text: "The office plants from Ebrikkho have completely changed our workspace atmosphere. Their regular maintenance service is reliable and professional.",
      date: "March 10, 2024",
    },
    {
      id: 3,
      name: "Fatima Rahman",
      role: "Restaurant Owner",
      image: "/images/testimonials/fatima.jpg",
      rating: 5,
      text: "The plant arrangements in our restaurant have received countless compliments. Ebrikkho's team understood our vision perfectly and delivered beyond expectations.",
      date: "March 5, 2024",
    },
    {
      id: 4,
      name: "Aminul Islam",
      role: "Hotel Manager",
      image: "/images/testimonials/aminul.jpg",
      rating: 5,
      text: "Working with Ebrikkho for our hotel's greenery has been a game-changer. Their attention to detail and plant care expertise is unmatched.",
      date: "February 28, 2024",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Happy Customers",
    },
    {
      number: "4.9",
      label: "Average Rating",
    },
    {
      number: "1000+",
      label: "Plants Delivered",
    },
    {
      number: "50+",
      label: "Corporate Clients",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/images/testimonials-bg.jpg')] bg-cover bg-center" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Testimonials
            </h1>
            <p className="text-xl md:text-2xl">
              What our customers say about us
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-100" />
                    <p className="text-gray-600 italic pl-6">
                      {testimonial.text}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.date}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Share Your Experience
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We'd love to hear about your experience with Ebrikkho.
              </p>
              <button className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
