"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-800 text-white relative overflow-hidden">
      {/* Enhanced decorative leaf pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {/* Top row of leaves */}
        <div className="absolute top-4 left-4 transform rotate-12">
          <Leaf size={24} />
        </div>
        <div className="absolute top-4 left-1/4 transform rotate-45">
          <Leaf size={20} />
        </div>
        <div className="absolute top-4 left-1/2 transform rotate-90">
          <Leaf size={22} />
        </div>
        <div className="absolute top-4 left-3/4 transform rotate-135">
          <Leaf size={18} />
        </div>
        <div className="absolute top-4 right-4 transform -rotate-12">
          <Leaf size={24} />
        </div>

        {/* Middle row of leaves */}
        <div className="absolute top-1/2 left-4 transform -rotate-45">
          <Leaf size={20} />
        </div>
        <div className="absolute top-1/2 left-1/4 transform -rotate-90">
          <Leaf size={22} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -rotate-135">
          <Leaf size={18} />
        </div>
        <div className="absolute top-1/2 left-3/4 transform -rotate-180">
          <Leaf size={20} />
        </div>
        <div className="absolute top-1/2 right-4 transform rotate-45">
          <Leaf size={24} />
        </div>

        {/* Bottom row of leaves */}
        <div className="absolute bottom-4 left-4 transform rotate-45">
          <Leaf size={20} />
        </div>
        <div className="absolute bottom-4 left-1/4 transform rotate-90">
          <Leaf size={22} />
        </div>
        <div className="absolute bottom-4 left-1/2 transform rotate-135">
          <Leaf size={18} />
        </div>
        <div className="absolute bottom-4 left-3/4 transform rotate-180">
          <Leaf size={20} />
        </div>
        <div className="absolute bottom-4 right-4 transform -rotate-45">
          <Leaf size={24} />
        </div>

        {/* Additional scattered leaves */}
        <div className="absolute top-1/3 left-1/3 transform rotate-30">
          <Leaf size={26} />
        </div>
        <div className="absolute top-2/3 right-1/3 transform -rotate-30">
          <Leaf size={26} />
        </div>
        <div className="absolute top-1/4 right-1/4 transform rotate-60">
          <Leaf size={22} />
        </div>
        <div className="absolute bottom-1/4 left-1/4 transform -rotate-60">
          <Leaf size={22} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Ebrikkho Logo"
                width={80}
                height={80}
              />
            </Link>
            <p className="text-orange-100 max-w-md">
              Bringing nature's beauty into your home. We're passionate about
              helping you create your perfect green space.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/ebrikkho"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-orange-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/ebrikkho"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-orange-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/ebrikkho"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-orange-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com/in/ebrikkho"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-orange-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com/ebrikkho"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-orange-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-300">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/plants"
                  className="text-orange-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Leaf size={16} />
                  Plants Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-orange-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Leaf size={16} />
                  Plant Care Services
                </Link>
              </li>
              <li>
                <Link
                  href="/community/blog"
                  className="text-orange-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Leaf size={16} />
                  Gardening Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-orange-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Leaf size={16} />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-300">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-orange-100">
                <MapPin size={18} />
                <span>House 1217, Road 10, Avenue 10, Mirpur DOHS, Dhaka</span>
              </li>
              <li className="flex items-center gap-2 text-orange-100">
                <Phone size={18} />
                <span>01518926700</span>
              </li>
              <li className="flex items-center gap-2 text-orange-100">
                <Phone size={18} />
                <span>01773995858</span>
              </li>
              <li className="flex items-center gap-2 text-orange-100">
                <Mail size={18} />
                <span>ebrikkho2024@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-300">
              Stay Updated
            </h3>
            <p className="text-orange-100">
              Subscribe to our newsletter for plant care tips and exclusive
              offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded bg-orange-700 border border-orange-600 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded transition-colors"
              >
                <Send size={16} />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-orange-100 text-sm">
              © 2024 Ebrikkho. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-orange-100 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-orange-100 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/shipping"
                className="text-orange-100 hover:text-white transition-colors"
              >
                Shipping Policy
              </Link>
              <Link
                href="/returns"
                className="text-orange-100 hover:text-white transition-colors"
              >
                Returns Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
