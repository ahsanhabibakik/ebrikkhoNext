"use client";

import {
  RefreshCw,
  AlertCircle,
  FileCheck,
  HelpCircle,
  Package,
} from "lucide-react";

export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Returns Policy
            </h1>
            <p className="text-gray-600">Last updated: March 15, 2024</p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Return Eligibility
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We accept returns under the following conditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Product is damaged or defective</li>
                  <li>Wrong item received</li>
                  <li>Product not as described</li>
                  <li>Return request made within 7 days of delivery</li>
                  <li>Item is unused and in original packaging</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Return Process
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Contact our customer service within 7 days of delivery
                  </li>
                  <li>Provide order number and reason for return</li>
                  <li>Receive return authorization and instructions</li>
                  <li>Package the item securely in its original packaging</li>
                  <li>Ship the item back to our warehouse</li>
                  <li>
                    Refund will be processed within 5-7 business days of
                    receiving the return
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Refund Policy
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunds will be issued to the original payment method</li>
                  <li>Shipping charges are non-refundable</li>
                  <li>
                    Return shipping costs are the responsibility of the customer
                  </li>
                  <li>Refund processing time may vary by payment method</li>
                  <li>
                    Store credit may be offered as an alternative to refund
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Non-Returnable Items
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>The following items cannot be returned:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Custom or personalized items</li>
                  <li>Perishable goods</li>
                  <li>Items damaged due to customer misuse</li>
                  <li>Items without original packaging</li>
                  <li>Items purchased on sale or clearance</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Damaged or Defective Items
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Take photos of the damaged item and packaging</li>
                  <li>Contact customer service within 48 hours of delivery</li>
                  <li>We may arrange for replacement or repair</li>
                  <li>Shipping costs for replacements are covered by us</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600">
                For any questions about our returns policy, please contact us
                at:
                <br />
                Email: returns@ebrikkho.com
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
