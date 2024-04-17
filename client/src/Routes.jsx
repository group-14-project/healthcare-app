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
	ContactSection,
	ChangePassword,
	Departments,
	Calender
} from "./components/index";
import { store } from "./Store/store.js";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Common = (props) => {
	const sidebar = props.sidebar;
	const user = props.user;
	const store = props.store;
	return (
		<>
			<Nav sidebar={{ sidebar }} user={{ user }} store={{ store }} />
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
		element: <LandingNav store={store} />,
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
		element: <Login store={store} />,
	},

	{
		path: "/verify-otp",
		element: <OtpInputPage store={store} />,
	},
	{
		path: "/doctor/changepwd",
		element: <ChangePassword />,
	},
	

	{
		path: "/admin/changepwd",
		element: <ChangePassword />,
	},
	{
		path: "patient/details",
		element: <PatientDetails store={store} />,
	},
	{
		path: "/room/:roomId",
		element: <Room />,
	},
	{
		path: "/endCall",
		element: <EndCall store={store} />,
	},
	{
		path: "/doctor/logout",
		element: <Landing store={store} />,
	},
	{
		path: "/patient/logout",
		element: <Landing store={store} />,
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
				store={store}
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
				path: "/doctor/calendar",
				element: <Calender />,
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
				path: "/doctor/departments",
				element: <Departments/>
		
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
				store={{ store }}
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
