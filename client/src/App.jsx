import React from "react";
import { Docdash, Navbar,SideBar } from "./components";

function App() {
	return (
		<>
			<Navbar />
			<div className="container">
				<SideBar />
				<Docdash/>

			</div>
		</>
	);
}

export default App;
