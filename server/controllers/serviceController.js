const serviceService = require("../services/serviceService");

const createService = async (req, res, next) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({ message: "Service created successfully!", service });
  } catch (error) {
    next(error);
  }
};

const getServices = async (req, res, next) => {
  try {
    const services = await serviceService.getServices();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found!" });
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const updatedService = await serviceService.updateService(req.params.id, req.body);
    if (!updatedService) return res.status(404).json({ message: "Service not found!" });
    res.status(200).json({ message: "Service updated successfully!", updatedService });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const deletedService = await serviceService.deleteService(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found!" });
    res.status(200).json({ message: "Service deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
