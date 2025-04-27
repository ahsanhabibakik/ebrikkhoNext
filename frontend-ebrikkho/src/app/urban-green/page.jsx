import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/shared/CategoryCard";

export const metadata = {
  title: "Urban Green Revolution | Ebrikkho",
  description:
    "Join the urban green revolution with Ebrikkho. Discover how to create sustainable green spaces in urban environments, from rooftop gardens to vertical gardens and community initiatives.",
};

export default function UrbanGreenPage() {
  const categories = [
    {
      title: "Rooftop Gardens",
      description: "Transform your rooftop into a green oasis",
      image: "/images/gallery/rooftop.jpg",
      link: "/urban-green/rooftop-gardens",
    },
    {
      title: "Vertical Gardens",
      description: "Maximize space with vertical planting solutions",
      image: "/images/gallery/vertical.jpg",
      link: "/urban-green/vertical-gardens",
    },
    {
      title: "Community Gardens",
      description: "Join the community gardening movement",
      image: "/images/gallery/community.jpg",
      link: "/urban-green/community-gardens",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Urban Green Revolution
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          Join the movement to bring nature back to urban spaces. From rooftop
          gardens to vertical planting solutions, discover how you can
          contribute to a greener, more sustainable city environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        {/* Impact Section */}
        <div className="bg-orange-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Making a Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                Environmental Impact
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reduce urban heat island effect</li>
                <li>• Improve air quality</li>
                <li>• Support biodiversity</li>
                <li>• Reduce carbon footprint</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                Community Benefits
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Create green spaces</li>
                <li>• Foster community engagement</li>
                <li>• Promote sustainable living</li>
                <li>• Enhance urban aesthetics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
