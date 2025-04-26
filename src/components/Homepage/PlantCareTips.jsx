"use client";

export default function PlantCareTips({ tips }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plant Care Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice to help your plants thrive
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {tip.title}
              </h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
