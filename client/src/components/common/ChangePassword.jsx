import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

function ChangePassword() {
	const [password, setPassword] = useState("");
	const role = useSelector((state) => state.login.user.role);
	const changePwd = async () => {
		try {
			const response = await axios.post(
				`http://localhost:9090/${role}/updatePassword`,
				password,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		console.log("changepwdcomponent");
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await changePwd();
		navigate(`/${role}/dashboard`);
	};
	const handleChange = (e) => {
		setPassword(e.target.value);
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

export default ChangePassword;
