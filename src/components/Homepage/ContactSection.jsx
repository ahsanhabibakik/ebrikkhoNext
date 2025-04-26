"use client";

import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function ContactSection({ contactInfo }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help you create your perfect green space
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Contact Information
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg mb-1">
                      Our Location
                    </h4>
                    <p className="text-gray-600">{contactInfo.address}</p>
                    <p className="text-gray-600 mt-1">{contactInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg mb-1">
                      Phone Numbers
                    </h4>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                    <p className="text-gray-600 mt-1">
                      {contactInfo.localPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg mb-1">
                      Email
                    </h4>
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
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Business Hours
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Monday - Friday</span>
                  <span className="font-medium text-gray-900 text-lg">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Saturday</span>
                  <span className="font-medium text-gray-900 text-lg">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Sunday</span>
                  <span className="font-medium text-gray-900 text-lg">
                    Closed
                  </span>
                </div>
              </div>
              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium group"
                >
                  Visit Contact Page
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
