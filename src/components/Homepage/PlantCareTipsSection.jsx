"use client";

export default function PlantCareTipsSection({ tips }) {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Plant Care Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice to help your plants thrive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {tip.icon}
                <h3 className="text-xl font-semibold ml-3">{tip.title}</h3>
              </div>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
