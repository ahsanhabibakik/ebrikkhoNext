"use client";
import { useEffect, useState } from "react";
import FeaturedProducts from "./FeaturedProducts";


const FeaturedProductsClient = ({homepageData}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures client-specific rendering
  }, []);

  return (
    <div>
      {/* New Arrivals */}
      {isClient && (
        <FeaturedProducts
          products={homepageData.newArrivals}
          title="New Arrivals"
          description="Check out our latest products"
        />
      )}
    </div>
  );
};

export default FeaturedProductsClient;
