import React, { useEffect } from "react";
import { Banner, Graph } from "../index";
import { Box } from "@mui/material";
import patient from "../../assets/patient.png";
import appointments from "../../assets/appointments.png";
import next_app from "../../assets/next_app.png";
import prescription from "../../assets/prescription.png";
import styles from "./DoctorDashboard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function DoctorDashboard() {
	const location = useLocation();
	const d = location.state.doctor;
	var category = "health";
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
			<Box
				className={styles.outer_div}
				sx={{ display: "flex", marginLeft: "60px" }}
			>
				<Box className={styles.main_box} sx={{ width: "66.6%" }}>
					<Banner doctor={d} />
					<Box className={styles.quick_actions}>
						<Box className={`${styles.action_btn} ${styles.action_btn_1}`}>
							<Box className={styles.patient_icon}>
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
							<Box className={styles.btn_div}>{d.totalPatients}</Box>
						</Box>
						<Box className={`${styles.action_btn} ${styles.action_btn_2}`}>
							<Box className={styles.patient_icon}>
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
							<Box className={styles.btn_div}>
								Template &nbsp;
								<span className={styles.template_icon}>
									<i className="fa-solid fa-circle-arrow-right"></i>
								</span>
							</Box>
						</Box>

						<Box className={`${styles.action_btn} ${styles.action_btn_3}`}>
							<Box className={styles.patient_icon}>
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
							<Box className={styles.quick_btn_font}>{d.totalAppointments}</Box>
						</Box>
						<Box className={`${styles.action_btn} ${styles.action_btn_4}`}>
							<Box className={styles.patient_icon}>
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
							<Box className={styles.btn_div}>Join Now</Box>
						</Box>
					</Box>

					<Box className={styles.graph}>
						<Graph data={d.eachDayCounts} />
					</Box>
				</Box>
				<Box className={styles.side_box}>
					<Box className={styles.side_divs}>Calender</Box>
					<Box
						className={`${styles.appointments_container} ${styles.side_divs}`}
					>
						<h2 className={styles.appointments_title}>Recent Appointments</h2>
						<ul className={styles.appointments_list}>
							{d.pastAppointments.map((appointment, index) => (
								<li key={index} className={styles.appointment_item}>
									<div className={styles.patient_name}>
										{appointment.patientFirstName}&nbsp;
										{appointment.patientLastName}
									</div>
									<div className={styles.appointment_date}>
										{appointment.appointmentDateAndTime.split("T")[0]}
									</div>
								</li>
							))}
						</ul>
					</Box>

					<Box className={styles.quote_box}>
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
