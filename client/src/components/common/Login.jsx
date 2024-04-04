import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const [containerClass, setContainerClass] = useState("sign-in");
	const [role, setRole] = useState("patient");
	const [formData, setFormData] = useState({
		patient: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		},
	});
	const [loginData, setLoginData] = useState({
		user: {
			email: "",
			password: "",
		},
	});

	const handleSignInChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevState) => ({
			...prevState,
			user: {
				...prevState.user,
				[name]: value,
			},
		}));
	};

	const handleRoleChange = (e) =>{
		setRole(e.target.innerText.toLowerCase());
		document.getElementById(e.target.id).style.backgroundColor = "#4FA786";
		if(e.target.id === "admin"){
			document.getElementById("doctor").style.backgroundColor = "#efefef";
			document.getElementById("patient").style.backgroundColor = "#efefef";
		}
		if(e.target.id === "doctor"){
			document.getElementById("admin").style.backgroundColor = "#efefef";
			document.getElementById("patient").style.backgroundColor = "#efefef";
		}
		if(e.target.id === "patient"){
			document.getElementById("admin").style.backgroundColor = "#efefef";
			document.getElementById("doctor").style.backgroundColor = "#efefef";
		}
	}
	
	useEffect(() => {
		document.getElementById("patient").style.backgroundColor = "#4FA786";
	}, []);

	const handleSignUpChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			patient: {
				...prevState.patient,
				[name]: value,
			},
		}));
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`http://localhost:9090/patient/signupotp`,
				formData,
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
			console.log("User signed up:", response);
			const data = JSON.parse(response.config.data);
			navigate("/verify-otp", {
				state: { email: formData.patient.email, type: "signUp" },
			});
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	const handleSignIn = async (e) => {
		e.preventDefault();
		console.log("Role:", role)
		try {
			const response = await axios.post(
				`http://localhost:9090/${role}/loginotp`,
				loginData,
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
			console.log("User Verification:");
			const data = JSON.parse(response.config.data);
			navigate("/verify-otp", {
				state: { email: loginData.user.email, type: "login",role : role },
			});
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	const toggle = () => {
		setContainerClass(containerClass === "sign-in" ? "sign-up" : "sign-in");
	};

	useEffect(() => {
		// Set 'sign-in' class after 200 milliseconds
		const timeoutId = setTimeout(() => {
			setContainerClass("sign-in");
		}, 200);

		// Clean up the timeout
		return () => clearTimeout(timeoutId);
	}, []); // Run this effect only once after the component mounts

	return (
		<div id="container" className={`container ${containerClass}`}>
			{/* <!-- FORM SECTION --> */}
			<div className="row">
				{/* <!-- SIGN UP --> */}
				<div className="col align-items-center flex-col sign-up">
					<div className="form-wrapper align-items-center">
						<div className="form sign-up">
							<div className="input-group">
								<i className="bx bxs-user"></i>
								<input
									name="firstName"
									type="text"
									value={formData.firstname}
									onChange={handleSignUpChange}
									placeholder="First Name"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-user"></i>
								<input
									name="lastName"
									type="text"
									value={formData.lastname}
									onChange={handleSignUpChange}
									placeholder="Last Name"
								/>
							</div>
							<div className="input-group">
								<i className="bx bx-mail-send"></i>
								<input
									name="email"
									type="email"
									value={formData.email}
									onChange={handleSignUpChange}
									placeholder="Email"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input
									name="password"
									type="password"
									value={formData.password}
									onChange={handleSignUpChange}
									placeholder="Password"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input type="password" placeholder="Confirm password" />
							</div>
							<button onClick={handleSignUp}>Sign up</button>
							<p>
								<span>Already have an account?</span>
								<b onClick={toggle} className="pointer">
									Sign in here
								</b>
							</p>
						</div>
					</div>
				</div>
				{/* <!-- END SIGN UP -->
                <!-- SIGN IN --> */}
				<div className="col align-items-center flex-col sign-in">
					<div className="form-wrapper align-items-center">
						<div className="form sign-in">
							<div className="role-group">
								<div
									id = "admin"
									className="roles"
									onClick={handleRoleChange}
								>
									Admin
								</div>
								<div
									id="doctor"
									className="roles"
									onClick={handleRoleChange}
								>
									Doctor
								</div>
								<div
									id = "patient"
									className="roles"
									onClick={handleRoleChange}
								>
									Patient
								</div>
							</div>
							<div className="input-group">
								<i className="bx bxs-user"></i>
								<input
									name="email"
									type="text"
									placeholder="Username"
									onChange={handleSignInChange}
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input
									name="password"
									type="password"
									placeholder="Password"
									onChange={handleSignInChange}
								/>
							</div>
							<button onClick={handleSignIn}>Sign in</button>
							<p>
								<b>Forgot password?</b>
							</p>
							<p>
								<span>Don't have an account?</span>
								<b onClick={toggle} className="pointer">
									Sign up here
								</b>
							</p>
						</div>
					</div>
					<div className="form-wrapper"></div>
				</div>
				{/* <!-- END SIGN IN --> */}
			</div>
			{/* <!-- END FORM SECTION -->
             <!-- CONTENT SECTION --> */}
			<div className="row content-row">
				{/* <!-- SIGN IN CONTENT --> */}
				<div className="col align-items-center flex-col">
					{containerClass === "sign-in" && (
						<div className="text sign-in">Welcome to ArogyaShala</div>
					)}
					<div className="img sign-in"></div>
				</div>
				{/* <!-- END SIGN IN CONTENT -->
                <!-- SIGN UP CONTENT --> */}
				<div className="col align-items-center flex-col">
					<div className="img sign-up"></div>
					<div className="text sign-up">
						<h2>Join with Us</h2>
					</div>
				</div>
				{/* <!-- END SIGN UP CONTENT --> */}
			</div>
			{/* <!-- END CONTENT SECTION --> */}
		</div>
	);
}

export default Login;
