import React from "react";
import { Banner, MidNavbar, RightNavbar } from "../index";
import { Box, Button } from "@mui/material";
import patient from "../../assets/patient.png";
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
				<Box className="main-box" sx={{ flex: 2 }}>
					<Banner />
					<Box className="quick-actions">
						<Box className="action-btn action-btn-1">
							<Box className="patient-icon">
								<img src={patient} alt="patient" />
							</Box>
							<Box
								sx={{
									fontFamily: "sans-serif",
									fontWeight: 500,
									marginBottom: "6px",
								}}
							>
								Total Patients
							</Box>
							<Box className="btn-div">192</Box>
						</Box>
						<Box className="action-btn action-btn-2"></Box>
						<Box className="action-btn action-btn-3"></Box>
					</Box>
				</Box>
				<Box sx={{ display: "flex", flex: 1, border: "2px solid green" }}></Box>
			</Box>
		</>
	);
}

export default DoctorDashboard;
