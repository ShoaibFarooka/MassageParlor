import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/gallery";

const galleryService = {
  // 1. Upload image to gallery
  uploadImage: async (formData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 2. Get gallery images by provider (user)
  getGalleryByServiceProvider: async (serviceProvider) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/${serviceProvider}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 3. Update status of a single image
  updateImageStatus: async (imageId, status) => {
    try {
      const response = await axiosInstance.patch(`${BASE_URL}/${imageId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 4. Delete a single image
  deleteImage: async (imageId) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}/${imageId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default galleryService;
