import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/booking";

const bookingService = {
  createBooking: async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookings: async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookingsByServiceId: async (serviceId) => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/service/${serviceId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookingsByServiceProvider: async (serviceProviderId) => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/serviceProvider/${serviceProviderId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookingById: async (providerId) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/${providerId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookingsByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateBooking: async (serviceId, payload) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/${serviceId}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteBooking: async (serviceId) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}/${serviceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default bookingService;
