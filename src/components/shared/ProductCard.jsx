"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { Heart, ShoppingCart, Tag } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, toggleCart } from "@/redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(toggleCart());
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={toggleModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="relative h-48 sm:h-56">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>
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
          {discountPercent && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {discountPercent}% Off
            </div>
          )}
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white/80 text-gray-600 p-1.5 rounded-full hover:bg-white transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="w-4 h-4 text-red-500" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                ৳{product.price.toLocaleString("bn-BD")}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                  ৳{product.originalPrice.toLocaleString("bn-BD")}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
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
                ৳{product.price.toLocaleString("bn-BD")}
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
