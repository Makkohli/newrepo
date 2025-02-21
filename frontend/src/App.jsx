import { useState } from "react";

const App = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {preview && <img src={preview} alt="Preview" className="w-40 mb-2" />}
    </div>
  );
};

export default App;
