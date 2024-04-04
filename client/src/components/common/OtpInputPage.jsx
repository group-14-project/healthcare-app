import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const OtpInputPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const inputRefs = useRef([]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
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
						[location.state.role]: response.data,
						role: location.state.role,
					},
				}
			);
		} catch (error) {
			console.error(`Error verifying:`, error);
		}
	};

	return (
		<div style={{ textAlign: "center", marginTop: "150px" }}>
			<h2>Enter OTP</h2>
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
				color="primary"
				onClick={fetchData}
				style={{ marginTop: "20px" }}
			>
				Verify OTP
			</Button>
			{/* <p style={{ marginTop: "20px" }}>
        <span onClick={() => navigate(location.state.signIn)}>Resend OTP</span>
      </p> */}
		</div>
	);
};

export default OtpInputPage;
