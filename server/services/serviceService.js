const Service = require("../models/serviceModel");

const createService = async (serviceData) => {
  return await Service.create(serviceData);
};

const getServices = async () => {
  return await Service.find().populate("serviceProvider gallery");
};

const getServiceById = async (serviceId) => {
  return await Service.findById(serviceId).populate("serviceProvider gallery");
};

const updateService = async (serviceId, updatedData) => {
  return await Service.findByIdAndUpdate(serviceId, updatedData, { new: true });
};

const deleteService = async (serviceId) => {
  return await Service.findByIdAndDelete(serviceId);
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
