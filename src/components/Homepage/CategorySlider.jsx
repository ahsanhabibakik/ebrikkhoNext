import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

const CategorySlider = () => {
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: 1,
      title: "Indoor Plants",
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/indoor-plants",
      color: "bg-green-100",
    },
    {
      id: 2,
      title: "Outdoor Plants",
      image:
        "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/outdoor-plants",
      color: "bg-blue-100",
    },
    {
      id: 3,
      title: "Gardening Kits",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/gardening-kits",
      color: "bg-amber-100",
    },
    {
      id: 4,
      title: "Sustainable Gifts",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/sustainable-gifts",
      color: "bg-purple-100",
    },
    {
      id: 5,
      title: "Urban Green",
      image:
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/urban-green",
      color: "bg-teal-100",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Explore Categories
        </h2>
        <div className="relative mx-auto max-w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar justify-center md:justify-start"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              cursor: "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 snap-center"
              >
                <Link href={category.link} className="block">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 ${category.color} opacity-30`}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="text-sm md:text-base font-medium text-gray-800">
                      {category.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
