"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Leaf,
  ShoppingCart,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Phone,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  User,
  Heart,
  MapPin,
  Mail,
  Users,
  Award,
  Droplet,
  Sun,
  Flower,
  Bug,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/data/products";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60",
      title: "Bring Nature Into Your Space",
      description:
        "Discover the perfect plants for your home or office with Ebrikkho",
      buttonText: "Shop Now",
      buttonLink: "/shop",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1920&auto=format&fit=crop&q=60",
      title: "Expert Plant Care Services",
      description:
        "Let our plant experts help you create the perfect green environment",
      buttonText: "Learn More",
      buttonLink: "/services",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60",
      title: "Join Our Plant Community",
      description:
        "Connect with fellow plant enthusiasts and share your journey",
      buttonText: "Join Now",
      buttonLink: "/community",
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const features = [
    {
      title: "Shop Plants",
      description: "Browse our wide selection of indoor and outdoor plants",
      icon: <ShoppingCart className="w-6 h-6" />,
      link: "/shop",
    },
    {
      title: "Plant Care Guide",
      description: "Learn how to care for your plants with our expert tips",
      icon: <BookOpen className="w-6 h-6" />,
      link: "/plant-care",
    },
    {
      title: "Our Gallery",
      description: "View inspiring plant arrangements and customer projects",
      icon: <ImageIcon className="w-6 h-6" />,
      link: "/gallery",
    },
    {
      title: "Testimonials",
      description: "Read what our customers say about our services",
      icon: <MessageSquare className="w-6 h-6" />,
      link: "/testimonials",
    },
    {
      title: "About Us",
      description: "Learn about our story and mission",
      icon: <Leaf className="w-6 h-6" />,
      link: "/about",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our plant experts",
      icon: <Phone className="w-6 h-6" />,
      link: "/contact",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Kanjud Muabbaz",
      role: "Happy Customer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      quote:
        "The ebrikkho team helped me choose the perfect plant for my apartment. Now my house looks very nice!",
      rating: 5,
      date: "2 weeks ago",
      location: "Mirpur, Dhaka",
    },
    {
      id: 2,
      name: "Syed Mir Habib Akik",
      role: "Plant Enthusiast",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      quote:
        "I was worried about which plants would do well in Mirpur's weather. The ebrikkho experts helped me choose the perfect plants.",
      rating: 5,
      date: "1 month ago",
      location: "Dhanmondi, Dhaka",
    },
    {
      id: 3,
      name: "Abid Malik Sami",
      role: "Office Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      quote:
        "I was confused about which plants to buy for my office. The ebrikkho experts helped me and now my office looks very nice.",
      rating: 5,
      date: "3 weeks ago",
      location: "Gulshan, Dhaka",
    },
  ];

  const stats = [
    {
      number: "5000+",
      label: "Happy Customers",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "100+",
      label: "Plant Varieties",
      icon: <Leaf className="w-8 h-8" />,
    },
    {
      number: "50+",
      label: "Expert Staff",
      icon: <User className="w-8 h-8" />,
    },
    {
      number: "10+",
      label: "Years Experience",
      icon: <Award className="w-8 h-8" />,
    },
  ];

  const plantCareTips = [
    {
      title: "Watering Guide",
      description:
        "Learn the right way to water your plants based on their type and season",
      icon: <Droplet className="w-6 h-6" />,
    },
    {
      title: "Light Requirements",
      description: "Understand how much light your plants need to thrive",
      icon: <Sun className="w-6 h-6" />,
    },
    {
      title: "Soil & Fertilizer",
      description:
        "Choose the right soil and fertilizer for healthy plant growth",
      icon: <Flower className="w-6 h-6" />,
    },
    {
      title: "Pest Control",
      description: "Natural ways to keep your plants pest-free",
      icon: <Bug className="w-6 h-6" />,
    },
  ];

  const contactInfo = {
    address: "123 Green Street, Plant City",
    phone: "+1 234 567 890",
    localPhone: "01518926700",
    email: "hello@ebrikkho.com",
    location: "Mirpur DOHS, Road 10, Avenue 10, House 1217",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Auto-Sliding Banner */}
      <section className="relative h-[600px] bg-orange-800">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                <Link
                  href={slide.buttonLink}
                  className="px-8 py-4 bg-white text-orange-800 rounded-lg font-semibold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2 w-fit"
                >
                  {slide.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link
              href="/shop"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      New
                    </div>
                  )}
                  {product.isBestSeller && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Best Seller
                    </div>
                  )}
                  <button className="absolute bottom-2 right-2 bg-white/90 text-orange-600 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500">
                      ({product.rating})
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <button className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plant Care Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Plant Care Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plantCareTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy plant parents who have transformed their
              spaces with our help
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg p-8 relative"
              >
                <Quote className="absolute top-4 left-4 text-orange-100 w-8 h-8" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <Link
              href="/shop?sort=new"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((product) => product.isNew)
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      New
                    </div>
                    <button className="absolute bottom-2 right-2 bg-white/90 text-orange-600 p-2 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500">
                        ({product.rating})
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <button className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Join Our Community */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Plant Community
            </h2>
            <p className="text-gray-600 mb-8">
              Connect with fellow plant enthusiasts, share your journey, and get
              expert advice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/community/forum"
                className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Join Forum
              </Link>
              <Link
                href="/community/events"
                className="px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Explore Ebrikkho
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.link}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-orange-600 group-hover:text-orange-700 transition-colors">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8">
              Let our plant experts help you create the perfect green
              environment
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-orange-800 rounded-lg font-semibold hover:bg-orange-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-orange-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Our Location
                      </h4>
                      <p className="text-gray-600">{contactInfo.address}</p>
                      <p className="text-gray-600 mt-1">
                        {contactInfo.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Phone Numbers
                      </h4>
                      <p className="text-gray-600">{contactInfo.phone}</p>
                      <p className="text-gray-600 mt-1">
                        {contactInfo.localPhone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Business Hours
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Visit Contact Page
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
