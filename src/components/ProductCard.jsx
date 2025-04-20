"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-gray-600 hover:text-red-500"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Product Image */}
        <div
          className="relative overflow-hidden h-56 sm:h-64 w-full cursor-pointer"
          onClick={toggleModal}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5">
          {/* Buyers info */}
          <div className="mb-1 text-xs text-gray-500">
            {product.buyers}+ bought this
          </div>

          <h3
            className="text-lg font-bold text-gray-800 leading-tight cursor-pointer"
            onClick={toggleModal}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center text-sm mt-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-gray-600">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          {/* Price + Stock */}
          <div className="flex items-center justify-between mt-1">
            <div>
              <span className="text-xl font-bold text-orange-600">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Add to Cart */}
          <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition">
            Add to Cart <FaShoppingCart className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={toggleModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-2">
              {product.name}
            </Dialog.Title>
            <div className="relative w-full h-64 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <p className="text-sm text-gray-700 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-orange-600">
                ৳{product.price}
              </span>
              <button
                className="text-sm px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ProductCard;
