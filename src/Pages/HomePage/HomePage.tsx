import React, { useState } from "react";
import Hero from "../../Components/Hero/Hero";
import CarListing from "../../Components/CarListing/CarListing";
import FilterSection from "../../Components/FilterSection/FilterSection";
import { QueryObject } from "../../types/Listings";

const HomePage = () => {
  const [filters, setFilters] = useState<QueryObject>({
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <>
      <Hero />
      <FilterSection filters={filters} setFilters={setFilters} />
      <CarListing filters={filters} />
    </>
  );
};


export default HomePage;
