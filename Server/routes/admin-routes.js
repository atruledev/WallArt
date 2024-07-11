const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const categoriesController = require("../controllers/categories-controller");
const Wallpapers = require("../controllers/wallpaper-controller");
const LoginController = require("../controllers/Auth/login-controller");

//routes
router.post("/login", LoginController);
router.post( "/categories", upload.single("category_image"),categoriesController.addCategories
);
router.put( "/categories/:id", upload.single("category_image"),categoriesController.updateCategories
);
router.delete("/categories/:id", categoriesController.deleteCategories);
router.put("/wallpaper/:id", upload.single("category_image"), Wallpapers.updateWallpaper
);
router.delete("/wallpaper/:id", Wallpapers.deleteWallpaper);
router.post( "/wallpaper",upload.array("category_image"),Wallpapers.addWallpapers
);
router.get("/wallpapers", Wallpapers.wallpapers);

router.get("*", (req,res)=>{
  res.send("Error 404 ")
})
module.exports = router;
