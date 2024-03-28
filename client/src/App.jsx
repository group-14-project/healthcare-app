import React from "react";
import {
	DocPatients,
	DoctorDashboard,
	SideBar,
	MidNavbar,
	RightNavbar,
	Feedback,
	Refer,
	Login,
	Landing,
	PatientConsultation
} from "./components";
import PatientDashboard from "./components/Patient/PatientDashboard";
import Box from "@mui/material/Box";


function App() {
	return (
		<>
			<SideBar />
			<Box sx={{ display: "flex", marginLeft: "60px" }}>
				<Box sx={{ flex: 2 }}>
					<MidNavbar />
				</Box>
				<Box sx={{ flex: 1, backgroundColor: "white" }}>
					<RightNavbar />
				</Box>
			</Box>
			<PatientConsultation/>
			{/* <DoctorDashboard /> */}
			{/* <DocPatients /> */}
			{/* <Feedback /> */}
			{/* <Refer/> */}
			{/* <Login /> */}
			{/* <Landing /> */}
		</>
	);
}

export default App;
