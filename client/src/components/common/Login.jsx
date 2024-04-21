import { React, useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { handleLogin,handleSignUp ,loginActions } from "../../Store/loginSlice";
import {useDispatch, useSelector} from "react-redux"
import { Button } from '@mui/material';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.login.user);
	const [containerClass, setContainerClass] = useState("sign-in");
	const role = useSelector((state) => state.login.user.role);
    const isAuthenticated = useSelector((state) => state.login.user.isAuthenticated);

	const handleSignInChange = (e) => {
		const { name, value } = e.target;
		dispatch(loginActions.updateDetails({name,value}));
		const { id } = e.target;
		const buttons = ["admin", "doctor", "patient"];
		if(id){
			buttons.forEach((button) => {
				document.getElementById(button).style.backgroundColor = button === id ? "#4FA786" : "#efefef";
			});
		}
	};
	const handleSignIn = async (e) => {
		e.preventDefault();
		if(data.role !== ""){
			dispatch(handleLogin(data));
			navigate("/verify-otp", {
				state: {type: "login" },
			});
		}
	};

	const handleSignUpChange = (e) => {
		const { name, value } = e.target;
		dispatch(loginActions.updateDetails({name,value}));
	};

	const handlingSignUp = async (e) => {
		e.preventDefault();
		
		dispatch(handleSignUp(data));
		navigate("/verify-otp", {
			state: {type: "signup"},
		});
		
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
		if(isAuthenticated){
			navigate(`/${role}/dashboard`);
		}
	},[isAuthenticated,navigate])

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
								<input type="password" placeholder="Confirm password" />
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
									name = "role"
									value = "patient"
									variant="contained"
									onClick={handleSignInChange}
									style = {{backgroundColor: "#4FA786"}}
								>
									Patient
								</button>
								<button
									id="admin"
									className="roles"
									name = "role"
									value = "admin"
									variant="contained"
									
									onClick={handleSignInChange}
								>
									Admin
								</button>
								<button
									id="doctor"
									className="roles"
									name = "role"
									value = "doctor"
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
