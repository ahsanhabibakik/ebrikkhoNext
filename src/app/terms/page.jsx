"use client";

import { Scale, AlertCircle, FileCheck, HelpCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">Last updated: March 15, 2024</p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Agreement to Terms
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  By accessing and using Ebrikkho's website and services, you
                  agree to be bound by these Terms of Service. If you disagree
                  with any part of these terms, you may not access our services.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Ordering and Payment
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>All orders are subject to product availability</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Payment must be received before order processing</li>
                  <li>
                    We accept various payment methods including credit cards and
                    mobile banking
                  </li>
                  <li>
                    Orders may be cancelled if payment is not received or
                    verified
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Shipping and Delivery
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Free shipping is available for orders above ৳5,000</li>
                  <li>
                    Standard shipping charges apply for orders below the
                    threshold
                  </li>
                  <li>We are not responsible for delays beyond our control</li>
                  <li>Risk of loss passes to you upon delivery</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Returns and Refunds
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Products must be returned within 7 days of delivery</li>
                  <li>Items must be unused and in original packaging</li>
                  <li>Refunds will be processed within 5-7 business days</li>
                  <li>Shipping costs are non-refundable</li>
                  <li>
                    Damaged or defective items will be replaced or refunded
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Ebrikkho shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of our services or any products purchased through our
                  platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600">
                For any questions regarding these Terms of Service, please
                contact us at:
                <br />
                Email: legal@ebrikkho.com
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
