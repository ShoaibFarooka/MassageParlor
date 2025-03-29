const router = require("express").Router();
const controller = require("../controllers/galleryController");
const upload = require("../configs/multer.config");

router.post("/upload", upload.single("file"), controller.addToGallery);
router.patch("/:imageId",  controller.updateStatus);
router.delete("/:imageId",  controller.deleteFromGallery);
router.get("/:serviceProvider",  controller.getGalleryByServiceProvider);

module.exports = router;
