import { motion } from "framer-motion";
import {
  FaLeaf,
  FaUsers,
  FaSeedling,
  FaAward,
  FaHandHoldingHeart,
  FaRecycle,
  FaShieldAlt,
} from "react-icons/fa";
import Image from "next/image";

const AboutSection = () => {
  const stats = [
    { icon: <FaUsers />, value: "5000+", label: "Happy Customers" },
    { icon: <FaSeedling />, value: "100+", label: "Plant Varieties" },
    { icon: <FaLeaf />, value: "50+", label: "Expert Staff" },
    { icon: <FaAward />, value: "10+", label: "Years Experience" },
  ];

  const highlights = [
    {
      id: 1,
      title: "Expert Plant Care",
      description:
        "Our team of horticulturists ensures every plant is healthy and thriving before it reaches your home.",
      icon: <FaHandHoldingHeart className="text-orange-500" />,
    },
    {
      id: 2,
      title: "Sustainable Practices",
      description:
        "We're committed to eco-friendly growing methods and sustainable packaging solutions.",
      icon: <FaRecycle className="text-orange-500" />,
    },
    {
      id: 3,
      title: "Quality Guarantee",
      description:
        "Every plant comes with our 30-day health guarantee and lifetime care support.",
      icon: <FaShieldAlt className="text-orange-500" />,
    },
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* About Ebrikkho Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[250px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Ebrikkho Garden Center - Your destination for indoor and outdoor plants"
              fill
              className="object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400?text=Ebrikkho+Image";
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              About Ebrikkho
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Ebrikkho is a modern online destination for all things green and sustainable. We offer a wide range of indoor and outdoor plants, rooftop gardening essentials, seeds, eco-friendly gardening tools, organic fertilizers, and sustainable home decor. Our mission is to inspire greener lifestyles by making plants and nature-based living easy and accessible. Whether you're building a rooftop garden, refreshing your home with vibrant greenery, or looking for thoughtful eco-conscious gifts, Ebrikkho brings nature closer to your everyday life.
            </p>
            <div className="space-y-3">
              {highlights.map((highlight) => (
                <motion.div
                  key={highlight.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm"
                >
                  <div className="text-xl md:text-2xl mt-1">
                    {highlight.icon}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-gray-800 mb-2"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-gray-600"
          >
            Discover the unique benefits of choosing our plant collection
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-orange-500 text-xl md:text-2xl mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-lg md:text-xl font-bold text-gray-800 text-center">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
