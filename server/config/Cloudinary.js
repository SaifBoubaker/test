const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRETKEY,
});

const cloudinaryUploadImg = async (file) => {
  try {
    const data = await cloudinary.uploader.upload(file, {
      ressource_type: "auto",
    });
    return { url: data?.secure_url };
  } catch (error) {
    return error;
  }
};

module.exports = cloudinaryUploadImg;
