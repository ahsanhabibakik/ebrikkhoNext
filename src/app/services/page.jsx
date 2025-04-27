"use client";

import { Leaf, Droplets, Scissors, Truck, Phone, Calendar } from "lucide-react";
import Image from "next/image";
import LeafPattern from "@/components/shared/LeafPattern";

export default function ServicesPage() {
  const services = [
    {
      title: "Plant Care Consultation",
      description:
        "Expert advice on plant selection, care, and maintenance tailored to your space and lifestyle.",
      icon: <Leaf className="w-8 h-8" />,
      features: [
        "Personalized plant recommendations",
        "Care instructions and tips",
        "Troubleshooting plant problems",
        "Seasonal care guidance",
      ],
    },
    {
      title: "Garden Design",
      description:
        "Transform your space with beautiful, sustainable garden designs that reflect your style.",
      icon: <Scissors className="w-8 h-8" />,
      features: [
        "Custom garden layouts",
        "Plant selection and placement",
        "Hardscape design",
        "Maintenance planning",
      ],
    },
    {
      title: "Plant Delivery & Installation",
      description:
        "Professional delivery and installation of plants to ensure they thrive in their new environment.",
      icon: <Truck className="w-8 h-8" />,
      features: [
        "Safe transportation",
        "Professional installation",
        "After-care instructions",
        "Guaranteed plant health",
      ],
    },
  ];

  const maintenanceServices = [
    {
      title: "Regular Maintenance",
      description:
        "Keep your plants healthy and beautiful with our regular maintenance service.",
      icon: <Droplets className="w-8 h-8" />,
      price: "Starting from ৳2,000/month",
    },
    {
      title: "One-time Care",
      description:
        "Perfect for special occasions or when your plants need extra attention.",
      icon: <Calendar className="w-8 h-8" />,
      price: "Starting from ৳1,500/visit",
    },
  ];

  // Additional leaves for a more intricate pattern
  const additionalLeaves = [
    { top: "12%", left: "18%", rotate: "18", size: 24 },
    { top: "22%", right: "14%", rotate: "-22", size: 20 },
    { bottom: "12%", left: "22%", rotate: "38", size: 22 },
    { bottom: "22%", right: "18%", rotate: "-42", size: 18 },
    { top: "32%", left: "12%", rotate: "8", size: 16 },
    { top: "42%", right: "10%", rotate: "-12", size: 20 },
    { bottom: "32%", left: "18%", rotate: "48", size: 22 },
    { bottom: "42%", right: "14%", rotate: "-32", size: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-orange-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/images/services-bg.jpg')] bg-cover bg-center" />
        <LeafPattern
          opacity={15}
          leafSizes={{
            topLeft: 38,
            topRight: 32,
            bottomLeft: 28,
            bottomRight: 35,
          }}
          leafPositions={{
            topLeft: { top: "12%", left: "12%", rotate: "15" },
            topRight: { top: "18%", right: "18%", rotate: "-15" },
            bottomLeft: { bottom: "12%", left: "18%", rotate: "42" },
            bottomRight: { bottom: "18%", right: "12%", rotate: "-35" },
          }}
          additionalLeaves={additionalLeaves}
          color="orange-200"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plant Care Services
            </h1>
            <p className="text-xl md:text-2xl">
              Professional plant care and gardening services to keep your green
              spaces thriving
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Plant Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From consultation to maintenance, we offer everything you need
                to keep your plants healthy and beautiful
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Maintenance Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Keep your plants healthy with our professional maintenance
                services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {maintenanceServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="p-8">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <p className="text-xl font-bold text-orange-600">
                      {service.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Schedule a consultation with our plant experts today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-800 px-8 py-3 rounded-lg font-semibold hover:bg-orange-100 transition-colors">
                Book a Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Call Us Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
