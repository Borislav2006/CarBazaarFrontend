import React from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbAutomaticGearbox } from "react-icons/tb";
import { TbManualGearbox } from "react-icons/tb";
import { IoOpenOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaEuroSign } from "react-icons/fa";
import "./CarItem.css";
import { Link } from "react-router-dom";
import MyListings from "../MyListings/MyListings";
import { formatDate } from "../../Helpers/DateFormater";

type Props = {
  id: number;
  imagePath: string;
  price: number;
  gearBox: string;
  fuelType: string;
  year: number;
  title: string;
  createdAt: string;
};

const CarItem = ({ imagePath, price, gearBox, fuelType, year, id, title, createdAt }: Props) => {
  const imageUrl = `https://localhost:5001/images/${imagePath}`;
  return (
    <div className="card">
      {/* <h2>Published: {formatDate(createdAt)}</h2> */}
      <img className="image" src={imageUrl} />
      <div>
        <h2 className="brand">{title}</h2>
        <hr className="brand-divider"></hr>
        <div className="icons">
          <div className="icon">
            <SlCalender />
            <h2>{year}</h2>
          </div>
          <div className="icon">
            <BsFillFuelPumpFill />
            <h2>{fuelType}</h2>
          </div>
          <div className="icon">
            {gearBox === "Automatic" ? (
              <TbAutomaticGearbox />
            ) : (
              <TbManualGearbox />
            )}
            <h2>{gearBox}</h2>
          </div>
          <div className="price">
            <FaEuroSign />
            <h2>{price}</h2>
          </div>
          <hr className="divider"></hr>
          <div className="more-info">
            <Link to={`/details-page/${id}`} className="link-details">
              <h2 className="details">
                View Details
                <IoOpenOutline />
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
