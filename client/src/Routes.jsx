import { SnackbarProvider } from "notistack";
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
	Consents,
	HospitalDashboard,
	AddDepartment,
	AddDoctor,
} from "./components/index";
import { store } from "./Store/store.js";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { WebSocketProvider } from "./components/common/WebSocketContext.jsx";



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
				path: "/doctor/logout",
				element: <Landing store={store} />,
			},
			{
				path: "/patient/logout",
				element: <Landing store={store} />,
			},
			{
				path: "/hospital/logout",
				element: <Landing store={store} />,
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
		element: <PrivateRoute> <ChangePassword /> </PrivateRoute>,
	},

	{
		path: "/hospital/changepwd",
		element: <PrivateRoute> <ChangePassword /> </PrivateRoute>,
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
		element: <WebSocketProvider><Room /></WebSocketProvider>,
	},
	{
		path: "/endCall",
		element: <WebSocketProvider><EndCall store={store} /></WebSocketProvider>,
	},

	{
		element: (
			<Common
				sidebar={{
					content: [
						"All Patients",
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
						<WebSocketProvider>
							<DoctorDashboard />
						</WebSocketProvider>
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/feedback",
				element: <PrivateRoute> <Feedback /> </PrivateRoute>,
			},
			{
				path: "/doctor/allpatients",
				element: <PrivateRoute> <DocPatients /> </PrivateRoute>,
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
				element: <PrivateRoute> <Refer /> </PrivateRoute>,
			},
			{
				path: "/doctor/departments",
				element: <PrivateRoute> <Departments /> </PrivateRoute>,
			},
			{
				path: "/doctor/viewConsents",
				element: <PrivateRoute> <ViewConsents /> </PrivateRoute>,
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
						"Manage Consents",
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
				element: <PrivateRoute> <PatientDashboard /> </PrivateRoute>,
			},
			{
				path: "patient/consult",
				element: <PrivateRoute> <WebSocketProvider> <SnackbarProvider> <PatientConsultation /> </SnackbarProvider> </WebSocketProvider>  </PrivateRoute>,
			},
			{
				path: "patient/reports",
				element: <PrivateRoute> <Reports /> </PrivateRoute>,
			},
			{
				path: "patient/prescriptions",
				element: <PrivateRoute> <PatientPrescription /> </PrivateRoute>,
			},
			{
				path: "patient/manageConsents",
				element: <PrivateRoute><Consents /></PrivateRoute>
			},
			{
				path: "patient/upcomingappointments",
				element: <PrivateRoute> <MyCalendar /> </PrivateRoute>,
			},
		],
	},
	{
		element: (
			<Common
				sidebar={{
					content: [
						"Add Department",
						"Add Doctor",
						"Logout",
					],
				}}
				user={{ type: "hospital" }}
				store={{ store }}
			/>
		),
		children: [
			{
				path: "hospital/dashboard",
				element: <PrivateRoute> <HospitalDashboard /> </PrivateRoute>,
			},
			{
				path: "hospital/adddepartment",
				element: <PrivateRoute> <AddDepartment /> </PrivateRoute>,
			},
			{
				path: "hospital/adddoctor",
				element: <PrivateRoute> <AddDoctor /> </PrivateRoute>,
			},
		],
	},
]);

export default router;
