import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import otpImage from "../../assets/otp.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
	handleOTPverification,
	handleLogin,
	handleSignUp,
} from "../../Store/loginSlice";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
});

const OtpInputPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const inputRefs = useRef([]);
	const role = useSelector((state) => state.login.user.role);
	const firstTimeLogin = useSelector((state) => state[role].firstTimeLogin);
	const dispatch = useDispatch();
	const isFirstRender = useRef(true);
	const statePatient = useSelector((state) => state.patient);
	const stateDoctor = useSelector((state) => state.doctor);
	const stateHospital = useSelector((state) => state.hospital);
	const [error, setError] = useState(false);
	const data = location.state.data;
	const isAuthenticated = useSelector(
		(state) => state.login.user.isAuthenticated
	);

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

	const handleResendOtp = async () => {
		if (location.state.type == "login") {
			const loginSuccess = await dispatch(handleLogin(data));
		} else {
			const signInSucess = await dispatch(handleSignUp(data));
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
		console.log(role);
		const res = await dispatch(
			handleOTPverification({
				otp: otp.join(""),
				type: location.state.type,
			})
		);
		setError(res);
		if (res) {
			if (role === "patient" && location.state.type === "signup") {
				navigate("/login");
			}
		} else {
			return;
		}
	};
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if (!error && firstTimeLogin === false) {
			if (role === "patient") {
				if (location.state.type === "signup") {
					notyf.success("Signup Successful");
					navigate("/login");
				} else if (location.state.type === "login") {
					navigate("/patient/details");
				}
			} else {
				navigate(`/${role}/changepwd`);
			}
		} else if (!error && firstTimeLogin === true) {
			navigate(`/${role}/dashboard`);
		}
	}, [location.state.type, navigate, statePatient, stateDoctor, stateHospital,firstTimeLogin]);

	return (
		<div
			style={{
				textAlign: "center",
				boxSizing: "border-box",
				paddingTop: "110px",
			}}
		>
			<div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
				<img
					src={otpImage}
					alt="otp"
					style={{ width: "200px", marginLeft: "80px", marginBottom: "2%" }}
				/>
			</div>
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
				<span>
					Didn't Received OTP{" "}
					<span
						onClick={handleResendOtp}
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
