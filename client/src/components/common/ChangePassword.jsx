import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import { useNavigate } from "react-router-dom";
import { GetCookie } from "../../Store/loginSlice";
const notyf = new Notyf({
	position: {
		x: 'right',
		y: 'top',
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

function ChangePassword() {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const role = useSelector((state) => state.login.user.role);
	const changePwd = async () => {
		// console.log(typeof(password))
		const data = {
			"password": password
		}
		if(isValidPassword(password) === false){
			notyf.error("Password should contain a specaial character, a number and an uppercase letter and should be atleast 8 characters long");
			return;
		}
		try {
			if(password !== confirmPassword){
				notyf.error("Password and Confirm Password do not match");
				return;
			}
			const response = await axios.put(
				`https://localhost:9090/${role}/updatePassword`,
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
			notyf.success("Password Updated Successfully");
			navigate(`/${role}/dashboard`);
			
		} catch (error) {
			console.log(error);
			notyf.error("Error Updating Password");
		}
	};
	useEffect(() => {
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await changePwd();
	};
	const handleChange = (e) => {
		setPassword(e.target.value);
	};
	const handleConfirmChange = (e) => {
		setConfirmPassword(e.target.value);
	
	}

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
							onChange={handleConfirmChange}
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

export default ChangePassword;
