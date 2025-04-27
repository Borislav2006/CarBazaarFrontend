import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import CarListing from "../../Components/CarListing/CarListing";
import MyListings from "../../Components/MyListings/MyListings";
import { sortByOptions } from "../../Helpers/Data";
import { QueryObject } from "../../types/Listings";

type Props = {};

const ProfilePage = (props: Props) => {
  const [filters, setFilters] = useState<QueryObject>({
    pageNumber: 1,
    pageSize: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        <div className="wrapper">
          <div className="header">
            <h2 className="text">My listings</h2>
            <Link to="/add-listing" className="nav-link">
              + Add New Listing
            </Link>
          </div>
          <div className="filter-section-profile">
            <div className="filter-controls">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
              >
                <option value="">Sort By</option>
                {sortByOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <MyListings filters={filters}/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
