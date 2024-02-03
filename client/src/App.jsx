import React from "react";
import { Navbar } from "./components";
import SideBar from "./components/common/SideBar";

function App() {
	return (
		<>
			<Navbar />
			<div className="container">
				<SideBar />
				
			</div>
		</>
	);
}

export default App;
