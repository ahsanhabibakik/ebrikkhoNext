import React from "react";
import Banner from "./Banner";
import About from "./About";
import Services from "./Services";
import Products from "./Products";

const Homepage = () => {
  return (
    <div className="w-full">
      <Banner />
      <Products />
      <About />
      <Services />
    </div>
  );
};

export default Homepage;
