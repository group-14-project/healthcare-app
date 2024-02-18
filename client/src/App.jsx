import React from "react";
import {DoctorDashboard, MidNavbar,SideBar } from "./components";
import PatientDashboard from "./components/Patient/PatientDashboard";


function App() {
	return (
		<>
			{/* <div className="container"> */}
				<SideBar />
				{/* <PatientDashboard/> */}
				<DoctorDashboard/>
				
			{/* </div> */}
		</>
	);
}

export default App;
