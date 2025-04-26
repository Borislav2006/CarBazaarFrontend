import React, { useEffect, useState } from "react";
import "./AddListingPage.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateListing, Listing } from "../../types/Listings";
import { createListing, getListingById, updateListing } from "../../api/api";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdPricetag } from "react-icons/io";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { IoColorPaletteOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { TbFileDescription } from "react-icons/tb";
import { FaClipboard } from "react-icons/fa";
import { TbManualGearbox } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { BiSolidTachometer } from "react-icons/bi";
import UploadImages from "./Components/UploadImages";

type Props = {};

type ListingFormInput = {
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  milage: number;
  price: number;
  engineType: string;
  horsePower: number;
  gearBox: string;
  color: string;
  imageFiles: File[];
};

const carOptions = {
  Toyota: [
    "Corolla",
    "Camry",
    "Yaris",
    "RAV4",
    "Highlander",
    "Land Cruiser",
    "Prius",
    "Hilux",
  ],
  Honda: [
    "Civic",
    "Accord",
    "CR-V",
    "Pilot",
    "Fit",
    "HR-V",
    "Odyssey",
    "Insight",
  ],
  Ford: [
    "Fiesta",
    "Focus",
    "Fusion",
    "Escape",
    "Explorer",
    "F-150",
    "Mustang",
    "Edge",
  ],
  BMW: ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "i3", "M3"],
  Mercedes: [
    "A-Class",
    "C-Class",
    "E-Class",
    "S-Class",
    "GLA",
    "GLC",
    "GLE",
    "G-Class",
  ],
  Audi: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "TT"],
  Volkswagen: [
    "Golf",
    "Polo",
    "Passat",
    "Jetta",
    "Tiguan",
    "Touareg",
    "Arteon",
    "Beetle",
  ],
  Hyundai: [
    "Elantra",
    "Sonata",
    "Tucson",
    "Santa Fe",
    "Kona",
    "i30",
    "Accent",
    "Palisade",
  ],
  Kia: [
    "Rio",
    "Cerato",
    "Sportage",
    "Sorento",
    "Soul",
    "Seltos",
    "Stinger",
    "Picanto",
  ],
  Nissan: [
    "Micra",
    "Sentra",
    "Altima",
    "Maxima",
    "Rogue",
    "Murano",
    "Pathfinder",
    "370Z",
  ],
  Chevrolet: [
    "Spark",
    "Cruze",
    "Malibu",
    "Equinox",
    "Traverse",
    "Tahoe",
    "Camaro",
    "Silverado",
  ],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Roadster", "Cybertruck"],
  Mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-5", "CX-9", "MX-5"],
  Subaru: [
    "Impreza",
    "Legacy",
    "Forester",
    "Outback",
    "Crosstrek",
    "BRZ",
    "WRX",
  ],
  Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
  Jeep: [
    "Renegade",
    "Compass",
    "Cherokee",
    "Grand Cherokee",
    "Wrangler",
    "Gladiator",
  ],
  Peugeot: ["208", "308", "508", "2008", "3008", "5008"],
  Renault: ["Clio", "Megane", "Captur", "Kadjar", "Talisman", "ZOE"],
  Skoda: ["Fabia", "Octavia", "Superb", "Karoq", "Kodiaq", "Scala"],
  LandRover: [
    "Defender",
    "Discovery",
    "Range Rover",
    "Range Rover Evoque",
    "Velar",
  ],
};

const gearboxOptions = ["Manual", "Automatic"];
const fuelTypeOptions = ["Petrol", "Diesel", "Electric", "Hybrid", "Gas"];

const colorOptions = [
  "Black",
  "White",
  "Silver",
  "Red",
  "Blue",
  "Gray",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
  "Beige",
];

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number()
    .typeError("Year must be a number")
    .required("Year is required"),
  milage: Yup.number()
    .typeError("Milage must be a number")
    .required("Milage is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  engineType: Yup.string().required("Engine Type is required"),
  horsePower: Yup.number()
    .typeError("Horse Power must be a number")
    .required("Horse Power is required"),
  gearBox: Yup.string().required("GearBox is required"),
  color: Yup.string().required("Color is required"),
  imageFiles: Yup.array()
    .min(1, "You must upload at least one image")
    .required("Images are required"),
});

const AddListingPage = (props: Props) => {
  const [searchParams] = useSearchParams();
  const [listing, setListing] = useState<Listing>();
  const mode = searchParams.get("mode");
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [models, setModels] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm<ListingFormInput>({ resolver: yupResolver(validation) });
  const selectedBrand = watch("brand");
  const isEditMode = mode === "edit";

  const handleCreateOrUpdateListing = async (form: ListingFormInput) => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key !== "imageFiles") {
        formData.append(key, String(value));
      }
    });

    if (form.imageFiles && form.imageFiles.length > 0) {
      Array.from(form.imageFiles).forEach((file) => {
        formData.append("Images", file);
      });
    }

    try {
      if (isEditMode) {
        // Update the listing if in edit mode
        if (!id) throw new Error("Listing ID is required for update");
        console.log("form Data", formData.values());
        await updateListing(id, formData); // Call your update API
        toast.success("Listing updated successfully!");
      } else {
        // Create a new listing if not in edit mode
        await createListing(formData);
        toast.success("Listing created successfully!");
      }
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to process the request.");
    }
  };

  useEffect(() => {
    if (selectedBrand) {
      //@ts-ignore
      setModels(carOptions[selectedBrand] || []);
      resetField("model");
    }
  }, [selectedBrand, resetField]);

  useEffect(() => {
    const fetchListing = async () => {
      if (isEditMode && id) {
        try {
          const data = await getListingById(id);
          setListing(data);
          // Set form data after fetching listing
          reset(data);
        } catch (err) {
          console.error("Failed to fetch listing", err);
        }
      }
    };

    fetchListing();
  }, [id, mode, reset]);

  return (
    <div className="wrapper">
      <h2 className="title">Add New Listing</h2>
      <form
        className="form"
        onSubmit={handleSubmit(handleCreateOrUpdateListing)}
      >
        <div>
          <h2 className="car-detail">Car Details:</h2>
          <div className="addListing-grid">
            <div>
              <label className="addListing-label" htmlFor="text">
                <FaClipboard />
                Title
              </label>
              <input
                className="Listing-input"
                type="text"
                id="title"
                placeholder="Title"
                {...register("title")}
              />
              {errors.title && <p className="error">{errors.title.message}</p>}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <FaCar />
                Brand
              </label>
              <select className="custom-select" {...register("brand")}>
                <option value={""}>Select Brand</option>
                {Object.keys(carOptions).map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.brand && <p className="error">{errors.brand.message}</p>}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <BiSolidTachometer />
                Mileage
              </label>
              <input
                className="Listing-input"
                type="number"
                min="0"
                id="mileage"
                placeholder="Mileage"
                {...register("milage")}
              />
              {errors.milage && (
                <p className="error">{errors.milage.message}</p>
              )}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <FaCarSide />
                Model
              </label>
              <select
                className="custom-select"
                {...register("model")}
                disabled={!selectedBrand}
              >
                <option value={""}>Select Model</option>
                {models.map((model) => (
                  <option value={model} key={model}>
                    {model}
                  </option>
                ))}
              </select>
              {errors.model && <p className="error">{errors.model.message}</p>}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <SlCalender />
                Year
              </label>
              <input
                className="Listing-input"
                type="number"
                min="1970"
                max="2025"
                id="year"
                placeholder="Year"
                {...register("year")}
              />
              {errors.year && <p className="error">{errors.year.message}</p>}
            </div>
            <div className="fuel">
              <label className="addListing-label" htmlFor="text">
                <BsFillFuelPumpFill />
                Fuel Type
              </label>
              <select
                className="custom-select"
                id="fueltype"
                {...register("engineType")}
              >
                <option value="">Select Fuel Type</option>
                {fuelTypeOptions.map((fuel, idx) => (
                  <option key={idx} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
              {errors.engineType && (
                <p className="error">{errors.engineType.message}</p>
              )}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <IoMdPricetag />
                Price
              </label>
              <input
                className="Listing-input"
                type="number"
                min="0"
                id="price"
                placeholder="Price"
                {...register("price")}
              />
              {errors.price && <p className="error">{errors.price.message}</p>}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <TbManualGearbox />
                Gear Box
              </label>
              <select
                className="custom-select"
                id="gearBox"
                {...register("gearBox")}
              >
                <option value="">Select Gearbox</option>
                {gearboxOptions.map((gear, idx) => (
                  <option key={idx} value={gear}>
                    {gear}
                  </option>
                ))}
              </select>
              {errors.gearBox && (
                <p className="error">{errors.gearBox.message}</p>
              )}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <SlSpeedometer />
                Horse Power
              </label>
              <input
                className="Listing-input"
                type="number"
                min="0"
                max="1000"
                id="horsePower"
                placeholder="Horse Power"
                {...register("horsePower")}
              />
              {errors.horsePower && (
                <p className="error">{errors.horsePower.message}</p>
              )}
            </div>
            <div>
              <label className="addListing-label" htmlFor="text">
                <IoColorPaletteOutline />
                Color
              </label>
              <select
                id="color"
                className="custom-select"
                {...register("color")}
              >
                <option value="">Select Color</option>
                {colorOptions.map((color, idx) => (
                  <option key={idx} value={color}>
                    {color}
                  </option>
                ))}
              </select>
              {errors.color && <p className="error">{errors.color.message}</p>}
            </div>
            <div>
              <label className="addListing-label" htmlFor="description">
                <TbFileDescription />
                Description
              </label>
              <textarea
                className="Listing-input"
                id="description"
                placeholder="Description"
                rows={5} // <-- controls the height
                {...register("description")}
              />
              {errors.description && (
                <p className="error">{errors.description.message}</p>
              )}
            </div>
          </div>
          <hr></hr>
          <UploadImages
            onImagesChange={(files) =>
              setValue("imageFiles", files, { shouldValidate: true })
            }
            defaultImageUrls={listing?.images}
          />
          {errors.imageFiles && (
            <p className="error">{errors.imageFiles.message}</p>
          )}
          <hr></hr>
          {isEditMode ? (
            <button className="post-button" type="submit">
              Update Listing
            </button>
          ) : (
            <button className="post-button" type="submit">
              Post Listing
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddListingPage;
