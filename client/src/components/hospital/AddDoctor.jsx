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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import { GetCookie } from "../../Store/loginSlice";
const notyf = new Notyf({
	position: {
		x: 'right',
		y: 'top',
	  },
});

const AddDoctor = (props) => {
	const navigate = useNavigate();
    const specializations = useSelector((state) => state.hospital.specialization);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [registrationId, setRegistrationId] = useState("");
	const [degree, setDegree] = useState("");
	const [phoneNumber, setPhoneNumber] = useState();
	const [specialization, setSpecialization] = useState("");
	const [doctorEmail, setDoctorEmail] = useState("");

	const addDoctor = async () => {
		const data = {
			firstName,
			lastName,
			registrationId,
			degree,
			phoneNumber,
			specialization,
			doctorEmail,
		};
        console.log(data)
		try {
			const response = await axios.post(
				"https://localhost:9090/hospital/addDoctor",
				data,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response);
			notyf.success("Doctor Added Successfully");
		} catch (error) {
			console.log(error);
			notyf.error(error.response.data.errorMessage);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await addDoctor();
        navigate("/hospital/dashboard");

	};
const handleChange = (e) => {
    const { name, value } = e.target;
    eval("set" + name.charAt(0).toUpperCase() + name.slice(1))(value);
};

	return (
		<Container style={{ marginTop: "70px" }} maxWidth="md">
			<Typography variant="h4" align="center" gutterBottom>
				Add Doctor
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel style={{ color: "rgb(38, 122, 107)" }}>
								Specialization Name
							</InputLabel>
							<Select
								label="Specialization Name"
								defaultValue=""
								name="specialization"
								inputProps={{ style: { borderRadius: 16 } }}
								MenuProps={{ PaperProps: { style: { borderRadius: 16 } } }}
								onChange={handleChange}
								required
							>
								{specializations.map((specialization, index) => (
									<MenuItem value={specialization} key={index}>
										{specialization}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Doctor First Name"
							name="firstName"
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
							label="Doctor Last Name"
							name="lastName"
							type="text"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							label="Email"
							name="doctorEmail"
							type="email"
							// value={formData.email}
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={6}>
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
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							label="Doctor Registration ID"
							name="registrationId"
							type="text"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							label="Doctor Degree"
							name="degree"
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

export default AddDoctor;
