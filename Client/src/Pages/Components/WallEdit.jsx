import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../assets/images/Loader.gif";
function WallEdit({ imageName, categories, onSave, onClose }) {
  const [categoryData, setCategoryData] = useState({
    wallpaper_image_url: "",
  });
  const [preview, setpreviewimage] = useState("");
  const [getCat, setCat] = useState([]);
  const [catvalue, setCatValue] = useState("");
  const [file, setfile] = useState("");
  const[err, seterr]= useState(false)
  const [addImg, setAddImg] = useState({
    category_name: "none",
    allImages: [],
  });
  const [Loading, setLoading] = useState(false);

  const handleCategorySelected = (e) => {
    const categoryValue = e.target.value;
    setCatValue(categoryValue);

    setAddImg((prev) => ({
      ...prev,
      category_name: categoryValue,
    }));
  };

  console.log(catvalue);

  useEffect(() => {
    if (categories) {
      setCategoryData({
        wallpaper_image_url: categories.wallpaper_image_url || "",
      });
    } else {
      setCategoryData({
        wallpaper_image_url: "",
      });
    }
  }, [categories]);

  const getCategories = async () => {
    try {
      const getCategories = await axios
        .get("http://localhost:3000/api/categories")
        .then((res) => {
          console.log("datahere", res.data.userfind);
          setCat(res.data.userfind);
        });
      return getCategories;
    } catch (error) {
      console.log("error while getting categories", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const formData = new FormData();
  const handleImageChange = (e) => {
    const file = e.target.files;

    const fileArr = Array.from(file);
    console.log(fileArr);
    const previewURL = fileArr.map((f) => {
      return URL.createObjectURL(f);
    });
    console.log(previewURL);
    setpreviewimage(previewURL);

    setCategoryData((prevState) => ({
      ...prevState,
      wallpaper_image_url: previewURL,
    }));
    setfile(fileArr);

    setAddImg((prev) => ({ ...prev, allImages: fileArr }));
  };

  console.log(addImg);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(addImg.category_name === "none"){
      seterr(true)
      return null;
    }
    formData.append("category_name", addImg.category_name);
    addImg.allImages.forEach((item) => formData.append("category_image", item));
    console.log("asasa", ...formData.entries());
    onSave(formData);
    setLoading(true);
  };

  return (
    <div
      id="drawer-update-product-default"
      style={{ zIndex: "999" }}
      className="fixed top-0 right-0 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none"
      tabIndex="-1"
      aria-labelledby="drawer-label"
      aria-modal="true"
      role="dialog"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        {categories ? "Update Wallaper" : "Add Wallaper"}
      </h5>
      <button
        onClick={onClose}
        type="button"
        data-drawer-dismiss="drawer-update-product-default"
        aria-controls="drawer-update-product-default"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {imageName}
            </label>

            {categoryData?.wallpaper_image_url ? (
              <>
                {preview ? (
                  <>
                    {preview.map((p) => {
                      <img
                        src={p}
                        width={250}
                        height={200}
                        className="p-5"
                        alt="Preview"
                      />;
                    })}
                  </>
                ) : (
                  <img
                    src={categoryData?.wallpaper_image_url}
                    width={250}
                    height={200}
                    className="p-5"
                    alt="Category"
                  />
                )}
              </>
            ) : (
              <> {null}</>
            )}
            <input
              type="file"
              name="category_image"
              multiple
              onChange={handleImageChange}
              className=" text-sm font-normal text-gwhite whitespace-nowrap dark:text-gray-400"
            />
          </div>
          {!categories ? (
            <>
              <div>
                <label
                  htmlFor="mySelect"
                  className="p-2 text-sm font-normal text-white whitespace-nowrap "
                >
                  Choose Category:
                </label>

                <select
                  id="mySelect"
                  name="options"
                  onChange={(e) => handleCategorySelected(e)}
                  value={catvalue}
                >
                  {console.log("Dsd", getCat)}
                  {getCat.length === 0 ? (
                    <>No category Found</>
                  ) : <>
                   <option
                  
                    value= "none"
                    className="p-2 text-sm font-normal text-black whitespace-nowrap dark:text-gray-400"
                  >
                    none
                  </option>
                  ( {      
                    getCat.map((c) => (
                      <option
                        key={c.id}
                        value={c.category_name}
                        className="p-2 text-sm font-normal text-black whitespace-nowrap dark:text-gray-400"
                      >
                        {c.category_name}
                      </option>
                    ))
})
                  </>}
                </select>
              </div>
            </>
          ) : (
            <>
              <p>{null}</p>
            </>
          )}
        </div>
        {err? <p className="text-red-600 p-2"> Category Required</p> : <>{null}</>}
        <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
          {Loading ? (
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          ) : (
            <button
              type="submit"
              className="w-full justify-center text-white bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {categories ? "Update" : "Add"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default WallEdit;
