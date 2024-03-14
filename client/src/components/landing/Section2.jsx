import React from "react";
import "./section2.css";
import consultImage from "../../assets/consultation.png";
function Section2() {
	return (
		<div className="consultation">
			<div className="consultation-process"> Consultation Process</div>
			<div className="cimage" >
				<img src={consultImage}  />
			</div>
		</div>
	);
}

export default Section2;
