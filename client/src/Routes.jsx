import { Nav,Landing,Login,DoctorDashboard,Feedback,Refer,PatientDashboard,Consult} from "./components/index";


import {
     createBrowserRouter,
     RouterProvider,
     Outlet
   } from "react-router-dom";

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
     }

]);

export default router;