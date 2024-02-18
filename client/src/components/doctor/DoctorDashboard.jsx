import React from "react";
import { Banner, Graph, MidNavbar, RightNavbar } from "../index";
import { Box, Button } from "@mui/material";
import patient from "../../assets/patient.png";
import { LineChart } from "@mui/x-charts";
import "./DoctorDashboard.css";
function DoctorDashboard() {
	return (
		<>
			<Box sx={{ display: "flex", marginLeft: "60px" }}>
				<Box sx={{ flex: 2 }}>
					<MidNavbar />
				</Box>
				<Box sx={{ flex: 1, backgroundColor: "white" }}>
					<RightNavbar />
				</Box>
			</Box>

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
							{/* <Box className="patient-icon">
								<img src={prescription} alt="patient" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
									fontSize: "0.9rem",
								}}
							>
								Write Prescription
							</Box>
							<Box  className="btn-div">Template</Box> */}
							<Box className=" x pencil-icon">
								<i className="fa-solid fa-pencil"></i>
							</Box>
							<Box sx={{ fontWeight: 700 }} className="x text">
								Prescription
							</Box>
							<Box className="x template">
								<span className="template-text">Template</span>
								<span className="template-icon">
									<i className="fa-solid fa-circle-arrow-right"></i>{" "}
								</span>
							</Box>
						</Box>
						<Box className="action-btn action-btn-3"></Box>
					</Box>

					<Box className="graph">
						<Graph />
					</Box>
				</Box>
				<Box className="side-box">
					<Box className="side-divs">Calender</Box>
					<Box className="side-divs">Recent Appointments</Box>
					<Box className="side-divs">Recent Patients</Box>
				</Box>
			</Box>
		</>
	);
}

export default DoctorDashboard;
