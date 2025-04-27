import { motion } from "framer-motion";
import Link from "next/link";

const PlantCollectionSection = () => {
  const collections = [
    {
      id: 1,
      title: "Beautiful indoor plants",
      subtitle: "Living Decor",
      description:
        "Elevate your interior with nature's finest. Our plants add vibrant colors, textures, and life to any room, creating an inviting and refreshing atmosphere.",
      image:
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/indoor-plants",
    },
    {
      id: 2,
      title: "Energy Boost",
      description:
        "Experience the natural energy that plants bring to your space. Our selection includes air-purifying plants that improve indoor air quality and create a more vibrant living environment.",
      image:
        "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/air-purifying-plants",
    },
    {
      id: 3,
      title: "Timeless Elegance",
      description:
        "Discover the perfect balance of style and sustainability. Our plants are chosen for their enduring beauty and ability to enhance your home's aesthetic while requiring minimal maintenance.",
      image:
        "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/low-maintenance-plants",
    },
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Plant Collection
          </h2>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-6 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  {collection.title}
                </h3>
                {collection.subtitle && (
                  <p className="text-orange-500 font-medium">
                    {collection.subtitle}
                  </p>
                )}
                <p className="text-sm md:text-base text-gray-600">
                  {collection.description}
                </p>
                <Link
                  href={collection.link}
                  className="inline-block text-orange-500 font-medium hover:text-orange-600 transition-colors"
                >
                  Explore Collection →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantCollectionSection;
