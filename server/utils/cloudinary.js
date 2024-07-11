const cloudinary = require("cloudinary").v2;

const uploadImageToCloudinary = async (file, folder, height, quality) => {
  let resource_type = "auto";
  if (file.mimetype.startsWith("image/")) {
    resource_type = "image";
  } else if (file.mimetype.startsWith("video/")) {
    resource_type = "video";
  }
  const options = { folder, resource_type };
  if (height) options.height = height;
  if (quality) options.quality = quality;
  //TODO: declare middleware for tempfile path
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
async function deleteMediaFromCloudinary(url) {
  try {
    // Extract the public ID from the URL
    const publicId = cloudinary.url(url, { type: "fetch" }).public_id;

    // Delete the media file using the public ID
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error;
  }
}

module.exports = { uploadImageToCloudinary, deleteMediaFromCloudinary };
