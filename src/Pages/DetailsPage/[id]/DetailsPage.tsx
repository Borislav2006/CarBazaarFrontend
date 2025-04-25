import React, { useEffect, useState } from "react";
import "./DetailsPage.css";
import { getListingById, getUserListings } from "../../../api/api";
import { Listing } from "../../../types/Listings";
import { useParams } from "react-router";
import ImageGallery from "../Components/ImageGallery/ImageGallery";
import { FaEuroSign } from "react-icons/fa";
import CarSpecification from "../Components/CarSpecification/CarSpecification";
import OwnersDetails from "../Components/OwnersDetails/OwnersDetails";

type Props = {};

const DetailsPage = (props: Props) => {
  const [listing, setListing] = useState<Listing>();
  const { id } = useParams();
  console.log("Details Page", id);
  console.log("listing", listing);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListingById(id || "");
        setListing(data);
      } catch (err) {
        console.error("Failed to fetch listing", err);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="details-header">
      <h2 className="title">{listing?.title}</h2>
      <div className="details-container">
        <div className="image-container">
          <>
            <ImageGallery images={listing?.images} />
          </>
          <div className="description-container">
            <h2 className="description-header">Description</h2>
            <p>{listing?.description}</p>
          </div>
          <OwnersDetails listing={listing} />
        </div>
        <div className="c-container">
          <div className="price-container">
            <h2>Price</h2>
            <div className="price">
              <FaEuroSign />
              <h2>{listing?.price}</h2>
            </div>
          </div>
          <CarSpecification listing={listing} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
