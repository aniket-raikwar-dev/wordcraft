const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// configuration of cloudinary
cloudinary.config({
  cloud_name: "dqwjo7wvi",
  api_key: "746185932572397",
  api_secret: "ahE_SLtJDOLIRumwUGePWjFoXlg",
});

// instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "blog-api",
    transformation: [{ width: 700, height: 700, crop: "limit" }],
  },
});

module.exports = storage;
