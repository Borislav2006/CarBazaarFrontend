import React, { useEffect, useState } from "react";
import { Listing, QueryObject } from "../../types/Listings";
import { getListings } from "../../api/api";
import CarItem from "./CarItem";
import "./CarListing.css";
import FilterSection from "../FilterSection/FilterSection";

interface CarListingProps {
  filters: QueryObject;
}

const CarListing = ({ filters }: CarListingProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    filters.pageNumber ?? 1
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      let sortField;
      let isDescending;

      if (filters.sortBy) {
        const [field, direction] = filters.sortBy.split("-");
        sortField = field;
        isDescending = direction === "desc";
      }

      const query: QueryObject = {
        brand: filters.brand,
        model: filters.model,
        engineType: filters.engineType,
        fuelType: filters.fuelType,
        gearBox: filters.gearBox,
        color: filters.color,
        sortBy: sortField,
        isDescending: isDescending,
        pageNumber: currentPage,
        pageSize: filters.pageSize ?? 6,
      };

      try {
        const data = await getListings(query);
        setListings(data.items);
        const totalItems = data.totalCount;
        const totalPages = Math.ceil(totalItems / query.pageSize!);
        setTotalPages(totalPages);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      }
    };

    fetchListings();
  }, [filters, currentPage]);

  return (
    <>
      <div className="car-listing-grid">
        {listings.map((listing, index) => (
          <CarItem
            id={listing.id}
            key={index}
            imagePath={listing.images[0].imagePath}
            price={listing.price}
            gearBox={listing.gearBox}
            fuelType={listing.fuelType}
            year={listing.year}
            title={listing.title}
            createdAt={listing.createdAt}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CarListing;
