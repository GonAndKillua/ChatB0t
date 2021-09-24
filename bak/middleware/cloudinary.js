const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: "demochatapi",
  api_key: "668959852476491",
  api_secret: "LRAsNt9aSGQh14UkmN19RIVvA-8",
});

module.exports = cloudinary;
