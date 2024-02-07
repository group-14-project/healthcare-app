import React from "react";
import { Docdash, MidNavbar,SideBar } from "./components";
import PatientDashboard from "./components/Patient/PatientDashboard";


function App() {
	return (
		<>
			{/* <div className="container"> */}
				<SideBar />
				<PatientDashboard/>
				
			{/* </div> */}
		</>
	);
}

export default App;
