import React, { useEffect } from "react";
import { Banner, Graph } from "../index";
import { Box } from "@mui/material";
import patient from "../../assets/patient.png";
import appointments from "../../assets/appointments.png";
import next_app from "../../assets/next_app.png";
import prescription from "../../assets/prescription.png";
import "./DoctorDashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function DoctorDashboard() {
	const location = useLocation();
	const d = location.state.doctor;
	var category = "health";
	console.log(d);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api.api-ninjas.com/v1/quotes?category=${category}`,
					{
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods":
								"GET,PUT,POST,DELETE,PATCH,OPTIONS",
							"Access-Control-Allow-Headers": "Content-Type",
							"X-Api-Key": `Y+pN8GpN+SFL+5UL96rzFw==OsFELYxpBagii5Aa`,
						},
					}
				);
				console.log("Quote Fetched:", response);
				const data = JSON.parse(response.config.data);
			} catch (error) {
				console.error("Error fetching quote", error);
			}
		};
		fetchData();
	}, []);
	return (
		<>
			<Box sx={{ display: "flex", marginLeft: "60px" }}>
				<Box className="main-box" sx={{ width: "66.6%" }}>
					<Banner doctor={d} />
					<Box className="quick-actions">
						<Box className="action-btn action-btn-1">
							<Box className="patient-icon">
								<img src={patient} alt="patient" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Total Patients
							</Box>
							<Box className="btn-div">{d.totalPatients}</Box>
						</Box>
						<Box className="action-btn action-btn-2">
							<Box className="patient-icon">
								<img src={prescription} alt="prescription" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Prescription
							</Box>
							<Box className="btn-div">
								Template &nbsp;
								<span className="template-icon">
									<i className="fa-solid fa-circle-arrow-right"></i>
								</span>
							</Box>
						</Box>

						<Box className="action-btn action-btn-3">
							<Box className="patient-icon">
								<img src={appointments} alt="appointments" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Appointments
							</Box>
							<Box className="quick-btn-font">{d.totalAppointments}</Box>
						</Box>
						<Box className="action-btn action-btn-4">
							<Box className="patient-icon">
								<img src={next_app} alt="next_app" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Clock
							</Box>
							<Box className="btn-div">Join Now</Box>
						</Box>
					</Box>

					<Box className="graph">
						<Graph />
					</Box>
				</Box>
				<Box className="side-box">
					<Box className="side-divs">Calender</Box>
					<Box className="side-divs">
						<h4>Recent Appointments</h4>
						<br />
						<ul className="appointment-list">
							{d.pastAppointments.map((appointment, index) => {
								return (
									<li className="recent-appointments" key={index}>
										<p>
											{appointment.patientFirstName}&nbsp;
											{appointment.patientLastName}
										</p>
										<p>{appointment.appointmentDateAndTime.split("T")[0]}</p>
									</li>
								);
							})}
						</ul>
					</Box>
					<Box className=" quote-box">
						<div
							className="card text-white height"
							style={{ backgroundColor: "#009AAA", borderRadius: "15px" }}
						>
							<div className="card-body ">
								<i className="fas fa-quote-left fa-2x mb-4"></i>

								<p className="lead">
									Genius is one percent inspiration and ninety-nine percent
									perspiration.
								</p>

								<hr />

								<div className="d-flex justify-content-between">
									<p className="mb-0">Thomas Edison</p>
									<h6 className="mb-0">
										<span
											className="badge rounded-pill"
											style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
										>
											876
										</span>{" "}
										<i className="fas fa-heart ms-2"></i>
									</h6>
								</div>
							</div>
						</div>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default DoctorDashboard;
