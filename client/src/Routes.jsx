import {
	Nav,
	Landing,
	Login,
	DoctorDashboard,
	Feedback,
	Refer,
	PatientDashboard,
	PatientConsultation,
	PatientDetails,
	OtpInputPage,
} from "./components/index";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Common = (props) => {
	console.log(props);
	const sidebar = props.sidebar;
	return (
		<>
			<Nav sidebar={{sidebar}}/>
			<Outlet />
		</>
	);
}


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
		path: "/verify-otp",
		element: <OtpInputPage />,
	},
	{
		path: "patient/details",
		element: <PatientDetails />,
	},
	{
		element: <Common sidebar={{ content: ["Patients", "Calendar", "Departments","Feedback", "Refer", "Logout"] }} />,
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
		element: <Common sidebar={{ content: ["Consult",  "Reports",  "Prescriptions", "Past Appointments",  "Upcoming Appointments",  "Logout"] }} />,
		children: [
			{
				path: "patient/dashboard",
				element: <PatientDashboard />,
			},
			{
				path: "patient/consult",
				element: <PatientConsultation />,
			},
		],
	},
]);

export default router;
