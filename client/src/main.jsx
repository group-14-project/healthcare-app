import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import router from "./Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
