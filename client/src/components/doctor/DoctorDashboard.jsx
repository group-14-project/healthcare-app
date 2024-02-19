import React from "react";
import { Banner, Graph} from "../index";
import { Box } from "@mui/material";
import patient from "../../assets/patient.png";
import appointments from "../../assets/appointments.png";
import next_app from "../../assets/next_app.png";
import prescription from "../../assets/prescription.png";
import "./DoctorDashboard.css";
function DoctorDashboard() {
	return (
		<>
			<Box sx={{ display: "flex", marginLeft: "60px" }}>
				<Box className="main-box" sx={{ width: "66.6%" }}>
					<Banner />
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
							<Box className="btn-div">192</Box>
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
								Write Prescription
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
							<Box className="quick-btn-font">192</Box>
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
					<Box className="side-divs">Recent Appointments</Box>
					<Box className="side-divs">Quote</Box>
				</Box>
			</Box>
		</>
	);
}

export default DoctorDashboard;
