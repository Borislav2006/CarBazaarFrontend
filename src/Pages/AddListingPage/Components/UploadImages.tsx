import React, { useEffect, useState } from "react";
import "./UploadImages.css";
import { IoMdCloseCircle } from "react-icons/io";
import { ListingImage } from "../../../types/Listings";

type Props = {
  onImagesChange: (images: File[]) => void;
  defaultImageUrls?: ListingImage[];
};

const UploadImages = ({ onImagesChange, defaultImageUrls = [] }: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ListingImage[]>([]);

  useEffect(() => {
    if (defaultImageUrls.length > 0) {
      setExistingImages(defaultImageUrls);
    }
  }, [defaultImageUrls]);

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newFiles = [...uploadedFiles, ...fileArray];

    setUploadedFiles(newFiles);
    onImagesChange(newFiles);
  };

  const onNewImageRemove = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    onImagesChange(updatedFiles);
  };

  return (
    <div>
      <h2 className="upload-title">Upload Images</h2>
      <div className="images-container">
        {existingImages.map((image, index) => (
          <div key={`existing-${index}`}>
            <img
              src={`https://localhost:5001/images/${image.imagePath}`}
              className="images-upload"
            />
          </div>
        ))}
        {uploadedFiles.map((file, index) => (
          <div key={`uploaded-${index}`}>
            <IoMdCloseCircle
              className="close-button"
              onClick={() => onNewImageRemove(index)}
            />
            <img src={URL.createObjectURL(file)} className="images-upload" />
          </div>
        ))}
        <label>
          <div className="images-box">
            <h2 className="plus">+</h2>
          </div>
          <input
            type="file"
            multiple
            onChange={onFileSelected}
            className="input-images"
          />
        </label>
      </div>
    </div>
  );
};

export default UploadImages;
