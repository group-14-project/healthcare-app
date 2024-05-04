import { React, useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
	handleLogin,
	handleSignUp,
	loginActions,
} from "../../Store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
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

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.login.user);
	const [containerClass, setContainerClass] = useState("sign-in");
	const role = useSelector((state) => state.login.user.role);
	const firstTimeLogin = useSelector((state) => state[role].firstTimeLogin)
	const isAuthenticated = useSelector(
		(state) => state.login.user.isAuthenticated
	);
	const password = useSelector((state) => state.login.user.password);
	const [confirmPassword, setConfirmPassword] = useState("");
	const handleConfirmChange = (e) => {
		setConfirmPassword(e.target.value);
	};
	const errorMsg = useSelector((state) => state.login.errorMsg);

	const handleSignInChange = (e) => {
		const { name, value } = e.target;
		dispatch(loginActions.updateDetails({ name, value }));
		const { id } = e.target;
		const buttons = ["hospital", "doctor", "patient"];
		if (id) {
			buttons.forEach((button) => {
				document.getElementById(button).style.backgroundColor =
					button === id ? "#4FA786" : "#efefef";
			});
		}
	};
	const handleSignIn = async (e) => {
		e.preventDefault();
		// console.log(data);
		if (data.role !== "") {
			const loginSuccess = await dispatch(handleLogin(data));
			if (loginSuccess) {
				console.log(errorMsg);
				navigate("/verify-otp", {
					state: { type: "login", data: data },
				});
			}
		}
	};

	const handleSignUpChange = (e) => {
		const { name, value } = e.target;
		dispatch(loginActions.updateDetails({ name, value }));
	};

	const handlingSignUp = async (e) => {
		e.preventDefault();
		if (isValidPassword(password) === false) {
			notyf.error(
				"Password should contain a specaial character, a number and an uppercase letter and should be atleast 8 characters long"
			);
			return;
		}
		if (password !== confirmPassword) {
			notyf.error("Password and Confirm Password do not match");
			return;
		}

		const signInSucess = await dispatch(handleSignUp(data));
		if (signInSucess) {
			navigate("/verify-otp", {
				state: { type: "signup", data: data },
			});
		}
	};

	const handleForgotPassword = () => {
		navigate("/forgot-password");
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

	useEffect(() => {
		if (isAuthenticated) {
			if(!firstTimeLogin){
				if(role == 'patient'){
					navigate('/patient/details')
				}else{
					navigate(`/${role}/changepwd`)
				}
			}
			else{
				navigate(`/${role}/dashboard`);
			}
		}
	}, [isAuthenticated, navigate]);

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
									onChange={handleSignUpChange}
									placeholder="First Name"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-user"></i>
								<input
									name="lastName"
									type="text"
									onChange={handleSignUpChange}
									placeholder="Last Name"
								/>
							</div>
							<div className="input-group">
								<i className="bx bx-mail-send"></i>
								<input
									name="email"
									type="email"
									onChange={handleSignUpChange}
									placeholder="Email"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input
									name="password"
									type="password"
									onChange={handleSignUpChange}
									placeholder="Password"
								/>
							</div>
							<div className="input-group">
								<i className="bx bxs-lock-alt"></i>
								<input
									onChange={handleConfirmChange}
									type="password"
									placeholder="Confirm password"
								/>
							</div>
							<button onClick={handlingSignUp}>Sign up</button>
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
								<button
									id="patient"
									className="roles"
									name="role"
									value="patient"
									variant="contained"
									onClick={handleSignInChange}
									style={{ backgroundColor: "#4FA786" }}
								>
									Patient
								</button>
								<button
									id="hospital"
									className="roles"
									name="role"
									value="hospital"
									variant="contained"
									onClick={handleSignInChange}
								>
									Hospital
								</button>
								<button
									id="doctor"
									className="roles"
									name="role"
									value="doctor"
									variant="contained"
									onClick={handleSignInChange}
								>
									Doctor
								</button>
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
							<p style={{ cursor: "pointer" }} onClick={handleForgotPassword}>
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
