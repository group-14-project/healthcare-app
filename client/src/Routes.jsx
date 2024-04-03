import {
	Nav,
	Landing,
	Login,
	DoctorDashboard,
	Feedback,
	Refer,
	PatientDashboard,
	Consult,
	PatientConsultation,
	PatientDetails,
	OtpInputPage,
} from "./components/index";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Common = () => (
	<>
		<Nav />
		<Outlet />
	</>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		element: <Common />,
		children: [
			{
				path: "/doctor/dashboard",
				element: <DoctorDashboard />,
			},
			{
				path: "/doctor/feedback",
				element: <Feedback />,
			},
			{
				path: "/doctor/refer",
				element: <Refer />,
			},
		],
	},

	{
		element: <Common />,
		children: [
			{
				path: "patient/dashboard",
				element: <PatientDashboard />,
			},
			{
				path: "patient/consult",
				element: <Consult />,
			},
		],
	},
	{
		path: "/verify-otp",
		element: <OtpInputPage />,
	},
	{
		path: "patient/details",
		element: <PatientDetails />,
	},
	{
		element: <Common />,
		children: [
			{
				path: "patient/dashboard",
				element: <PatientDashboard />,
			},
			{
				path: "patient/consult",
				element: <Consult />,
			},
			{
				path: "patient/consultation",
				element: <PatientConsultation />,
			},
		],
	},
]);

export default router;
