const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getcategoriesWallpaper = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  try {
    const skip = (page - 1) * limit;
    const getcategories = await prisma.categories.findMany({
      include: {
        wallpaper: {
          skip: skip,
          take: Number(limit)
        },

      },
      skip:skip,
      take: Number(limit)
    });

    const structuredCategories = getcategories.map((catogery) => ({
      id: catogery.id,
      category_name: catogery.category_name,
      category_image: catogery.category_image,
      category_wallpapers: catogery.wallpaper.map((wallpaper) => ({
        id: wallpaper.id,
        wallpaper_title: wallpaper.wallpaper_title,
        wallpaper_image_url: wallpaper.wallpaper_image_url,
      })),
    }));

    console.log("structure categories", structuredCategories);
    res.status(201).send(structuredCategories);
  } catch (error) {
    console.log("got eror in catch", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const singleCategoryWithWallpapers = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  try {
    const { id } = req.params;
    const skip = (page - 1) * limit;
    const getcategories = await prisma.categories.findMany({
      include: {
        wallpaper: {
          skip: skip,
          take: Number(limit),
        },
      },
      where: { id: parseInt(id) },
    });

    return res
      .status(200)
      .json({ message: "category get successfully", getcategories });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

module.exports = { getcategoriesWallpaper, singleCategoryWithWallpapers };
