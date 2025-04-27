import { motion } from "framer-motion";
import { FaWater, FaSun, FaSeedling, FaBug } from "react-icons/fa";
import Link from "next/link";

const PlantCareSection = () => {
  const careTips = [
    {
      id: 1,
      title: "Watering Guide",
      description:
        "Learn the right way to water your plants based on their type and season",
      icon: <FaWater className="text-blue-500" />,
      image:
        "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Light Requirements",
      description: "Understand how much light your plants need to thrive",
      icon: <FaSun className="text-yellow-500" />,
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Soil & Fertilizer",
      description:
        "Choose the right soil and fertilizer for healthy plant growth",
      icon: <FaSeedling className="text-green-500" />,
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Pest Control",
      description: "Natural ways to keep your plants pest-free",
      icon: <FaBug className="text-red-500" />,
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Plant Care Tips
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Expert advice to help your plants thrive and grow beautifully
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {careTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white text-xl">{tip.icon}</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                  {tip.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 md:p-8 text-center text-white shadow-lg"
        >
          <h3 className="text-lg md:text-xl font-bold mb-2">
            Ready to Transform Your Space?
          </h3>
          <p className="text-sm md:text-base mb-4 max-w-2xl mx-auto">
            Join thousands of happy customers who have already enhanced their
            homes with our plants
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-orange-500 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PlantCareSection;
