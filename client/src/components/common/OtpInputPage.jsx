import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import otpImage from "../../assets/otp.jpeg";

const OtpInputPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const inputRefs = useRef([]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
		localStorage.setItem("role", location.state.role);
	}, []);

	const handleChange = (index, e) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		if (value && index < 5 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleClick = (index) => {
		inputRefs.current[index].setSelectionRange(1, 1);

		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf("")].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			inputRefs.current[index - 1].focus();
		}
	};

	const fetchData = async () => {
		try {
			const response = await axios.post(
				`http://localhost:9090/${location.state.role}/${location.state.type}`,
				{ user: { email: location.state.email, otp: otp.join("") } },
				{
					headers: {
						Authorization: "Basic Auth",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json",
					},
				}
			);
			console.log(
				`User ${location.state.type === "signIn" ? "Signed Up" : "Logged In"}:`,
				response
			);
			const newState = {...(location.state ?? {}), [location.state.role]: response.data};
			navigate(
				location.state.role === "patient"
					? location.state.type === "signUp"
						? "/login"
						: !response.data.firstTimeLogin
						? "/patient/details"
						: "/patient/dashboard"
					: `/${location.state.role}/dashboard`,
				{
					state: {
						...newState
					},
				}
			);
		} catch (error) {
			console.error(`Error verifying:`, error);
		}
	};

	return (
		<div
			style={{
				textAlign: "center",
				boxSizing: "border-box",
				paddingTop: "110px",
			}}
		>
			<img
				src={otpImage}
				alt="otp"
				style={{ width: "200px", marginLeft: "80px", marginBottom: "2%" }}
			/>
			<h2>Enter 6 Digit OTP</h2>
			<div>
				{otp.map((value, index) => {
					return (
						<input
							key={index}
							type="text"
							ref={(input) => (inputRefs.current[index] = input)}
							value={value}
							onChange={(e) => handleChange(index, e)}
							onClick={() => handleClick(index)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							style={{
								width: "40px",
								height: "40px",
								margin: "5px",
								textAlign: "center",
								fontSize: "1.2em",
							}}
						/>
					);
				})}
			</div>
			<Button
				variant="contained"
				onClick={fetchData}
				style={{
					marginTop: "10px",
					backgroundColor: "#3F776B",
					color: "white",
				}}
			>
				Verify OTP
			</Button>
			<p style={{ marginTop: "20px" }}>
				<span onClick={() => navigate(location.state.signIn)}>
					Didn't Received OTP{" "}
					<span
						style={{
							textDecoration: "underline",
							color: "blue",
							cursor: "pointer",
						}}
					>
						Resend OTP
					</span>
				</span>
			</p>
		</div>
	);
};

export default OtpInputPage;
