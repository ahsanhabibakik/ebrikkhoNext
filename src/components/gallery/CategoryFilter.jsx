"use client";

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-12 justify-center">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === selectedCategory
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
