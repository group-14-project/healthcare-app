import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import router from "./Routes.jsx";
import { store } from './Store/store.js';
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router}/>
	</Provider>
);
