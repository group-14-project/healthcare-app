import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import otpImage from "../../assets/otp.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { handleOTPverification } from "../../Store/loginSlice";
import { store } from "../../Store/store";


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

	const fetchData = () => {
		console.log(role)
		dispatch(
			handleOTPverification({
				otp: otp.join(""),
				type: location.state.type,
			})
		);
		// console.log("fetchData",state[role])
		if(role === "patient" && location.state.type === "signup"){
			navigate("/login")
		}
	};
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false; // it's no longer the first render
			return;
		}
		if (role === "patient") {
		  if (location.state.type === "signup") {
			navigate("/login");
		  } else if (location.state.type === "login") {
			if (firstTimeLogin === false) {
			  navigate("/patient/details");
			} else {
			  navigate("/patient/dashboard");
			}
		  }
		} else {
		  navigate(`/${role}/dashboard`);
		}
	  }, [location.state.type, navigate,statePatient,stateDoctor]);

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
