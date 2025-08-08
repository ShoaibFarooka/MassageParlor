const galleryModel = require("../models/galleryModel");
const Service = require("../models/serviceModel");

const createService = async (serviceData) => {
  return await Service.create(serviceData);
};

const getServices = async () => {
  return await Service.find().populate("serviceProvider");
};

const getServiceById = async (serviceId) => {
  return await Service.findById(serviceId).populate("serviceProvider");
};

const getServicesByProviderId = async (providerId) => {
  return await Service.find({ serviceProvider: providerId }).populate("serviceProvider");
};

const getGallery = async (providerId) => {
  console.log("Get Gallery Called....");
  return await galleryModel.find({ serviceProvider: providerId });
};

const updateService = async (serviceId, updatedData) => {
  return await Service.findByIdAndUpdate(serviceId, updatedData, { new: true });
};

const deleteService = async (serviceId) => {
  return await Service.findByIdAndDelete(serviceId);
};

module.exports = {
  getServicesByProviderId,
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getGallery,
};
