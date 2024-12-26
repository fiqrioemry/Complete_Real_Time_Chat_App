require("dotenv").config();
const cloudinary = require("../config/cloudinary.js");

async function uploadMediaToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: process.env.STORAGE,
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { format: "webp" },
      ],
    });

    return result;
  } catch (error) {
    throw new Error("Error uploading to Cloudinary: " + error.message);
  }
}

module.exports = uploadMediaToCloudinary;
