import React, { useEffect, useState } from "react";
import "./MyListings.css";
import { deleteListing, getUserListings } from "../../api/api";
import { Listing } from "../../types/Listings";
import CarListing from "../CarListing/CarListing";
import CarItem from "../CarListing/CarItem";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {};

const MyListings = (props: Props) => {
  const [userListings, setUserListings] = useState<Listing[]>([]);

  const handleDeleteListing = async (id: number) => {
    try {
      await deleteListing(id);
      const data = await getUserListings();
      setUserListings(data);
    } catch (err) {
      console.error("Failed to delete user listings", err);
    }
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const data = await getUserListings();
        setUserListings(data);
      } catch (err) {
        console.error("Failed to fetch user listings", err);
      }
    };

    fetchUserListings();
  }, []);

  return (
    <div className="car-listing-grid">
      {userListings.map((listing, index) => (
        <div key={index}>
          <CarItem
            id={listing.id}
            key={index}
            imagePath={listing.images[0].imagePath}
            price={listing.price}
            gearBox={listing.gearBox}
            fuelType={listing.engineType}
            year={listing.year}
            title={listing.title}
          />
          <div className="buttons">
            <Link to={`/add-listing?mode=edit&id=${listing.id}`} className="edit-link">
              <button className="edit-button">Edit</button>
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDeleteListing(listing.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
