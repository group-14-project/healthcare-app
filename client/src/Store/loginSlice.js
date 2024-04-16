import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientActions } from "./patientSlice";
import { doctorActions } from "./doctorSlice";
import axios from "axios";
// import setAuthToken from "../utils/setHeaders";

const initialState = {
	user: {
		firstName: "",
		lastName: "",
		role: "patient",
		email: "",
		password: "",
	},
};

export const handleLogin = (loginData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const userData = {
				user: {
					email: loginData.email,
					password: loginData.password,
				},
			};
			const response = await axios.post(
				`http://localhost:9090/${loginData.role}/loginotp`,
				userData,
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json",
					},
				}
			);
			return response;
		};
		try {
			const res = await fetchData();
		} catch (error) {
			console.error("Error signing in:", error);
		}
	};
};

export const handleSignUp = (signUpData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const userData = {
				patient: {
					email: signUpData.email,
					password: signUpData.password,
					firstName: signUpData.firstName,
					lastName: signUpData.lastName,
				},
			};
			console.log(userData);
			const response = await axios.post(
				`http://localhost:9090/patient/signupotp`,
				userData,
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json",
					},
				}
			);
			return response;
		};
		try {
			await fetchData();
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};
};

export const handleOTPverification = createAsyncThunk(
	"login/verifyOTP",
	async (otpdata, { getState, dispatch }) => {
		const state = getState();
		const userData = {
			user: {
				email: state.login.user.email,
				otp: otpdata.otp,
			},
		};
		try {
			const response = await axios.post(
				`http://localhost:9090/${state.login.user.role}/${otpdata.type}`,
				userData
			);
			console.log("login Slice after verify",response.data);
			if (otpdata.type === "login") {
				localStorage.setItem(
					"Authorization",
					response.headers.get("authorization")
				);
				if (state.login.user.role === "patient") {
					 dispatch(patientActions.addPatientDetails(response.data));
				}
				else if(role === 'doctor'){
					dispatch(doctorActions.addDoctorDetails(response.data));
				}
				// else{
				// 	// dispatch(adminActions.updateAdminDetails(response.data));
				// }
			}
			return response.data;
		} catch (error) {
			console.error("Error logging in:", error);
			throw error;
		}
	}
);

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		resetState: () => {
			return initialState;
		},
		updateDetails: (state, action) => {
			state.user = {
				...state.user,
				[action.payload.name]: action.payload.value,
			};
		},
	},
});

export const loginReducer = loginSlice.reducer;
export const loginActions = loginSlice.actions;
