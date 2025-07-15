import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/service";

const serviceService = {
    createService: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllServices: async (data) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/${data}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getServiceById: async (serviceId) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/${serviceId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getServicesByProvider: async (providerId) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/provider/${providerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getGalleryByProvider: async (providerId) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/gallery/${providerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateService: async (serviceId, payload) => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/${serviceId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteService: async (serviceId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/${serviceId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default serviceService;
