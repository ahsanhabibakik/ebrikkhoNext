"use client";

import { Truck, Package, Clock, MapPin, AlertCircle } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Shipping Policy
            </h1>
            <p className="text-gray-600">Last updated: March 15, 2024</p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Shipping Methods
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We offer the following shipping methods:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standard Delivery (2-4 business days)</li>
                  <li>Express Delivery (1-2 business days)</li>
                  <li>Free shipping for orders above ৳5,000</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Processing
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders are processed within 24 hours</li>
                  <li>
                    Orders placed after 2 PM will be processed the next business
                    day
                  </li>
                  <li>
                    You will receive a confirmation email with tracking
                    information
                  </li>
                  <li>Delivery times may vary based on your location</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Areas
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We currently deliver to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All major cities in Bangladesh</li>
                  <li>Most rural areas (additional delivery time may apply)</li>
                  <li>
                    Remote locations may require additional shipping charges
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Timeframes
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dhaka City: 1-2 business days</li>
                  <li>Other Major Cities: 2-3 business days</li>
                  <li>Rural Areas: 3-5 business days</li>
                  <li>Remote Locations: 5-7 business days</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Shipping Restrictions
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Some areas may not be serviceable due to logistics
                    constraints
                  </li>
                  <li>
                    Delivery may be delayed during holidays and peak seasons
                  </li>
                  <li>Large orders may require additional processing time</li>
                  <li>Weather conditions may affect delivery times</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600">
                For any questions about our shipping policy, please contact us
                at:
                <br />
                Email: shipping@ebrikkho.com
                <br />
                Phone: +880 1234-567890
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
