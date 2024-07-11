const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");
const uploadImageToCloudinary = require("../utilities/Cloudinary/Cloudinary");


async function getCategories() {
  const getcat = await prisma.categories.findMany();
  return getcat;
}
const wallpapers = async(req,res)=>{
  try {
    
    const {page=1, limit=50 } = req.query;
    const skip = (page-1)* limit;
    const wallpapers = await prisma.wallpaper.findMany({
      skip : skip,
      take: Number(limit)
    });
    
    if (wallpapers){
      return res.status(200).json({message: "get wallpapers successfuly", wallpapers})
    }
    
  } catch (error) {
    return res.status(500).json({message: "error while geting wallpapers", })
    
  }
}

async function getWallpaper(req, res) {
  try {
    const getwall =
      await prisma.$queryRaw`SELECT * FROM Wallpaper ORDER BY RAND() LIMIT 20`;

    return res
      .status(200)
      .json({ message: "Get wallpaper successfully", getwall });
  } catch (error) {
    return res.status(2500).json({ message: "internal server, error" });
  }
}

const addWallpapers = async (req, res) => {
  const getBaseName = (fileName) => {
    return path.basename(fileName, path.extname(fileName));
  };
  try {
    const categories = await getCategories();
    const data = req.body;
    const files = req.files;

    const category = categories.find(
      (cat) => cat.category_name === data.category_name
    );
    console.log(files);

    if (category) {
      console.log("catergory found", category);

      const imageUrls = await Promise.all(
        files.map(async (file) => {
          console.log("payt", file.path);
          try {
            const imageUrl = await uploadImageToCloudinary(file.path);
            console.log(imageUrl);
            return imageUrl;
          } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
          }
        })
      );

      const newWallpapers = await Promise.all(
        files.map(async (file, index) => {
          return await prisma.wallpaper.create({
            data: {
              wallpaper_title: getBaseName(file.originalname),
              wallpaper_image_url: imageUrls[index],
              categoryId: category.id,
            },
          });
        })
      );

      return res
        .status(200)
        .json({ message: "wallpaer craeted successfully", newWallpapers });
    }
    console.log("category not found");
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateWallpaper = async (req, res) => {
  try {
    const { id } = req.params;
    const wallId = Number(id);
    const data = req.file;
    const image = data.originalname;
    const imagePath = data.path;

    const imageURL = await uploadImageToCloudinary(imagePath);
    console.log("image url", imageURL);

    const updateWallpaper = await prisma.wallpaper.update({
      where: {
        id: wallId,
      },
      data: {
        wallpaper_image_url: imageURL,
      },
    });
    console.log("Updated image:", updateWallpaper);
    if (updateWallpaper) {
      return res.status(200).json({ message: "update successfully" });
    } else if (error) {
      console.log("getting issue while updating", error);
    }
  } catch (error) {
    console.log("getting error", error);
    return res.status(500).json({ message: "update failed" });
  }
};
const deleteWallpaper = async (req, res) => {
  try {
    const { id } = req.params;
    const wallId = Number(id);
    const allWallapers = await prisma.wallpaper.findMany();
    const wallpaper = allWallapers.find((w) => (w.id = wallId));

    if (wallpaper) {
      const deleteWallpaper = await prisma.wallpaper.delete({
        where: {
          id: wallId,
        },
      });

      if (deleteWallpaper) {
        console.log("wallaper deleted");
        return res.status(200).json({ message: "deleted successfully" });
      }
      return res
        .status(400)
        .json({ message: "somwthung wrong while deleting" });
    }
  } catch (error) {
    return res.status(500).json({ message: "error while deleting", error });
  }
};
const searchWallpaper = async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category);

    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }
    const Wallpapers = await prisma.categories.findMany({
      where: {
        category_name: category,
      },
      include: {
        wallpaper: true,
      },
    });
    console.log(Wallpapers);

    if (Wallpapers.length > 0) {
      return res.status(200).json({
        message: "Search results found",
        Wallpapers,
      });
    } else {
      return res.status(404).json({
        message: "Search results not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting results...",
      error,
    });
  }
};

module.exports = {
  wallpapers,
  searchWallpaper,
  addWallpapers,
  getWallpaper,
  updateWallpaper,
  deleteWallpaper,
};
