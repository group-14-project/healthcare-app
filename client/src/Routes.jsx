// import EndCall from "./components/Room/EndCall";
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
	Navbar,
	Faq,
	OPDTimings,
	DocPatients,
	Room,
	EndCall,
	AboutUs,
	ContactSection
} from "./components/index";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Common = (props) => {
	const sidebar = props.sidebar;
	const user = props.user;
	return (
		<>
			<Nav sidebar={{ sidebar }} user={{ user }} />
			<Outlet />
		</>
	);
};
const LandingNav = (props) => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

const router = createBrowserRouter([
	{
		element: <LandingNav />,
		children: [
			{
				path: "/",
				element: <Landing />,
			},
			{
				path: "/faq",
				element: <Faq />,
			},
			{
				path: "/about-us",
				element: <AboutUs />,
			},
			{
				path: "/opd-timings",
				element: <OPDTimings />,
			},
			{
				path: "/contact-s",
				element: <Landing />,
			},
		],
	},
	{
		path: "/login",
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
		path: "/room/:roomId",
		element: <Room/>
	},
	{
		path: "/endCall",
		element: <EndCall/>
	},
	{
		path: "/doctor/logout",
		element: <Landing />
	},
	{
		path: "/patient/logout",
		element: <Landing />

	},
	{
		element: (
			<Common
				sidebar={{
					content: [
						"Patients",
						"Calendar",
						"Departments",
						"Feedback",
						"Refer",
						"Logout",
					],
				}}
				user={{ type: "doctor" }}
			/>
		),
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
			{
				path: "/doctor/patients",
				element: <DocPatients />,
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
		element: (
			<Common
				sidebar={{
					content: [
						"Consult",
						"Reports",
						"Prescriptions",
						"Past Appointments",
						"Upcoming Appointments",
						"Logout",
					],
				}}
				user={{ type: "patient" }}
			/>
		),
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
