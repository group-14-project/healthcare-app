import React, { useEffect, useState } from "react";
import styles from "./PatientDetails.module.css";
import axios from "axios";
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

const PatientDetails = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		patient: {
			firstName: "Deep",
			lastName: "",
			email: "",
			phoneNumber: "",
			height: "",
			weight: "",
			bloodGroup: "",
			gender: "",
			city: "",
			pinCode: "",
			address: "",
		},
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				"http://localhost:9090/patient/updateDetail",
				formData.patient,
				{
					Authorization: {
						Type: "Basic Auth",
						Username: "user",
						Password: "password",
					},
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json",
					},
				}
			);
			console.log("details added", response.data);
			navigate("/patient/dashboard");
		} catch (error) {
			console.error("Error adding details", error);
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			patient: {
				...prevState.patient,
				[name]: value,
			},
		}));
	};
	// useEffect(async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			"",
	// 			formData,
	// 			{
	// 				Authorization: {
	// 					Type: "Basic Auth",
	// 					Username: "user",
	// 					Password: "password",
	// 				},
	// 				headers: {
	// 					"Access-Control-Allow-Origin": "*",
	// 					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		console.log("User signed up:", response.data);
	// 		// Optionally, handle successful signup (e.g., redirect to login page)
	// 	} catch (error) {
	// 		console.error("Error signing up:", error);
	// 		// Optionally, handle signup error (e.g., display error message to user)
	// 	}
	// }, []);

	return (
		<Container className={styles.main_div} maxWidth="md">
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
							value={formData.patient.firstName}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							label="Last Name"
							name="lastName"
							value={formData.patient.lastName}
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
							label="Email"
							name="email"
							type="email"
							value={formData.patient.email}
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
							label="Phone Number"
							name="phoneNumber"
							type="Number"
							value={formData.patient.phoneNumber}
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
							value={formData.patient.height}
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
							type="weight"
							value={formData.patient.weight}
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
								value={formData.patient.bloodType}
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
								value={formData.patient.gender}
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
							value={formData.patient.city}
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
							value={formData.patient.pinCode}
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
							value={formData.patient.address}
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
			{/* </Box> */}
		</Container>
	);
};

export default PatientDetails;
