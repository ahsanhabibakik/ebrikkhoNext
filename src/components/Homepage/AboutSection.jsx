import Image from "next/image";

const AboutSection = () => {
  const highlights = [
    {
      id: 1,
      title: "Expert Plant Care",
      description:
        "Our team of horticulturists ensures every plant is healthy and thriving before it reaches your home.",
      icon: "🌱",
    },
    {
      id: 2,
      title: "Sustainable Practices",
      description:
        "We're committed to eco-friendly growing methods and sustainable packaging solutions.",
      icon: "🌍",
    },
    {
      id: 3,
      title: "Quality Guarantee",
      description:
        "Every plant comes with our 30-day health guarantee and lifetime care support.",
      icon: "✨",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/images/about/garden-center.jpg"
              alt="Our Garden Center"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Ebrikkho
            </h2>
            <p className="text-gray-600 mb-8">
              We're passionate about bringing nature into your home. With over
              10 years of experience, we've helped thousands of plant lovers
              create their perfect indoor and outdoor spaces. Our mission is to
              make plant parenthood accessible and enjoyable for everyone.
            </p>
            <div className="space-y-6">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="flex items-start gap-4">
                  <div className="text-4xl">{highlight.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
