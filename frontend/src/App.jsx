import React, { useState } from "react";

const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resizedImages, setResizedImages] = useState([]);

  // Predefined dimensions
  const dimensions = [
    { width: 50, height: 50 },
    { width: 100, height: 100 },
    { width: 200, height: 200 },
    { width: 400, height: 400 },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      resizeImage(file);
    }
  };

  const resizeImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const newImages = dimensions.map((dim) => {
          const canvas = document.createElement("canvas");
          canvas.width = dim.width;
          canvas.height = dim.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, dim.width, dim.height);
          return {
            url: canvas.toDataURL("image/png"),
            width: dim.width,
            height: dim.height,
          };
        });
        setResizedImages(newImages);
      };
    };
  };

  return (
    <div className="p-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Image Resizer</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resizedImages.map((image, index) => (
          <div key={index} className="flex flex-col items-center border p-2">
            <img src={image.url} alt="Resized" className="w-full h-auto" />
            <p className="text-sm mt-2">{image.width}x{image.height}</p>
            <a href={image.url} download={`resized_${image.width}x${image.height}.png`} className="text-blue-500 mt-1">
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageResizer;
