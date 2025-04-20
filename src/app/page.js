import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import products from "@/lib/products";

export default function Home() {
  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}