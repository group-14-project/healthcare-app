import React, { useEffect, useState } from "react";
import {
	Container,
	Typography,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { store } from "../../Store/store";
import {
	handleUpdatePatientDetails,
	patientActions,
} from "../../Store/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
});

const PatientDetails = (props) => {
	const navigate = useNavigate();
	const formData = useSelector((state) => state.patient);
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		
			const res = await dispatch(handleUpdatePatientDetails());
			if (res) {
				notyf.success("Details added successfully");
				navigate("/patient/dashboard");
			} else {
				notyf.error("Something went wrong");
			}
		 
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		store.dispatch(patientActions.updatePatientDetails({ name, value }));
	};

	return (
		<Container style={{ marginTop: "70px" }} maxWidth="md">
			<Typography variant="h4" align="center" gutterBottom>
				Add Details
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							label="First Name"
							name="firstName"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							value={formData.firstName}
							onChange={handleChange}
							required
							disabled
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							label="Last Name"
							name="lastName"
							value={formData.lastName}
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							disabled
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							disabled
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Phone Number"
							name="phoneNumber"
							type="Number"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Height"
							name="height"
							type="text"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Weight"
							name="weight"
							type="number"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel style={{ color: "rgb(38, 122, 107)" }}>
								Blood Group
							</InputLabel>
							<Select
								label="Blood Group"
								name="bloodGroup"
								defaultValue=""
								inputProps={{ style: { borderRadius: 16 } }}
								MenuProps={{ PaperProps: { style: { borderRadius: 16 } } }}
								onChange={handleChange}
								required
							>
								<MenuItem value="A+">A+</MenuItem>
								<MenuItem value="A-">A-</MenuItem>
								<MenuItem value="B+">B+</MenuItem>
								<MenuItem value="B-">B-</MenuItem>
								<MenuItem value="AB+">AB+</MenuItem>
								<MenuItem value="AB-">AB-</MenuItem>
								<MenuItem value="O+">O+</MenuItem>
								<MenuItem value="O-">O-</MenuItem>
								{/* Add more specialties as needed */}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel style={{ color: "rgb(38, 122, 107)" }}>
								Gender
							</InputLabel>
							<Select
								label="Gender"
								defaultValue=""
								name="gender"
								inputProps={{ style: { borderRadius: 16 } }}
								MenuProps={{ PaperProps: { style: { borderRadius: 16 } } }}
								onChange={handleChange}
								required
							>
								<MenuItem value="Male">Male</MenuItem>
								<MenuItem value="Female">Female</MenuItem>
								<MenuItem value="Other">Other</MenuItem>
								{/* Add more specialties as needed */}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="City"
							name="city"
							type="text"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Pincode"
							name="pinCode"
							type="text"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Address"
							name="address"
							type="text"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{
							marginTop: "8px !important",
							borderRadius: 16,
							backgroundColor: "rgb(38, 122, 107)",
							fontSize: "24px",
							margin: "auto",
						}}
					>
						Submit
					</Button>
				</Grid>
			</form>
		</Container>
	);
};

export default PatientDetails;
