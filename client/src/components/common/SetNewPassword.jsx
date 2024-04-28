import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { setNewPassword } from "../../Store/loginSlice"
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
});

function isValidPassword(password) {
	// Check length
	if (password.length < 8) {
		return false;
	}

	// Check for at least one number
	if (!/\d/.test(password)) {
		return false;
	}

	// Check for at least one special character
	if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
		return false;
	}

	// Check for at least one uppercase letter
	if (!/[A-Z]/.test(password)) {
		return false;
	}

	return true;
}

function SetNewPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location.state)
	const role = location.state.role;
	const email = location.state.email;
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [otp, setOtp] = useState("");
	const changePwd = async () => {
		if (isValidPassword(password) === false) {
			notyf.error(
				"Password must contain at least 8 characters, one number, one special character and one uppercase letter"
			);
			return;
		}
		if (password !== confirmPassword) {
			notyf.error("Passwords do not match");
			return;
		}
		const data = {
			email: email,
			role: role,
			password: password,
			otp: otp,
		};
		const res = await dispatch(setNewPassword(data));
		if (res) {
			notyf.success("Password Updated Successfully");
			navigate(`/${role}/dashboard`);
		} else {
			notyf.error("Error in updating password");
			navigate("/login");
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await changePwd();
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "otp") {
			setOtp(value);
		} else if (name == "password") {
			setPassword(value);
		} else {
			setConfirmPassword(value);
		}
	};
	return (
		<Container
			maxWidth="md"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh", // Adjust as needed
			}}
		>
			<Typography variant="h4" align="center" gutterBottom>
				Change Password
			</Typography>
			<form onSubmit={handleSubmit} style={{ width: "100%" }}>
				<Grid container spacing={2}>
					<Grid item xs={6} style={{ marginLeft: "25%" }}>
						<TextField
							variant="outlined"
							fullWidth
							label="Otp"
							name="otp"
							type="otp"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={6} style={{ marginLeft: "25%" }}>
						<TextField
							variant="outlined"
							fullWidth
							label="Password"
							name="password"
							type="password"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={6} style={{ marginLeft: "25%" }}>
						<TextField
							variant="outlined"
							fullWidth
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{
								borderRadius: 16,
								backgroundColor: "rgb(38, 122, 107)",
								fontSize: "24px",
								margin: "auto",
							}}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default SetNewPassword;
