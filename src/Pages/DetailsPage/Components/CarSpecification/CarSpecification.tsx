import React from "react";
import "./CarSpecification.css";
import { Listing } from "../../../../types/Listings";
import { FaCar } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TbAutomaticGearbox } from "react-icons/tb";
import { TbManualGearbox } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiEngineBold } from "react-icons/pi";

type Props = {
  listing?: Listing;
};

const CarSpecification = ({ listing }: Props) => {
  return (
    <div className="specification-container">
      <h2 className="specifications-header">Specifications</h2>
      <div className="specification-item">
        <h3 className="specification">
          <FaCar />
          Brand
        </h3>
        <h3>{listing?.brand}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          <FaCarSide />
          Model
        </h3>
        <h3>{listing?.model}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          <SlCalender />
          Year
        </h3>
        <h3>{listing?.year}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          <IoColorPaletteOutline />
          Color
        </h3>
        <h3>{listing?.color}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          <PiEngineBold />
          Engine Type
        </h3>
        <h3>{listing?.engineType}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          <BsFillFuelPumpFill />
          Fuel Type
        </h3>
        <h3>{listing?.fuelType}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          {listing?.gearBox === "Automatic" ? (
            <TbAutomaticGearbox />
          ) : (
            <TbManualGearbox />
          )}
          Gear Box
        </h3>
        <h3>{listing?.gearBox}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          <SlSpeedometer />
          Horse Power
        </h3>
        <h3>{listing?.horsePower}</h3>
      </div>
      <div className="specification-item">
        <h3 className="specification">
          <FaCar />
          Mileage
        </h3>
        <h3>{listing?.milage}</h3>
      </div>
    </div>
  );
};

export default CarSpecification;
