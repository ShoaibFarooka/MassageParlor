const galleryModel = require("../models/galleryModel");

const addToGallery = async (userId, filePath) => {
  let gallery = await galleryModel.findOne({ serviceProvider: userId });

  if (!gallery) {
    gallery = new galleryModel({ serviceProvider: userId, images: [] });
  }

  if (gallery.images.length >= 5) {
    throw new Error("You can only upload up to 5 images.");
  }

  gallery.images.push({
    url: filePath, // ✅ this must match the filename
    status: "pending",
    uploadedAt: new Date(),
  });

  await gallery.save();
  return gallery;
};

const updateStatus = async (imageId, updatedData) => {
  return await galleryModel.findOneAndUpdate(
    { "images._id": imageId },
    { $set: { "images.$.status": updatedData.status } },
    { new: true }
  );
};

const deleteFromGallery = async (imageId) => {
  return await galleryModel.findOneAndUpdate(
    { "images._id": imageId },
    { $pull: { images: { _id: imageId } } },
    { new: true }
  );
};

const getGalleryByServiceProvider = async (serviceProviderId) => {
  return await galleryModel.findOne({ serviceProvider: serviceProviderId });
};

module.exports = {
  addToGallery,
  updateStatus,
  deleteFromGallery,
  getGalleryByServiceProvider,
};
