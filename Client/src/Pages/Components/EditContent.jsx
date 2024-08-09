import React, { useEffect, useState } from "react";

function EditContent({ name, imageName, categories, onSave, onClose }) {
  const [Loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({
    category_name: "",
    category_image: "",
  });
  const [preview, setpreviewimage] = useState("");
  console.log(categories);
  useEffect(() => {
    if (categories) {
      setCategoryData({
        category_name: categories.category_name || "",
        category_image: categories.category_image || "",
      });
    } else {
      setCategoryData({
        category_name: "",
        category_image: "",
      });
    }
  }, [categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setpreviewimage(previewURL);
      setCategoryData((prevState) => ({
        ...prevState,
        category_image: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", categoryData.category_name);
    formData.append("category_image", categoryData.category_image);
    setLoading(true);

    onSave(formData);
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
        {categories ? "Update Category" : "Add Category"}
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
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {name}
            </label>
            <input
              type="text"
              name="category_name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={categoryData?.category_name}
              onChange={handleInputChange}
              placeholder="Type product name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {imageName}
            </label>

            {categoryData?.category_image ? (
              <>
                {preview ? (
                  <img
                    src={preview}
                    width={250}
                    height={200}
                    className="p-5"
                    alt="Preview"
                  />
                ) : (
                  <img
                    src={categoryData?.category_image}
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
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
          {Loading ? (
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
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

export default EditContent;
