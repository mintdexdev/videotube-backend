import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file on clodinary
    const res = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
        overwrite: true,
      })

    // file upload success
    console.log("file upload success");
    console.log(res.url);
    return res;

  } catch (error) {
    fs.unlinkSync(localFilePath) // on error remove the local saved temp file 
  }
  
}