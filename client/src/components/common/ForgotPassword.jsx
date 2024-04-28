import React, { useEffect, useState } from "react";
import {
	Container,
	Typography,
	Grid,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../Store/loginSlice";
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
});

function ForgotPassword() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await dispatch(forgotPassword({ email, role }));
		if (res) {
			notyf.success("Password reset otp sent to your email");
			navigate("/password-reset", {
				state: { email: email, role: role },
			});
		} else {
			navigate("/login");
		}
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handleRoleChange = (e) => {
		setRole(e.target.value.toLowerCase());
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
				Forgot Password
			</Typography>
			<form onSubmit={handleSubmit} style={{ width: "100%" }}>
				<Grid container spacing={2}>
					<Grid item xs={6} style={{ marginLeft: "25%" }}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel style={{ color: "rgb(38, 122, 107)" }}>
								Select Role
							</InputLabel>
							<Select
								label="Role"
								name="role"
								defaultValue=""
								inputProps={{ style: { borderRadius: 16 } }}
								MenuProps={{ PaperProps: { style: { borderRadius: 16 } } }}
								onChange={handleRoleChange}
								required
							>
								<MenuItem value="Hospital">Hospital</MenuItem>
								<MenuItem value="Doctor">Doctor</MenuItem>
								<MenuItem value="Patient">Patient</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} style={{ marginLeft: "25%" }}>
						<TextField
							variant="outlined"
							fullWidth
							label="Email"
							name="email"
							type="email"
							InputProps={{ style: { borderRadius: 16 } }}
							InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
							onChange={handleEmailChange}
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

export default ForgotPassword;
