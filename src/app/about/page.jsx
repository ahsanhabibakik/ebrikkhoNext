"use client";

import Image from "next/image";
import {
  Leaf,
  Users,
  Package,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import LeafPattern from "@/components/shared/LeafPattern";

export default function AboutPage() {
  // Additional leaves for a more intricate pattern
  const additionalLeaves = [
    { top: "10%", left: "20%", rotate: "20", size: 24 },
    { top: "20%", right: "15%", rotate: "-25", size: 20 },
    { bottom: "15%", left: "25%", rotate: "40", size: 22 },
    { bottom: "25%", right: "20%", rotate: "-45", size: 18 },
    { top: "35%", left: "10%", rotate: "5", size: 16 },
    { top: "45%", right: "8%", rotate: "-15", size: 20 },
    { bottom: "35%", left: "15%", rotate: "55", size: 22 },
    { bottom: "45%", right: "12%", rotate: "-35", size: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/images/plants-bg.jpg')] bg-cover bg-center" />
        <LeafPattern
          opacity={15}
          leafSizes={{
            topLeft: 40,
            topRight: 35,
            bottomLeft: 30,
            bottomRight: 38,
          }}
          leafPositions={{
            topLeft: { top: "10%", left: "10%", rotate: "12" },
            topRight: { top: "15%", right: "15%", rotate: "-12" },
            bottomLeft: { bottom: "10%", left: "15%", rotate: "45" },
            bottomRight: { bottom: "15%", right: "10%", rotate: "-30" },
          }}
          additionalLeaves={additionalLeaves}
          color="orange-200"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Ebrikkho
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-8">
              Bringing nature's beauty to your doorstep since 2024
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-orange-800 px-6 py-3 rounded-lg font-semibold hover:bg-orange-100 transition-colors flex items-center gap-2">
                Explore Our Story <ArrowRight size={20} />
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Visit Our Store
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/nursery.jpg"
                alt="Ebrikkho Nursery"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-medium">Our First Nursery</p>
                <p className="text-xs">Mirpur, Dhaka - 2024</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <div className="h-1 w-20 bg-orange-600 rounded-full" />
              <p className="text-lg text-gray-600 leading-relaxed">
                Ebrikkho was founded in 2024 with a simple mission: to make
                premium plants accessible to everyone in Bangladesh. What
                started as a small nursery in Mirpur has grown into one of the
                country's leading plant retailers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our journey began when our co-founders recognized the growing
                demand for quality plants in urban spaces. With a passion for
                horticulture and a vision for sustainable urban living, they
                established Ebrikkho to bridge the gap between nature and city
                life.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex-1 bg-orange-50 p-4 rounded-xl">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">
                    50+
                  </h3>
                  <p className="text-gray-600">Plant Varieties</p>
                </div>
                <div className="flex-1 bg-orange-50 p-4 rounded-xl">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">
                    100+
                  </h3>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Co-Founders
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Founder 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">
                      AH
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Ahsan Habib Akik
                    </h3>
                    <p className="text-orange-600">Co-Founder & CEO</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Vision & Leadership
                    </h4>
                    <p className="text-gray-600">
                      With a passion for horticulture and business, Ahsan leads
                      Ebrikkho with a vision to transform urban spaces in
                      Bangladesh. His innovative approach to plant retailing has
                      established Ebrikkho as a pioneer in the industry.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Expertise
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Passionate about business innovation</li>
                      <li>Specializing in retail development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">
                      KM
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Kanjud Muabbaz
                    </h3>
                    <p className="text-orange-600">Co-Founder & COO</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Expertise & Innovation
                    </h4>
                    <p className="text-gray-600">
                      With a deep knowledge of plant care and cultivation,
                      Kanjud brings his expertise to Ebrikkho. His passion
                      ensures that every plant we offer meets the highest
                      quality standards.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Expertise
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Passionate about horticulture</li>
                      <li>Specializing in plant care and sustainability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-orange-50 rounded-xl p-8 text-center">
              <Leaf className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To provide high-quality plants and expert gardening services
                that help people create beautiful, healthy living spaces.
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-8 text-center">
              <Leaf className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To become Bangladesh's most trusted name in plants and
                gardening, inspiring a greener, more sustainable future.
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-8 text-center">
              <Leaf className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Values
              </h3>
              <p className="text-gray-600">
                Quality, sustainability, customer satisfaction, and
                environmental responsibility guide everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From a small plant shop to Bangladesh's leading gardening
                destination
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Timeline */}
              <div className="space-y-8">
                {[
                  {
                    date: "October 2024",
                    title: "Planning Phase",
                    description:
                      "Started planning ebrikkho with a vision to bring quality plants to Bangladesh",
                    icon: "📋",
                  },
                  {
                    date: "November 3, 2024",
                    title: "Social Media Launch",
                    description:
                      "Created our Facebook page to connect with plant enthusiasts",
                    icon: "📱",
                  },
                  {
                    date: "December 2024",
                    title: "First Collection",
                    description:
                      "Launched our first collection of plants and started taking pre-orders",
                    icon: "🌱",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-orange-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Timeline */}
              <div className="space-y-8">
                {[
                  {
                    date: "March 2025",
                    title: "Flagship Store",
                    description:
                      "Opened our flagship store in Mirpur DOHS with a beautiful showroom",
                    icon: "🏪",
                  },
                  {
                    date: "April 2025",
                    title: "Online Expansion",
                    description:
                      "Launched our online store and expanded to multiple areas",
                    icon: "🛒",
                  },
                  {
                    date: "Future Plans",
                    title: "Growth & Innovation",
                    description:
                      "Planning to open more stores and introduce new plant varieties",
                    icon: "🚀",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-orange-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Our Growth in Pictures
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="relative h-48 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={`/images/gallery-${item}.jpg`}
                      alt={`Gallery ${item}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">100+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <Package className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">50+</p>
              <p className="text-gray-600">Plant Varieties</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">3</p>
              <p className="text-gray-600">Areas Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Syed Mir Habib Akik",
                role: "Plant Specialist",
                description:
                  "With 8 years of experience in horticulture, Syed brings expertise in rare and exotic plants.",
              },
              {
                name: "Abid Malik Sami",
                role: "Garden Designer",
                description:
                  "Abid specializes in creating beautiful outdoor spaces that reflect your personal style.",
              },
              {
                name: "Talib Hossain",
                role: "Customer Care",
                description:
                  "Talib ensures every customer receives personalized attention and expert advice.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-orange-600">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 text-center mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-center">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of satisfied customers who have brought nature's
            beauty into their homes and gardens.
          </p>
          <button className="bg-white text-orange-800 px-8 py-3 rounded-lg font-semibold hover:bg-orange-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}
