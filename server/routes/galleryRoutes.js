const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userSchemas = require("../validationSchemas/userSchemas");
const validationMiddleware = require("../middleware/validationMiddleware");
const upload = require("../configs/multer.config");

router.post(
  "/:userType-register",
  upload.single("file"),
  validationMiddleware.validateParams(userSchemas.userTypeSchema),
  validationMiddleware.validateRequest(userSchemas.registerSchema),
  controller.Register
);



module.exports = router;
