const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Function to upload image to Cloudinary
async function uploadImageToCloudinary( imagePath ) {
  console.log(imagePath)
  try {
    // // get image name without ext
    // const getBaseName = (fileName) => {
    //   return path.basename(fileName, path.extname(fileName));
    // };

    // const getwall = await prisma.wallpaper.findMany();
    // const imageName = getBaseName(image);

    // const imageExists = getwall.find(
    //   (image) => image.wallpaper_title === imageName
    // );

    // if (imageExists) {
    //   console.log("image already exits", imageExists);
    //   return null;
    
    // }
  
   

    //uplaod image
   try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imagePath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.url);
        }
      });
  
    });
    
   } catch (error) {
    console.log("error uplaoding image", error)
    
   }
   
  } catch (error) {
    console.log("error in catch", error);
    
  }
}

module.exports = uploadImageToCloudinary;
