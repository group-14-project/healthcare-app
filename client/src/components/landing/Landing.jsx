import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
function Landing() {
	return (
		<BrowserRouter>
			<Navbar />
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
		</BrowserRouter>
	);
}

export default Landing;
