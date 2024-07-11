const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const uploadImageToCloudinary = require("../utilities/Cloudinary/Cloudinary");

//  fetch id
// id -> filter
// filter const retrurn



// get categories
const getcategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, pagination } = req.query;

    if (pagination === "on") {
      let skip = (page - 1) * limit;
      const categories = await prisma.categories.findMany({
        skip: skip,
        take: Number(limit),
      });

      const totalItem = await prisma.categories.findMany();
      const pageCount = Math.ceil(totalItem.length / limit);
      return res.status(200).json({
        message: "get Categories successfully",
        data: {
          page_size: Number(limit), // how many data to show
          page_index: Number(page), // current page
          page_count: pageCount, // number of pages
          data_count: totalItem.length, // total number of items
        },
        categories,
        
      });
     
    }

    const userfind = await prisma.categories.findMany();

   

    return res.status(200).json({
      message: "get Categories successfully", userfind
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error 500" });
  }
};
//updateCategories
const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    console.log("file here", file);
    console.log("file here", id, req.body);
    const { category_name } = req.body;

    let imageURL;

    if (file) {
      const imagePath = req.file.path;
      console.log("saas", imagePath);
      imageURL = await uploadImageToCloudinary(imagePath);
    }

    console.log("Category Name:", category_name);

    const updateData = {
      category_name,
    };

    if (imageURL) {
      updateData.category_image = imageURL;
    }

    const userfind = await prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: updateData,
    });

    return res
      .status(200)
      .json({ message: "category updated successfully", userfind });
  } catch (error) {
    console.error("Error updating category:", error);
    return res
      .status(500)
      .json({ message: "getting error in updating category", error });
  }
};

//upload category
const uploadCategories = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const getCategories = await prisma.categories.findMany();

    const categoryExist = getCategories.find(
      (c) => c.category_name === req.body.name
    );

    if (categoryExist) {
      console.log("image already exist");
      return null;
    }

    const imageUrl = await uploadImageToCloudinary(imagePath);
    console.log("image url", imageUrl);

    const userfind = await prisma.categories.create({
      data: {
        category_name: req.body.name,
        category_image: imageUrl || null,
      },
    });

    if (userfind) {
      return res.status(200).json({ message: "update successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};

//delete category
const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const catId = Number(id);
    console.log(catId);
    const getCat = await prisma.categories.findUnique({
      where: {
        id: catId,
      },
    });

    if (getCat) {
      // Delete all related wallpapers first
      await prisma.wallpaper.deleteMany({
        where: {
          categoryId: catId,
        },
      });

      const delCat = await prisma.categories.delete({
        where: {
          id: getCat.id,
        },
      });

      console.log("deleted successfully", delCat);
      return res
        .status(200)
        .json({ message: "Deleted successfully", deletedCategory: delCat });
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "deleted failed" });
  }
};

// add category
const addCategories = async (req, res) => {
  try {
    console.log(req.body);
    const title = req.body.category_name;
    const image = req.file;
    console.log(image);
    let imageURL;
    if (image) {
      imageURL = await uploadImageToCloudinary(image.path);
      console.log(imageURL);
    }

    const createCategory = await prisma.categories.create({
      data: {
        category_name: title,
        category_image: imageURL,
      },
    });
    if (createCategory) {
      console.log("category craeted successfuly", createCategory);
      return res.status(200).json({
        message: "category craeted successfuly",
        createCategory: createCategory,
      });
    }
  } catch (error) {
    console.log("error while getting data", error);
  }
};

module.exports = {

  getcategories,
  uploadCategories,
  updateCategories,
  deleteCategories,
  addCategories,
};
