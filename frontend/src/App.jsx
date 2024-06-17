import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/Store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Sidebar from "./pages/Sidebar";
import Files from "./pages/Files";
import Data from "./pages/Data";
import PrivateRoute from "./layouts/PrivateRoute";
import MainWrapper from "./layouts/MainWrapper";
import HomeLayout from "./pages/HomeLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainData from "./pages/MainData";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";

function App(){
const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },

      ],
    },
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <Data />,
        },
        {
          path: "/files",
          element: <Files />,
        }
      ],
    },
    {path: "/side",
    element:<Sidebar/>
    }
  ]);

  return (
    //----- Provide the Redux store to the entire app------------>
    <Provider store={store}>
      {/* Use the custom router for navigation */}
      <RouterProvider router={router} />
      {/* Toast notification container for displaying messages */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  );
}

export default App;