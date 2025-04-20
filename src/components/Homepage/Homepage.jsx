import React from "react";
import Banner from "./Banner";
import About from "./About";
import Services from "./Services";
import Products from "./Products";
import PlantCategories from "./PlantCategories";

const Homepage = () => {
  return (
    <div className="w-full bg-white text-gray-800">
      <Banner />
      <PlantCategories />
      <Products />
      <About />
      <Services />
    </div>
  );
};

export default Homepage;
