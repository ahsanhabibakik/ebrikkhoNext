"use client";

export default function GalleryHero() {
  return (
    <section className="relative h-[300px] bg-orange-800">
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?random=9')] bg-cover bg-center" />
      <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl md:text-2xl">
            Inspiring plant arrangements and projects
          </p>
        </div>
      </div>
    </section>
  );
}
