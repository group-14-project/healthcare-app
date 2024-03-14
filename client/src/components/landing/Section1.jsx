import React from "react";
import "./section1.css";
import doctorImage from "../../assets/doctor_main.png";
function Section1() {
	return (
		<div className="outer-div">
			<div className="left">
				<div className="main-text">
					<h2>Welcome to Arogyashala - Your Trusted Healthcare Companion</h2>
					<p className="subtitle">
						Experience the future of healthcare with Arogyashala, where quality
						medical care meets the convenience of online consultations.
					</p>
					<p>
						Say goodbye to long wait times and travel hassles – now, you can
						connect with experienced doctors from the comfort of your own home.
						With Arogyashala, access expert medical advice, diagnoses, and
						treatment plans anytime, anywhere.
					</p>
				</div>
			</div>
			<div className="right">
				<img src={doctorImage} alt="Doctor" className="dimage" />
			</div>
		</div>
	);
}

export default Section1;
