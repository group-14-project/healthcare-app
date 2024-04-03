import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
	const [containerClass, setContainerClass] = useState("sign-in");
	const [roleName, setRole] = useState("");
	const [formData, setFormData] = useState({
		patient: {
			email: "",
			name: "",
			password: "",
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[roleName]: {
				...prevState.role,
				[name]: value,
			},
		}));
	};
	const handleRole = (e) => {
		console.log(e);
		setRole(toString(e.target.innerText));
		// console.log(roleName);
		// 	setFormData((prevState) => ({
		// 		[roleName]: {
		// 			...prevState.roleName,
		// 		},
		// 	}));
		// 	console.log(formData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:9191/patient/loginotp",
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
			console.log("User signed up:", response.data);
			// Optionally, handle successful signup (e.g., redirect to login page)
		} catch (error) {
			console.error("Error signing up:", error);
			// Optionally, handle signup error (e.g., display error message to user)
		}
	};
	const handleSignIn = async (e) => {
		try {
			const response = await axios.post(
				"http://localhost:9191/patient/email",
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
			console.log("User signed up:", response.data);
			// Optionally, handle successful signup (e.g., redirect to login page)
		} catch (error) {
			console.error("Error signing up:", error);
			// Optionally, handle signup error (e.g., display error message to user)
		}
	};

	// Function to toggle between 'sign-in' and 'sign-up' classes
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
							<div className="role-group">
								<div onClick={handleRole} data-value="admin" className="roles">
									Admin
								</div>
								<div onClick={handleRole} data-value="doctor" className="roles">
									Doctor
								</div>
								<div
									onClick={handleRole}
									data-value="patient"
									className="roles"
								>
									Patient
								</div>
							</div>
							<div className="input-group">
								<i className="bx bxs-user"></i>
								<input
									name="name"
									type="text"
									value={formData.username}
									onChange={handleChange}
									placeholder="Username"
								/>
							</div>
							<div className="input-group">
								<i className="bx bx-mail-send"></i>
								<input
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Email"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input
									name="password"
									type="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Password"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input type="password" placeholder="Confirm password" />
							</div>
							<button onClick={handleSubmit}>Sign up</button>
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
								<div onClick={handleRole} className="roles">
									Admin
								</div>
								<div onClick={handleRole} className="roles">
									Doctor
								</div>
								<div onClick={handleRole} className="roles">
									Patient
								</div>
							</div>
							<div className="input-group">
								<i className="bx bxs-user"></i>
								<input type="text" placeholder="Username" />
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input type="password" placeholder="Password" />
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
