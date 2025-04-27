import React, { useEffect, useState } from "react";
import "./FilterSection.css";
import {
  carOptions,
  colorOptions,
  engineTypeOptions,
  fuelTypeOptions,
  gearboxOptions,
  sortByOptions,
} from "../../Helpers/Data";
import { useForm } from "react-hook-form";
import { QueryObject } from "../../types/Listings";

interface FilterSectionProps {
  filters: QueryObject;
  setFilters: React.Dispatch<React.SetStateAction<QueryObject>>;
}

const FilterSection = ({ filters, setFilters }: FilterSectionProps) => {
  const [models, setModels] = useState<string[]>([]);
  const selectedBrand = filters.brand;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (selectedBrand) {
      //@ts-ignore
      setModels(carOptions[selectedBrand] || []);
      setFilters((prev) => ({ ...prev, model: "" }));
    }
  }, [selectedBrand]);

  return (
    <div className="filter-section">
      <h2>Filter Listings</h2>
      <div className="filter-controls">
        <select name="brand" value={filters.brand} onChange={handleChange}>
          <option value={""}>Select Brand</option>
          {Object.keys(carOptions).map((brand) => (
            <option value={brand} key={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          name="model"
          value={filters.model}
          onChange={handleChange}
          disabled={!filters.brand}
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <select name="gearBox" value={filters.gearBox} onChange={handleChange}>
          <option value="">Select Gearbox</option>
          {gearboxOptions.map((gear, idx) => (
            <option key={idx} value={gear}>
              {gear}
            </option>
          ))}
        </select>
        <select
          name="engineType"
          value={filters.engineType}
          onChange={handleChange}
        >
          <option value="">Select Engine Type</option>
          {engineTypeOptions.map((engine, idx) => (
            <option key={idx} value={engine}>
              {engine}
            </option>
          ))}
        </select>
        <select
          name="fuelType"
          value={filters.fuelType}
          onChange={handleChange}
        >
          <option value="">Select Fuel Type</option>
          {fuelTypeOptions.map((fuel, idx) => (
            <option key={idx} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
        <select name="color" value={filters.color} onChange={handleChange}>
          <option value="">Select Color</option>
          {colorOptions.map((color, idx) => (
            <option key={idx} value={color}>
              {color}
            </option>
          ))}
        </select>
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="">Sort By</option>
          {sortByOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
