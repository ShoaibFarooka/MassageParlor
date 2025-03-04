const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    images: [
      {
        type: String, 
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("gallery", GallerySchema);
