const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const categoriesController = require("../controllers/categories-controller");
const categoryWallpaperController = require("../controllers/categories-wallpapers");
const Wallpapers = require("../controllers/wallpaper-controller");



//routes
router.get("/categories", categoriesController.getcategories);
router.post("/add", upload.single("category_image"), categoriesController.uploadCategories);
router.get("/home", categoryWallpaperController.getcategoriesWallpaper);
router.get("/wallpapers", Wallpapers.getWallpaper);
router.get("/categories/:id", categoryWallpaperController.singleCategoryWithWallpapers);
router.post("/wallpapers", Wallpapers.searchWallpaper);





module.exports = router;
