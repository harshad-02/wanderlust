import dotenv from "dotenv";
dotenv.config(); // ✅ LOAD HERE

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("☁️ Cloudinary configured with:", {
//   cloud: cloudinary.config().cloud_name,
//   key: cloudinary.config().api_key,
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "WanderLust",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export { cloudinary, storage };
