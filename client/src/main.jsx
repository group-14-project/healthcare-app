import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.jsx";
// import routes from './components/'
import {
	DoctorDashboard,
	Landing,
	Login,
	Nav,
	Feedback,
	Refer,
	Consult,
} from "./components/index.js";
import "./index.css";
import PatientDashboard from "./components/Patient/PatientDashboard.jsx";
import router from "./Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
