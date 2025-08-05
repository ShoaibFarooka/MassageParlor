import React, { useEffect, useState } from "react";
import galleryService from "../../../services/galleryService";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa"; // Importing react icon
import ServicesHeader from "../components/ServicesHeader";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const fetchGallery = async () => {
    try {
      const res = await galleryService.getGalleryByServiceProvider(user._id);
      setImages(res?.gallery?.images || []);
      console.log(res, 'res123');
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  useEffect(() => {
    if (user._id) fetchGallery();
  }, [user._id]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (images.length >= 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("serviceProvider", user._id);

    try {
      setLoading(true);
      await galleryService.uploadImage(formData);
      await fetchGallery();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imgId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await galleryService.deleteImage(imgId);
      await fetchGallery();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <ServicesHeader title={'Gallery'} />
      </div>

      <p className="text-sm text-gray-600 mb-2">
        You can upload a maximum of 5 images.
      </p>

      {/* Upload Input */}
      {images.length < 5 && (
        <div className="mb-4">
          <input
            id="hiddenFileInput"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => document.getElementById("hiddenFileInput").click()}
            disabled={loading}
            className="bg-[#5E50BF] cursor-pointer text-white font-medium px-4 py-2 rounded transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {/* Gallery Display */}
      <div className="flex flex-wrap gap-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="border border-gray-200 p-4 rounded shadow-sm"
          >
            <img
              src={`http://localhost:5777/static/images/${img.url}`}
              alt="Gallery"
              className="w-40 h-auto block mb-2"
            />
            <div className="mb-2">
              Status: <span className="font-semibold">{img.status}</span>
            </div>
            <button
              onClick={() => handleDelete(img._id)}
              className="flex items-center space-x-1 cursor-pointer text-red-500 hover:text-red-600"
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;