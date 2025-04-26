"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Select from "react-select";
import {
  CreditCard,
  Truck,
  MapPin,
  Lock,
  ArrowRight,
  Phone,
  CheckCircle,
} from "lucide-react";
import { shippingInfo, paymentMethods, taxRate } from "@/data/productData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCustomer } from "@/context/CustomerContext";
import Image from "next/image";

// Bangladesh address data
const divisions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chittagong", label: "Chittagong" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "khulna", label: "Khulna" },
  { value: "barishal", label: "Barishal" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rangpur", label: "Rangpur" },
  { value: "mymensingh", label: "Mymensingh" },
];

const districts = {
  dhaka: [
    { value: "dhaka", label: "Dhaka" },
    { value: "gazipur", label: "Gazipur" },
    { value: "narayanganj", label: "Narayanganj" },
    { value: "narsingdi", label: "Narsingdi" },
    { value: "tangail", label: "Tangail" },
    { value: "kishoreganj", label: "Kishoreganj" },
    { value: "manikganj", label: "Manikganj" },
    { value: "munshiganj", label: "Munshiganj" },
    { value: "rajbari", label: "Rajbari" },
    { value: "madaripur", label: "Madaripur" },
    { value: "gopalganj", label: "Gopalganj" },
    { value: "faridpur", label: "Faridpur" },
    { value: "shariatpur", label: "Shariatpur" },
  ],
  chittagong: [
    { value: "chittagong", label: "Chittagong" },
    { value: "cox-bazar", label: "Cox's Bazar" },
    { value: "bandarban", label: "Bandarban" },
    { value: "rangamati", label: "Rangamati" },
    { value: "khagrachari", label: "Khagrachari" },
    { value: "chandpur", label: "Chandpur" },
    { value: "comilla", label: "Comilla" },
    { value: "feni", label: "Feni" },
    { value: "lakshmipur", label: "Lakshmipur" },
    { value: "noakhali", label: "Noakhali" },
  ],
  // Add other divisions' districts here
};

const areas = {
  dhaka: {
    dhaka: [
      { value: "gulshan", label: "Gulshan" },
      { value: "banani", label: "Banani" },
      { value: "dhanmondi", label: "Dhanmondi" },
      { value: "mohammadpur", label: "Mohammadpur" },
      { value: "uttara", label: "Uttara" },
      { value: "mirpur", label: "Mirpur" },
      { value: "mirpur-dohs", label: "Mirpur DOHS" },
      { value: "pallabi", label: "Pallabi" },
      { value: "kafrul", label: "Kafrul" },
      { value: "cantonment", label: "Cantonment" },
      { value: "tejgaon", label: "Tejgaon" },
    ],
    // Add other districts' areas here
  },
  // Add other divisions' areas here
};

// Form validation schema
const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  paymentMethod: z.enum(["credit", "bkash", "nagad", "rocket"]),
});

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    getCartTotal,
    getBkashDiscount,
    getShippingCost,
    getFinalTotal,
    clearCart,
  } = useCart();
  const { customerInfo, updateCustomerInfo, getCustomerByPhone } =
    useCustomer();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    division: null,
    district: null,
    area: null,
    streetAddress: "",
    address: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: null,
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    bkashNumber: "",
    nagadNumber: "",
    rocketNumber: "",
    transactionId: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#e5e7eb",
      borderRadius: "0.5rem",
      padding: "0.25rem",
      "&:hover": {
        borderColor: "#f97316",
      },
      color: "#1f2937",
      minHeight: "42px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#f97316"
        : state.isFocused
        ? "#fff7ed"
        : "white",
      color: state.isSelected ? "white" : "#1f2937",
      "&:hover": {
        backgroundColor: state.isSelected ? "#f97316" : "#fff7ed",
      },
      padding: "10px 12px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      zIndex: 50,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#1f2937",
      fontSize: "0.875rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "0.875rem",
    }),
    input: (provided) => ({
      ...provided,
      color: "#1f2937",
      fontSize: "0.875rem",
    }),
  };

  // Payment methods with discounts
  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", discount: 0 },
    { id: "bkash", name: "bKash", discount: 5 },
    { id: "nagad", name: "Nagad", discount: 0 },
    { id: "rocket", name: "Rocket", discount: 0 },
    { id: "cod", name: "Cash on Delivery", discount: 0 },
  ];

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    // Check if customer exists
    const existingCustomer = await getCustomerByPhone(phoneNumber);
    if (existingCustomer) {
      // Pre-fill shipping info if customer exists
      setShippingInfo({
        ...shippingInfo,
        name: existingCustomer.name,
        address: existingCustomer.address,
      });
    }
    setOtpSent(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const lastFourDigits = phoneNumber.slice(-4);
    if (otp === lastFourDigits) {
      setOtpVerified(true);
      setStep(2);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    // Save customer info
    updateCustomerInfo({
      name: shippingInfo.name,
      phone: phoneNumber,
      address: shippingInfo.address,
    });
    setStep(3);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Format date in English numbers
      const today = new Date();
      const formattedDate = `${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;

      // Create order details object
      const orderDetails = {
        orderNumber: orderNumber,
        date: formattedDate,
        status: "Processing",
        customer: {
          name: shippingInfo.name,
          email: customerInfo?.email || "",
          phone: phoneNumber,
          address: shippingInfo.address,
        },
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        subtotal: prices.subtotal,
        shipping: prices.shipping,
        bKashDiscount: prices.bKashDiscount,
        total: prices.finalTotal,
        payment: {
          method: paymentInfo.paymentMethod?.label || "bKash",
          transactionId: paymentInfo.transactionId,
        },
      };

      // Store order details in localStorage
      localStorage.setItem("lastOrderDetails", JSON.stringify(orderDetails));

      // Clear cart and redirect to success page
      clearCart();
      router.push("/checkout/success");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Get available districts based on selected division
  const getAvailableDistricts = () => {
    if (!shippingInfo.division) return [];
    return districts[shippingInfo.division.value] || [];
  };

  // Get available areas based on selected division and district
  const getAvailableAreas = () => {
    if (!shippingInfo.division || !shippingInfo.district) return [];
    return (
      areas[shippingInfo.division.value]?.[shippingInfo.district.value] || []
    );
  };

  // Update address when location is selected
  const updateAddress = (newInfo) => {
    const locationParts = [];
    if (newInfo.streetAddress) locationParts.push(newInfo.streetAddress);
    if (newInfo.area) locationParts.push(newInfo.area.label);
    if (newInfo.district) locationParts.push(newInfo.district.label);
    if (newInfo.division) locationParts.push(newInfo.division.label);

    const fullAddress = locationParts.join(", ");
    setShippingInfo({
      ...newInfo,
      address: fullAddress,
    });
  };

  // Calculate prices with bKash discount
  const calculatePrices = () => {
    const subtotal = getCartTotal();
    const shipping = getShippingCost();
    const bKashDiscount =
      paymentInfo.paymentMethod?.value === "bkash" ? subtotal * 0.05 : 0;
    const finalTotal = subtotal + shipping - bKashDiscount;

    return {
      subtotal,
      shipping,
      bKashDiscount,
      finalTotal,
      freeShippingThreshold: 5000,
    };
  };

  const prices = calculatePrices();

  // Helper function to format price in BDT
  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price)) return "৳0.00";
    return `৳${price.toLocaleString("bn-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "decimal",
    })}`;
  };

  const handlePaymentMethodChange = (selected) => {
    // Generate order number if not already generated
    if (!orderNumber) {
      const newOrderNumber = `ORD-${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`;
      setOrderNumber(newOrderNumber);
    }

    setPaymentInfo({
      ...paymentInfo,
      paymentMethod: selected,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mt-4 text-gray-600">
              Please add some items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div
              className={`flex items-center ${
                step >= 1 ? "text-orange-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="ml-2">Phone Verification</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className="h-full bg-orange-600 transition-all"
                style={{ width: step >= 2 ? "100%" : "0%" }}
              ></div>
            </div>
            <div
              className={`flex items-center ${
                step >= 2 ? "text-orange-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="ml-2">Shipping</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className="h-full bg-orange-600 transition-all"
                style={{ width: step >= 3 ? "100%" : "0%" }}
              ></div>
            </div>
            <div
              className={`flex items-center ${
                step >= 3 ? "text-orange-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-orange-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="ml-2">Payment</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className="h-full bg-orange-600 transition-all"
                style={{ width: step >= 4 ? "100%" : "0%" }}
              ></div>
            </div>
            <div
              className={`flex items-center ${
                step >= 4 ? "text-orange-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 4 ? "bg-orange-600 text-white" : "bg-gray-200"
                }`}
              >
                4
              </div>
              <span className="ml-2">Review</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {step === 1 && (
                <div className="space-y-6">
                  {!otpSent ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Phone Verification
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                                placeholder="Enter your phone number"
                              />
                              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Send OTP
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Enter OTP
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              OTP
                            </label>
                            <input
                              type="text"
                              required
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                              placeholder="Enter the last 4 digits of your phone number"
                            />
                          </div>
                          <p className="text-sm text-gray-600">
                            Enter the last 4 digits of your phone number as OTP
                          </p>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Verify OTP
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </form>
                  )}
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Shipping Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.name}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          disabled
                          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-base text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Division
                        </label>
                        <Select
                          options={divisions}
                          value={shippingInfo.division}
                          onChange={(selected) => {
                            const newInfo = {
                              ...shippingInfo,
                              division: selected,
                              district: null,
                              area: null,
                            };
                            updateAddress(newInfo);
                          }}
                          styles={customStyles}
                          placeholder="Select Division"
                          isSearchable
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          District
                        </label>
                        <Select
                          options={getAvailableDistricts()}
                          value={shippingInfo.district}
                          onChange={(selected) => {
                            const newInfo = {
                              ...shippingInfo,
                              district: selected,
                              area: null,
                            };
                            updateAddress(newInfo);
                          }}
                          styles={customStyles}
                          placeholder="Select District"
                          isSearchable
                          isDisabled={!shippingInfo.division}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Area
                        </label>
                        <Select
                          options={getAvailableAreas()}
                          value={shippingInfo.area}
                          onChange={(selected) => {
                            const newInfo = {
                              ...shippingInfo,
                              area: selected,
                            };
                            updateAddress(newInfo);
                          }}
                          styles={customStyles}
                          placeholder="Select Area"
                          isSearchable
                          isDisabled={!shippingInfo.district}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.streetAddress}
                          onChange={(e) => {
                            const newInfo = {
                              ...shippingInfo,
                              streetAddress: e.target.value,
                            };
                            updateAddress(newInfo);
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                          placeholder="House/Flat number, Road number, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Address
                        </label>
                        <textarea
                          required
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                          placeholder="Your complete address will appear here"
                          rows={3}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Payment Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Method
                        </label>
                        <Select
                          options={paymentMethods.map((method) => ({
                            value: method.id,
                            label: method.name,
                          }))}
                          value={paymentInfo.paymentMethod}
                          onChange={handlePaymentMethodChange}
                          styles={customStyles}
                          placeholder="Select Payment Method"
                          isSearchable
                        />
                      </div>

                      {paymentInfo.paymentMethod?.value === "bkash" && (
                        <>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-green-800 font-medium">
                              Get 5% discount on your order with bKash payment!
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                              Send Money Instructions
                            </h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                              <li>Open your bKash app</li>
                              <li>
                                Send ৳{formatPrice(prices.finalTotal)} to:
                                01XXXXXXXXX
                              </li>
                              <li>
                                Use your order number as reference:{" "}
                                {orderNumber}
                              </li>
                              <li>
                                After sending money, enter the transaction
                                details below
                              </li>
                            </ol>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              bKash Number (Sender)
                            </label>
                            <input
                              type="tel"
                              required
                              value={paymentInfo.bkashNumber}
                              onChange={(e) =>
                                setPaymentInfo({
                                  ...paymentInfo,
                                  bkashNumber: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                              placeholder="01XXXXXXXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Transaction ID
                            </label>
                            <input
                              type="text"
                              required
                              value={paymentInfo.transactionId}
                              onChange={(e) =>
                                setPaymentInfo({
                                  ...paymentInfo,
                                  transactionId: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                              placeholder="Enter transaction ID"
                            />
                          </div>
                        </>
                      )}

                      {paymentInfo.paymentMethod?.value === "nagad" && (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                              Send Money Instructions
                            </h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                              <li>Open your Nagad app</li>
                              <li>
                                Send ৳{formatPrice(prices.finalTotal)} to:
                                01XXXXXXXXX
                              </li>
                              <li>
                                Use your order number as reference:{" "}
                                {orderNumber}
                              </li>
                              <li>
                                After sending money, enter the transaction
                                details below
                              </li>
                            </ol>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nagad Number (Sender)
                            </label>
                            <input
                              type="tel"
                              required
                              value={paymentInfo.nagadNumber}
                              onChange={(e) =>
                                setPaymentInfo({
                                  ...paymentInfo,
                                  nagadNumber: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                              placeholder="01XXXXXXXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Transaction ID
                            </label>
                            <input
                              type="text"
                              required
                              value={paymentInfo.transactionId}
                              onChange={(e) =>
                                setPaymentInfo({
                                  ...paymentInfo,
                                  transactionId: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                              placeholder="Enter transaction ID"
                            />
                          </div>
                        </>
                      )}

                      {paymentInfo.paymentMethod?.value === "rocket" && (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                              Send Money Instructions
                            </h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                              <li>Open your Rocket app</li>
                              <li>
                                Send ৳{formatPrice(prices.finalTotal)} to:
                                01XXXXXXXXX
                              </li>
                              <li>
                                Use your order number as reference:{" "}
                                {orderNumber}
                              </li>
                              <li>
                                After sending money, enter the transaction
                                details below
                              </li>
                            </ol>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rocket Number (Sender)
                            </label>
                            <input
                              type="tel"
                              required
                              value={paymentInfo.rocketNumber}
                              onChange={(e) =>
                                setPaymentInfo({
                                  ...paymentInfo,
                                  rocketNumber: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                              placeholder="01XXXXXXXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Transaction ID
                            </label>
                            <input
                              type="text"
                              required
                              value={paymentInfo.transactionId}
                              onChange={(e) =>
                                setPaymentInfo({
                                  ...paymentInfo,
                                  transactionId: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base text-gray-900 placeholder-gray-500"
                              placeholder="Enter transaction ID"
                            />
                          </div>
                        </>
                      )}

                      {paymentInfo.paymentMethod?.value === "cod" && (
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <p className="text-orange-800">
                            You will pay the full amount (৳
                            {formatPrice(prices.finalTotal)}) in cash when your
                            order is delivered.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Review Order
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Order Review
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-gray-900">
                            Shipping Information
                          </h3>
                          <button
                            onClick={() => setStep(2)}
                            className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-600 space-y-1">
                            <p className="font-medium text-gray-900">
                              {shippingInfo.name}
                            </p>
                            <p>{phoneNumber}</p>
                            <p>{shippingInfo.streetAddress}</p>
                            <p>
                              {shippingInfo.area?.label},{" "}
                              {shippingInfo.district?.label},{" "}
                              {shippingInfo.division?.label}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-gray-900">
                            Payment Information
                          </h3>
                          <button
                            onClick={() => setStep(3)}
                            className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-600 space-y-1">
                            <p className="font-medium text-gray-900">
                              Payment Method: {paymentInfo.paymentMethod?.label}
                            </p>
                            {paymentInfo.paymentMethod?.value === "card" && (
                              <>
                                <p>
                                  Card ending in{" "}
                                  {paymentInfo.cardNumber.slice(-4)}
                                </p>
                                <p>{paymentInfo.cardName}</p>
                              </>
                            )}
                            {paymentInfo.paymentMethod?.value === "bkash" && (
                              <p>bKash: {paymentInfo.bkashNumber}</p>
                            )}
                            {paymentInfo.paymentMethod?.value === "nagad" && (
                              <p>Nagad: {paymentInfo.nagadNumber}</p>
                            )}
                            {paymentInfo.paymentMethod?.value === "rocket" && (
                              <p>Rocket: {paymentInfo.rocketNumber}</p>
                            )}
                            {paymentInfo.paymentMethod?.value === "cod" && (
                              <p>Cash on Delivery</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">
                          Order Items
                        </h3>
                        <div className="space-y-4">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
                            >
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Quantity: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="text-gray-900 font-medium">
                                    {formatPrice(item.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Order Summary
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatPrice(prices.subtotal)}</span>
                          </div>
                          {prices.bKashDiscount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>bKash Discount (5%)</span>
                              <span>-{formatPrice(prices.bKashDiscount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>
                              {prices.shipping === 0
                                ? "Free"
                                : formatPrice(prices.shipping)}
                            </span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-semibold text-gray-900">
                              <span>Total</span>
                              <span>{formatPrice(prices.finalTotal)}</span>
                            </div>
                          </div>
                          {prices.shipping > 0 && (
                            <p className="text-sm text-gray-600 text-center mt-2">
                              Add{" "}
                              {formatPrice(
                                prices.freeShippingThreshold - prices.subtotal
                              )}{" "}
                              more for free shipping
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <Lock className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(prices.subtotal)}</span>
                  </div>
                  {prices.bKashDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>bKash Discount (5%)</span>
                      <span>-{formatPrice(prices.bKashDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {prices.shipping === 0
                        ? "Free"
                        : formatPrice(prices.shipping)}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(prices.finalTotal)}</span>
                    </div>
                  </div>
                  {prices.shipping > 0 && (
                    <p className="text-sm text-gray-600 text-center">
                      Add{" "}
                      {formatPrice(
                        prices.freeShippingThreshold - prices.subtotal
                      )}{" "}
                      more for free shipping
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
