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
	ViewConsents,
	Reports,
	PatientPrescription,
	MyCalendar,
	PrivateRoute,
} from "./components/index";
import { store } from "./Store/store.js";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Common = (props) => {
	const sidebar = props.sidebar;
	const user = props.user;
	const store = props.store;
	return (
		<PrivateRoute>
			<Nav sidebar={{ sidebar }} user={{ user }} store={{ store }} />
			<Outlet />
		</PrivateRoute>
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
			{
				path: "/login",
				element: <Login store={store} />,
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
				path: "/admin/logout",
				element: <Landing store={store} />,
			},
		],
	},

	{
		path: "/verify-otp",
		element: <OtpInputPage store={store} />,
	},
	{
		path: "/doctor/changepwd",
		element: <PrivateRoute> <ChangePassword /> </PrivateRoute>,
	},

	{
		path: "/admin/changepwd",
		element:<PrivateRoute> <ChangePassword /> </PrivateRoute>,
	},
	{
		path: "patient/details",
		element: (
			<PrivateRoute>
				<PatientDetails store={store} />
			</PrivateRoute>
		),
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
		element: (
			<Common
				sidebar={{
					content: [
						"Patients",
						"Calendar",
						"Departments",
						"Feedback",
						"Refer",
						"View Consents",
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
				element: (
					<PrivateRoute>
						<DoctorDashboard />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/feedback",
				element:<PrivateRoute> <Feedback /> </PrivateRoute>,
			},
			{
				path: "/doctor/patients",
				element:<PrivateRoute> <DocPatients /> </PrivateRoute>,
			},
			{
				path: "/doctor/calendar",
				element: <PrivateRoute> <MyCalendar /> </PrivateRoute>,
			},
			{
				path: "/doctor/feedback",
				element: <PrivateRoute> <Feedback /> </PrivateRoute>,
			},
			{
				path: "/doctor/refer",
				element:<PrivateRoute> <Refer /> </PrivateRoute>,
			},
			{
				path: "/doctor/departments",
				element:<PrivateRoute> <Departments /> </PrivateRoute>,
			},
			{
				path: "/doctor/viewConsents",
				element:<PrivateRoute> <ViewConsents /> </PrivateRoute>,
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
						"UpcomingAppointments",
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
				element:<PrivateRoute> <PatientDashboard /> </PrivateRoute>,
			},
			{
				path: "patient/consult",
				element: <PrivateRoute> <PatientConsultation /> </PrivateRoute>,
			},
			{
				path: "patient/reports",
				element:<PrivateRoute> <Reports /> </PrivateRoute>,
			},
			{
				path: "patient/prescriptions",
				element:<PrivateRoute> <PatientPrescription /> </PrivateRoute>,
			},
			{
				path: "patient/upcomingappointments",
				element:<PrivateRoute> <MyCalendar /> </PrivateRoute>,
			},
		],
	},
]);

export default router;
