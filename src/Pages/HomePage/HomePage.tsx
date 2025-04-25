import React from "react";
import Hero from "../../Components/Hero/Hero";
import CarListing from "../../Components/CarListing/CarListing";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <>
      <Hero />
      <CarListing />
    </>
  );
};

export default HomePage;
