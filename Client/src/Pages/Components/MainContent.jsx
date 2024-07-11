import React, { useEffect, useState } from "react";

import axios from "axios";
import EditContent from "./EditContent";
import { toast } from "react-toastify";

function main() {
  const [categories, setcategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(null);

  const [showSideMenu, setShowSideMenu] = useState(false);


  useEffect(() => {
    setTimeout(()=>{
      showCategories();
    }, 1000)
    
  }, [selectedCategories]);

  const showCategories = async () => {
    axios.get("http://localhost:3000/api/categories").then((res) => {
      console.log("response here", res);
      if (res.status === 200) {
      
        console.log("here is your data", res);
        setcategories(res.data.userfind);
        console.log(categories);
      } else {
        console.log("soory something went wrong", res.data.message);
      }
    });
  };

  const handleSave = (categoryData) => {
    if (selectedCategories) {
      console.log(categoryData);
      axios
        .put(
          `http://localhost:3000/api/admin/categories/${selectedCategories.id}`,
          categoryData
        )
        .then((res) => {
          console.log("response here", res);
          if (res.status === 200) {
            setcategories((prev) =>
              prev.map((cat) =>
                cat.id === selectedCategories.id ? res.data : cat
              )
            );
            toast.success("Category Updated successfully")
            setShowSideMenu(false);
            setSelectedCategories(null);
            console.log("here is your data", res.data.userfind);
          }
        })
        .catch((erorr) => {
          console.log("got error while updating", erorr);
          toast.error("Category Failed while updating ")
        });
    } else {
      axios
        .post("http://localhost:3000/api/admin/categories", categoryData)
        .then((res) => {
          if (res.status === 200) {
            console.log(categories);
            setcategories((prev) => [...prev, res.data]);
            console.log(res.data);
            showCategories();
            setShowSideMenu(false);
            toast.success("Category added successfully ")
          }
        })
        .catch((error) => {
          console.log("Error while adding", error);
          toast.error("errro while adding ")
        });
    }
  };

  const handleUpdate = (Category) => {

    setSelectedCategories(Category);
    setShowSideMenu(!showSideMenu);
  };

  const handleAdd = () => {
    setSelectedCategories(null);
    setShowSideMenu(true);
  };

  const handleClose = () => {
    setShowSideMenu(false);
    setSelectedCategories(null);
  };

  const handledelete = (c) => {
    try {
      console.log("Attempting to delete category with ID:", c.id);
      axios
        .delete(`http://localhost:3000/api/admin/categories/${c.id}`)
        .then((res) => {
          console.log("Response from delete request:", res);
          if (res.status === 200) {
            setSelectedCategories(c);
            console.log("Category deleted successfully:", res.data);
            toast.success("deleted successfully ")
            seterr(res.data.message);
          } else {
            console.log("Something went wrong:", res.data.message);
            seterr(res.data.message);
            toast.error("deleted failed ")
          }
        })
        .catch((error) => {
          console.error("Error during delete request:", error);
        });
    } catch (error) {
      console.log("Error while attempting to delete category:", error);
    }
  };

  return (
    <>
      {showSideMenu && (
        <div>
          {" "}
          <EditContent
            onSave={handleSave}
            setSelectedCategories={setSelectedCategories}
            onClose={handleClose}
            name="Category Name"
            imageName="Category Image"
            setCategory={setcategories}
            categories={selectedCategories}
          />{" "}
        </div>
      )}

      <div className="pt-12 ml-64">
        <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div class="w-full mb-1">
            <div class="mb-4">
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                All Categories
              </h1>
            </div>
            <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div class="flex items-center mb-4 sm:mb-0">
                <form class="sm:pr-3" action="#" method="GET">
                  <label for="products-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="email"
                      id="products-search"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search for Categories"
                    />
                  </div>
                </form>

                <div class="flex items-center w-full sm:justify-end">
                  <div class="flex pl-2 space-x-1">
                    <a
                      href="#"
                      class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAdd}
                id="createProductButton"
                class="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                type="button"
                data-drawer-target="drawer-create-product-default"
                data-drawer-show="drawer-create-product-default"
                aria-controls="drawer-create-product-default"
                data-drawer-placement="right"
              >
                Add new {}
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden shadow">

                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                {categories.length === 0 ? <div  className="flex justify-center items-center bg-gray-800 divide-y divide-gray-200 w-full h-screen">
                    
                      
                    <div class="lds-ellipsis ">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                 
                 
                  </div> : ( <>
                  <thead class="bg-gray-100 dark:bg-gray-700 w-screen">
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Category Id
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Category Name
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Category Image URL
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody class="bg-gray-800   divide-y">
               
                 
                    {categories.map((c) => (
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="w-17 p-4">
                          <div className="flex items-center">
                            <img
                              src={c.category_image}
                              alt={c.category_name}
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                        </td>
                        <td class="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-gray-700">
                          <div class="text-base font-semibold text-gray-900 dark:text-white">
                            {c.id}
                          </div>
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {c.category_name}
                        </td>
                        <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                          {c.category_image}
                        </td>

                        <td class="p-4 space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleUpdate(c)}
                            type="button"
                            id="updateProductButton"
                            data-drawer-target="drawer-update-product-default"
                            data-drawer-show="drawer-update-product-default"
                            aria-controls="drawer-update-product-default"
                            data-drawer-placement="right"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            <svg
                              class="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            Update
                          </button>
                          <button
                            onClick={() => handledelete(c)}
                            type="button"
                            id="deleteProductButton"
                            data-drawer-target="drawer-delete-product-default"
                            data-drawer-show="drawer-delete-product-default"
                            aria-controls="drawer-delete-product-default"
                            data-drawer-placement="right"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                          >
                            <svg
                              class="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                  </tbody>
                  </>)  }
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default main;
