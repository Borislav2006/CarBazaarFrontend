import React, { useEffect, useState } from "react";
import "./MyListings.css";
import { deleteListing, getUserListings } from "../../api/api";
import { Listing } from "../../types/Listings";
import CarListing from "../CarListing/CarListing";
import CarItem from "../CarListing/CarItem";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

const MyListings = (props: Props) => {
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<number | null>(
    null
  );

  const handleDeleteListing = async (id: number) => {
    try {
      await deleteListing(id);
      const data = await getUserListings();
      setUserListings(data);
      toast.success("Listing deleted successfully!");
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
            createdAt={listing.createdAt}
          />
          <div className="buttons">
            <Link
              to={`/add-listing?mode=edit&id=${listing.id}`}
              className="edit-link"
            >
              <button className="edit-button">Edit</button>
            </Link>
            <button
              className="delete-button"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedListingId(listing.id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Are you sure you want to delete?</h2>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  if (selectedListingId !== null) {
                    handleDeleteListing(selectedListingId);
                    setIsModalOpen(false);
                  }
                }}
                className="btn-confirm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
