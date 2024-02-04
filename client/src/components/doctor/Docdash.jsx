import React from "react";
import "./Docdash.css";
import doctor from "../../assets/doctor.png";

function Docdash() {
	return (
		<div className="doc-dash">
			<div className="greeting">
				<div className="doctor-details">
					<div className="details good-morning">Good Morning</div>
					<div className="details doc-name">Dr.Name</div>
					<div className="details line">Have a nice day at work</div>
				</div>
				<div className="doctor-image">
					<img src={doctor} alt="doctor" />
				</div>
			</div>

			<div className="doc-quicks">
				<div className="doc-quicks-boxes"></div>

				<div className="doc-quicks-boxes">
					<div className="pres-btns write-icon">
						<i className="fa-solid fa-pencil"></i>
					</div>

					<div className="pres-btns pres">
						<span className="font">Write Prescription</span>
						<br />
						<span>for patients</span>
					</div>

					<div className="pres-btns template">
						<span>Template</span>
						<span className="arrow-btn">
							<i className="fa-solid fa-circle-arrow-right"></i>
						</span>
					</div>
				</div>

				<div className="doc-quicks-boxes"></div>
			</div>

			<div className="graph">Graph</div>
		</div>
	);
}

export default Docdash;
