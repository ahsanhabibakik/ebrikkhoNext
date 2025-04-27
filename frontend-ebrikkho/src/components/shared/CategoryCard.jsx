import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ title, description, image, link }) => {
  return (
    <Link href={link} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <div className="aspect-w-16 aspect-h-9">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-0 p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
              {title}
            </h3>
            <p className="text-white/80 text-sm group-hover:text-orange-100 transition-colors">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
