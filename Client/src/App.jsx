import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Auth/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Wallpaper from "./Pages/Wallpaper.jsx";
import Sidebar from "./Pages/Components/Sidebar.jsx";
import MainContent from "./Pages/Components/MainContent.jsx";
import WallpaperContent from "./Pages/Components/WallpaperContent.jsx";
import Auth from "./Pages/Components/context.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Default from "./Pages/Default.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "categories",
          element: <Dashboard />,
        },
        {
          path: "/wallpapers",
          element: (
            <>
              <Sidebar />
              <WallpaperContent />
            </>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Default />,
    },
  ]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <RouterProvider router={router} />
    </>
  );
}
export default App;
