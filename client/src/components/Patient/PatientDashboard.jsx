import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/index";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import height from "../../assets/height.png";
import bloodType from "../../assets/blood-type.png";
import weight from "../../assets/weight.png";
import PatientTable from "./PatientTable";
import { store } from "../../Store/store";
import Loader from "../common/Loader";
const PatientDashboard = (props) => {
	const state = store.getState().patient;
	console.log("From patient dashboard",state);
	const heads = ["Date", "Doctor Name", "Symptom"];
	return (
		<Box
			sx={{ display: "flex", marginLeft: "65px", backgroundColor: "#F9F9F9" }}
		>
			<Box sx={{ flex: 2 }}>
				<Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-around",
							width: "80%",
							margin: "25px auto",
							padding: "40px",
							borderRadius: "10px",
							backgroundColor: "#fff",
							opacity: "0.9",
						}}
					>
						<VolunteerActivismIcon
							sx={{ fontSize: "5rem", color: "#3C9A8D" }}
						/>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Typography
								variant="h5"
								component="h2"
								sx={{ fontWeight: "900", color: "rgb(4 47 175)" }}
							>
								Greetings, {state.firstName} {state.lastName}!
							</Typography>
							<Typography
								variant="h6"
								component="h2"
								sx={{ marginTop: "10px", fontWeight: "900", color: "#888888" }}
							>
								How are you feeling today?
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							margin: "50px auto",
						}}
					>
						<Box
							sx={{
								backgroundColor: "#fff",
								padding: "20px 50px",
								borderRadius: "10px",
								textAlign: "center",
							}}
						>
							<Box>
								<img src={height} height="64px" width="64px" />
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="p" sx={{ marginTop: "10px" }}>
									Your Height
								</Typography>

								<Typography
									variant="p"
									sx={{
										backgroundColor: "#3c9a8d",
										padding: "5px 10px",
										marginTop: "10px",
										borderRadius: "5px",
									}}
								>
									{state.height} cm
								</Typography>
							</Box>
						</Box>

						<Box
							sx={{
								backgroundColor: "#fff",
								padding: "20px 50px",
								borderRadius: "10px",
								textAlign: "center",
							}}
						>
							<Box>
								<img src={weight} height="64px" width="64px" />
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="p" sx={{ marginTop: "10px" }}>
									Your Weight
								</Typography>

								<Typography
									variant="p"
									sx={{
										backgroundColor: "#3c9a8d",
										padding: "5px 10px",
										marginTop: "10px",
										borderRadius: "5px",
									}}
								>
									{state.weight} Kg
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								backgroundColor: "#fff",
								padding: "20px 50px",
								borderRadius: "10px",
								textAlign: "center",
							}}
						>
							<Box>
								<img src={bloodType} height="64px" width="64px" />
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="p" sx={{ marginTop: "10px" }}>
									Your Blood Group
								</Typography>

								<Typography
									variant="p"
									sx={{
										backgroundColor: "#3c9a8d",
										padding: "5px 10px",
										marginTop: "10px",
										borderRadius: "5px",
									}}
								>
									{state.bloodGroup}
								</Typography>
							</Box>
						</Box>
					</Box>

					<Box sx={{ padding: "40px" }}>
						<PatientTable pastApp={state.pastAppointments} heads={heads} />
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					flex: 1,
					backgroundColor: "white",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<StaticDateTimePicker orientation="landscape" />
					</LocalizationProvider>
				</Box>
			</Box>
		</Box>
	);
};

export default PatientDashboard;
