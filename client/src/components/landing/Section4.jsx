import React from "react";
import "./section4.css";

function Section4() {
	return (
		<div className="parent">
			<div className="child">
				<h1>Why choose Arogyashala Healthcare?</h1>
				<p className="dat">
					Arogyashala Healthcare offers holistic, patient-centered care with a
					focus on preventive medicine and traditional healing practices. Its
					reputation for quality service, cultural sensitivity, and community
					engagement make it a compelling choice for those seeking comprehensive
					and personalized healthcare solutions.
				</p>
				<div className="hos">
					<img
						src="https://static.vecteezy.com/system/resources/previews/003/608/820/original/medical-center-hospital-building-design-free-vector.jpg"
						alt="hospitals"
					/>
					<div className="numeric">
						<h2>20+ hospitals</h2>
						<p>Large healthcare network of hospitals</p>
					</div>
				</div>
				<div className="hos">
					<img
						src="https://www.iconbunny.com/icons/media/catalog/product/2/1/2131.12-doctor-icon-iconbunny.jpg"
						alt="doctors"
					/>
					<div className="numeric">
						<h2>200+ doctors</h2>
						<p>Highly Qualified and Specialist Doctors</p>
					</div>
				</div>
			</div>
			<div className="child">
				<img
					src="https://www.shutterstock.com/image-photo/medicine-healthcare-people-concept-female-600nw-2188588635.jpg"
					alt="Healthcare"
				/>
			</div>
		</div>
	);
}

export default Section4;
