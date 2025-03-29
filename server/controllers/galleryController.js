const serviceService = require("../services/galleryService");

const addToGallery = async (req, res, next) => {
  try {
    const filePath = req.file ? req.file.filename : null;
    const userId = req.body.serviceProvider;

    if (!filePath || !userId) {
      return res.status(400).json({ message: "Missing image or user." });
    }

    const gallery = await serviceService.addToGallery(userId, filePath);

    res.status(201).json({ message: "Image added successfully!", gallery });
  } catch (error) {
    console.error("Gallery upload error:", error);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const updatedStatus = await serviceService.updateStatus(
      req.params.imageId,
      req.body
    );
    if (!updatedStatus)
      return res.status(404).json({ message: "Image not found!" });
    res
      .status(200)
      .json({ message: "Status updated successfully!", updatedStatus });
  } catch (error) {
    next(error);
  }
};

const deleteFromGallery = async (req, res, next) => {
  try {
    console.log( req.params.imageId,'bilal')
    const deletedService = await serviceService.deleteFromGallery(
      req.params.imageId
    );
    if (!deletedService)
      return res.status(404).json({ message: "Image not found!" });
    res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

const getGalleryByServiceProvider = async (req, res, next) => {
  try {
    const serviceProviderId = req.params.serviceProvider;
    const gallery = await serviceService.getGalleryByServiceProvider(serviceProviderId);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found!" });
    }
    res.status(200).json({ gallery });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToGallery,
  deleteFromGallery,
  updateStatus,
  getGalleryByServiceProvider
};
