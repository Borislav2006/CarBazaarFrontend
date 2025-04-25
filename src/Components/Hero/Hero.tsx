import React from "react";
import "./Hero.css";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div>
      <div className="hero">
        <h2 className="hero-header">Drive Your Dream</h2>
        <h2 className="hero-subHeader">Welcome to CarBazaar</h2>
        <img className="carImage" src="car.png" />
      </div>
    </div>
  );
};

export default Hero;
