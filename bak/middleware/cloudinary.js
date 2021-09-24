const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SCERET,
});

module.exports = cloudinary;
