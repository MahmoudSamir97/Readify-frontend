import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import './profile.css'; // Keep your custom CSS for additional styling

export default function Profile() {
  const { control, handleSubmit } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data); // Back End To handle
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-4">
      <Controller
        name="picture"
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
        <div className="avatar-wrapper">
          {selectedImage ? (
            <img src={selectedImage} alt="preview" className="rounded-circle avatar-img" />
          ) : (
            <i className="fas fa-camera fa-3x"></i> // Example, you might need to adjust based on your icons
          )}
        </div>
      </label>
      <button
        type="submit"
        className="btn btn-primary mt-2 gradient-button"
      >
        Confirm
      </button>
    </form>
  );
}