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

type Props = {
  listing?: Listing;
};

const CarSpecification = ({ listing }: Props) => {
  return (
    <div className="specification-container">
      <h2 className="specifications-header">Specifications</h2>
      <div className="specification-item">
        <h2 className="specification">
          <FaCar />
          Brand
        </h2>
        <h2>{listing?.brand}</h2>
      </div>
      <div className="specification-item">
        <h2 className="specification">
          <FaCarSide />
          Model
        </h2>
        <h2>{listing?.model}</h2>
      </div>
      <div className="specification-item">
        <h2 className="specification">
          <SlCalender />
          Year
        </h2>
        <h2>{listing?.year}</h2>
      </div>
      <div className="specification-item">
        <h2 className="specification">
          <IoColorPaletteOutline />
          Color
        </h2>
        <h2>{listing?.color}</h2>
      </div>
      <div className="specification-item">
        <h2 className="specification">
          <BsFillFuelPumpFill />
          Engine Type
        </h2>
        <h2>{listing?.engineType}</h2>
      </div>
      <div className="specification-item">
        <h2 className="specification">
          {listing?.gearBox === "Automatic" ? (
            <TbAutomaticGearbox />
          ) : (
            <TbManualGearbox />
          )}
          Gear Box
        </h2>
        <h2>{listing?.gearBox}</h2>
      </div>
      <div className="specification-item">
        <h2 className="specification">
          <SlSpeedometer />
          Horse Power
        </h2>
        <h2>{listing?.horsePower}</h2>
      </div>
      <div className="specification-item">
        <h2 className="specification">
          <FaCar />
          Mileage
        </h2>
        <h2>{listing?.milage}</h2>
      </div>
    </div>
  );
};

export default CarSpecification;
