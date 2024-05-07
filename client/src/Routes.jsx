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
	ForgotPassword,
	SetNewPassword,
	ContactUs,
	OnGoingCalls,
	SeniorDoctorCall,
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
		path: "/",
		element: <Landing />,
	},
	{
		element: <LandingNav store={store} />,
		children: [
			{
				path: "/faq",
				element: <Faq />,
			},
			{
				path: "/about-us",
				element: <Landing />,
			},
			{
				path: "/opd-timings",
				element: <OPDTimings />,
			},
			{
				path: "/contact-us",
				element: <ContactUs />,
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
		element: (
			<PrivateRoute>
				<ChangePassword />
			</PrivateRoute>
		),
	},

	{
		path: "/hospital/changepwd",
		element: (
			<PrivateRoute>
				<ChangePassword />
			</PrivateRoute>
		),
	},
	{
		path: "patient/details",
		element: (
			<PrivateRoute>
				<PatientDetails />
			</PrivateRoute>
		),
	},
	{
		path: "/forgot-password",
		element: <ForgotPassword />,
	},
	{
		path: "/password-reset",
		element: <SetNewPassword />,
	},
	{
		path: "/room/:roomId",
		element: (
			<PrivateRoute>
				<WebSocketProvider>
					<Room />
				</WebSocketProvider>,
			</PrivateRoute>
		)
	},
	{
		path: "/endCall",
		element: (
			<PrivateRoute>
				<WebSocketProvider>
					<EndCall store={store} />
				</WebSocketProvider>
			</PrivateRoute>
		)
	},
	{
		path: "/call",
		element: <WebSocketProvider><SeniorDoctorCall /></WebSocketProvider>,
	},

	{
		element: (
			<Common
				sidebar={{
					content: [
						"All Patients",
						"Calendar",
						"Feedback",
						"Refer",
						"View Consents",
						"ongoingCalls",
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
				element: (
					<PrivateRoute>
						<Feedback />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/allpatients",
				element: (
					<PrivateRoute>
						<DocPatients />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/calendar",
				element: (
					<PrivateRoute>
						<MyCalendar />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/feedback",
				element: (
					<PrivateRoute>
						<Feedback />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/refer",
				element: (
					<PrivateRoute>
						<Refer />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/departments",
				element: (
					<PrivateRoute>
						<Departments />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/viewConsents",
				element: (
					<PrivateRoute>
						<ViewConsents />
					</PrivateRoute>
				),
			},
			{
				path: "/doctor/ongoingcalls",
				element: (
					<PrivateRoute>
						<WebSocketProvider>
							<OnGoingCalls />
						</WebSocketProvider>
					</PrivateRoute>
				),
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
						"Upcoming Appointments",
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
				element: (
					<PrivateRoute>
						<PatientDashboard />
					</PrivateRoute>
				),
			},
			{
				path: "patient/consult",
				element: <PrivateRoute> <WebSocketProvider> <SnackbarProvider> <PatientConsultation /> </SnackbarProvider> </WebSocketProvider>  </PrivateRoute>,
			},
			{
				path: "patient/reports",
				element: (
					<PrivateRoute>
						<Reports />
					</PrivateRoute>
				),
			},
			{
				path: "patient/prescriptions",
				element: (
					<PrivateRoute>
						<PatientPrescription />
					</PrivateRoute>
				),
			},
			{
				path: "patient/manageConsents",
				element: (
					<PrivateRoute>
						<Consents />
					</PrivateRoute>
				),
			},
			{
				path: "patient/upcomingappointments",
				element: (
					<PrivateRoute>
						<MyCalendar />
					</PrivateRoute>
				),
			},
		],
	},
	{
		element: (
			<Common
				sidebar={{
					content: ["Add Department", "Add Doctor", "Logout"],
				}}
				user={{ type: "hospital" }}
				store={{ store }}
			/>
		),
		children: [
			{
				path: "hospital/dashboard",
				element: (
					<PrivateRoute>
						<HospitalDashboard />
					</PrivateRoute>
				),
			},
			{
				path: "hospital/adddepartment",
				element: (
					<PrivateRoute>
						<AddDepartment />
					</PrivateRoute>
				),
			},
			{
				path: "hospital/adddoctor",
				element: (
					<PrivateRoute>
						<AddDoctor />
					</PrivateRoute>
				),
			},
		],
	},
]);

export default router;
