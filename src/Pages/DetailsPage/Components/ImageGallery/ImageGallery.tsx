import React, { useState } from "react";
import { ListingImage } from "../../../../types/Listings";
import "./ImageGallery.css";

type Props = {
  images?: ListingImage[];
};

const ImageGallery = ({ images }: Props) => {
  console.log("images", images);
  const [current, setCurrent] = useState(0);
  const numberOfPictures = images?.length || 0;
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % numberOfPictures);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + numberOfPictures) % numberOfPictures);
  };
  return (
    <div className="slideshow-container">
      {images?.map((image, index) => (
        <div
          key={index}
          className={`mySlides`}
          style={{ display: index === current ? "block" : "none" }}
        >
          <img
            className="image-gallery"
            src={`https://localhost:5001/images/${image.imagePath}`}
            alt={`slide-${index}`}
          />
        </div>
      ))}
      {images?.length > 1 && (
        <>
          <a className="prev" onClick={prevSlide}>
            &#10094;
          </a>
          <a className="next" onClick={nextSlide}>
            &#10095;
          </a>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
