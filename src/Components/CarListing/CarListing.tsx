import React, { useEffect, useState } from "react";
import { Listing, QueryObject } from "../../types/Listings";
import { getListings } from "../../api/api";
import CarItem from "./CarItem";
import "./CarListing.css";

type Props = {};

const CarListing = (props: Props) => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const query: QueryObject = {
        pageNumber: 1,
        pageSize: 10,
      };

      try {
        const data = await getListings();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      }
    };

    fetchListings();
  }, []);

  console.log("listings data", listings);

  return (
    <div className="car-listing-grid">
      {listings.map((listing, index) => (
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
      ))}
    </div>
  );
};

export default CarListing;
