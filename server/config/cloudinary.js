const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME || 'df1hovsmm',
      api_key: process.env.API_KEY || '315853347694858',
      api_secret: process.env.API_SECRET || 'ghxVvKwxnxHFdBdpYWV_95jpvRg',
    });
  } catch (error) {
    console.error(error);
  }
};
