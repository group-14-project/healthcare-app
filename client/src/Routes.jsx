<<<<<<< HEAD
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
} from "./components/index";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

=======
// import OtpInput from "./components/common/OtpInput";
import { Nav,Landing,Login,DoctorDashboard,Feedback,Refer,PatientDashboard,Consult, OtpInputPage} from "./components/index";


import {
     createBrowserRouter,
     RouterProvider,
     Outlet
   } from "react-router-dom";
 
>>>>>>> route
const PvtLayout = () => (
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
		path: "patient/details",
		element: <PatientDetails />,
	},

<<<<<<< HEAD
	{
		element: <PvtLayout />,
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
=======
     {
          path: "/",
          element: <Landing />,
     },
     {
          path: "login",
          element: <Login />
     },
     {
          element: <PvtLayout />,
          children: [
               {
                    path: "/doctor/dashboard",
                    element: <DoctorDashboard />
               },
               {
                    path: "/doctor/feedback",
                    element: <Feedback />
               },
               {
                    path: "/doctor/refer",
                    element: <Refer />
               },
          ]
     },

     {
          element: <PvtLayout />,
          children: [
               {
                    path: "patient/dashboard",
                    element: <PatientDashboard />
               },
               {
                    path: "patient/consult",
                    element: <Consult />
               }
          ]
     },
     {
          path: "/verify-otp",
          element: <OtpInputPage/>
     }
>>>>>>> route

	{
		element: <PvtLayout />,
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
