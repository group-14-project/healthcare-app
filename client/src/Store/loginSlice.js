import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientActions } from "./patientSlice";
import { doctorActions } from "./doctorSlice";
import axios from "axios";
import { hospitalActions } from "./hospitalSlice";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import getstomClient from "../components/Patient/MySocket";

const initialState = {
	user: {
		firstName: "",
		lastName: "",
		role: "patient",
		email: "",
		password: "",
		isAuthenticated: false,
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

export const formatDate = (inputDate) => {
	// Split the input date into year, month, and day
	const [year, month, day] = inputDate.split("-");

	// Create a new Date object
	const date = new Date(year, month - 1, day);

	// Get the day, month, and year components
	const dayOfMonth = date.getDate();
	const monthIndex = date.getMonth();
	const yearValue = date.getFullYear();

	// Define an array of month names
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Get the month name using the month index
	const monthName = monthNames[monthIndex];

	// Return the formatted date string
	return `${dayOfMonth} ${monthName} ${yearValue}`;
};

// const makeSocketConnection = async (stompClient, doctorId, dispatch) => {
// 	await stompClient.connect({}, (frame) => {
// 		stompClient.subscribe(
// 			"/user/" + doctorId + "/topic/call",
// 			(call) => {
// 				console.log("call from: " + call.body);
// 				// console.log("remote id: " + call.body);
// 				// const userData = JSON.parse(call.body);
// 				// console.log(userData);
// 				// // console.log("consult state in doc dashboard: ", state.consult);
// 				// const consultationData = JSON.parse(userData["consultState"]);
// 				// const callFrom = JSON.parse(userData["callFrom"]);
// 				// console.log(consultationData);
// 				// console.log(callFrom.localId);


// 				// dispatch(doctorActions.updateConsultState(consultationData));

// 				dispatch(doctorActions.updateRemoteId(call.body));
// 				// setConsultState(consultationData);

// 				// setRemoteId(callFrom.localId);
// 				// setPatientName(callFrom.patientName);
// 				dispatch(doctorActions.updateIncomingCall(true));

// 			}
// 		);
// 	});
// }


export const handleOTPverification = (otpdata) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const state = getState();
			const userData = {
				user: {
					email: state.login.user.email,
					otp: otpdata.otp,
				},
			};
			const response = await axios.post(
				`http://localhost:9090/${state.login.user.role}/${otpdata.type}`,
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
			const response = await fetchData();
			if (otpdata.type === "login") {
				localStorage.setItem(
					"Authorization",
					response.headers.get("authorization")
				);
				dispatch(loginActions.updateAuthenticated(true));
				const state = getState();
				if (state.login.user.role === "patient") {
					dispatch(patientActions.addPatientDetails(response.data));
				} else if (state.login.user.role === "doctor") {
					// const conn = new SockJS("http://localhost:9090/socket");
					// const stompClient = await new Stomp.over(conn);

					// await makeSocketConnection(stompClient, response.data.doctorId, dispatch);

					// response.data = {
					// 	...response.data,
					// 	stompRef: stompClient,
					// };

					dispatch(doctorActions.addDoctorDetails(response.data));

				}
				else {
					dispatch(hospitalActions.addHospitalDetails(response.data));
				}
			}
		} catch (error) {
			console.error("Error logging in:", error);
			throw error;
		}
	};
};

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
		updateAuthenticated: (state, action) => {
			state.user.isAuthenticated = action.payload;
		},
		logout: (state) => {
			state.user.isAuthenticated = false;
		},
	},
});

export const loginReducer = loginSlice.reducer;
export const loginActions = loginSlice.actions;
