import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./profile.css";

export default function Profile({
  setSelectedImage,
  selectedImage,
  onSubmit,
  previewImage,
  setPreviewImage,
}) {
  const { control, handleSubmit } = useForm();
  // const [previewImage, setPreviewImage] = useState(null);
  const handleSubmite = (e) => {
    onSubmit(e);
  };
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmite}>
      <Controller
        name="profileImage"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            type="file"
            {...field}
            className="d-none"
            id="file-input"
            onChange={(e) => {
              field.onChange(e); // inform react-hook-form
              handleImageChange(e); // handle the image change for preview
            }}
          />
        )}
      />
      <label htmlFor="file-input" className="avatar-label">
        <div className="avatar-wrapper mt-0 pt-0 ms-5">
          {previewImage ? (
            <img
              src={previewImage}
              alt="preview"
              className="rounded-circle avatar-img"
            />
          ) : (
            <i className="fas fa-camera fa-3x"></i> // Example, you might need to adjust based on your icons
          )}
        </div>
      </label>
      <button type="submit" className="btn btn-primary gradient-button mt-4">
        Confirm
      </button>
    </form>
  );
}
