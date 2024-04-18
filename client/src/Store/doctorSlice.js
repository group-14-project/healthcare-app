import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
	email: "",
	firstName: "",
	lastName: "",
	pastAppointments: [],
	futureAppointments: [],
	doctorId: null,
	registrationId: null,
	degree: null,
	firstTimeLogin: false,
	totalPatients: 0,
	totalAppointments: 0,
	eachDayCounts: [],
	quote: {
		quote: "",
		author: "",
		category: "",
	},
	AllpatientsList: [],
	hospitalAndSpecializationAndDoctor: [],
	consentsShared: [],
};

// export const handleUpdateDoctorDetails = () => {
// 	return async (dispatch,getState) => {
// 		const fetchData = async () => {
// 			const state = getState();
// 			const response = await axios.put(
// 				"http://localhost:9090/patient/updateDetail",
// 				state.patient,
// 				{
// 					headers: {
// 						Authorization: localStorage.getItem("Authorization"),
// 						"Access-Control-Allow-Origin": "*",
// 						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			);
// 			return response;
// 		};
// 		try {
// 			const response = await fetchData();
// 			console.log("details added", response.data);
// 		} catch (error) {
// 			console.error("Error adding details", error);
// 		}
// 	};
// };

export const handlehospitalAndSpecializationAndDoctor = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:9090/doctor/viewHospitalsAndDoctors",
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
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
			// console.log("All patients fetched", response.data);
			dispatch(
				doctorActions.updateDoctorDetails({
					name: "hospitalAndSpecializationAndDoctor",
					value: response.data,
				})
			);
		} catch (error) {
			console.error(
				"Error getting hospitalAndSpecializationAndDoctor management",
				error
			);
		}
	};
};

export const handleGetAllPatients = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:9090/doctor/patientsLastAppointment",
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
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
			dispatch(
				doctorActions.updateDoctorDetails({
					name: "AllpatientsList",
					value: response.data,
				})
			);
		} catch (error) {
			console.error("Error getting patients list", error);
		}
	};
};

export const consentRegistration = (data) => {	
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:9090/doctor/registerConsent",
				data,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json",
					},
				}
			);
			return response;
		};
		try {
			const existingConsent = getState().doctor.consentsShared.find((consent) => {
				return (consent.patientEmail === data.patientEmail && consent.newDoctorEmail === data.newDoctorEmail);
			})
			if (!existingConsent){
				const response = await fetchData();
				console.log("Consent shared", response.data);
			}
		} catch (error) {
			console.error("Error sharing consent", error);
		}
	};
};

const doctorSlice = createSlice({
	name: "doctor",
	initialState,
	reducers: {
		resetState: () => {
			return initialState;
		},
		addDoctorDetails: (state, { payload }) => {
			state.doctorId = payload.doctorId;
			state.email = payload.email;
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
			state.registrationId = payload.registrationId;
			state.degree = payload.degree;
			state.totalPatients = payload.totalPatients;
			state.pastAppointments = payload.pastAppointments;
			state.futureAppointments = payload.futureAppointments;
			state.totalAppointments = payload.totalAppointments;
			state.firstTimeLogin = payload.firstTimeLogin;
			state.eachDayCounts = payload.eachDayCounts;
		},
		updateDoctorDetails: (state, { payload }) => {
			return {
				...state,
				[payload.name]: payload.value,
			};
		},
		updateQuote: (state, { payload }) => {
			state.quote = payload;
		},
		addConsentShared: (state, { payload }) => {
			state.consentsShared.push(payload);
		},
	},
});

export const doctorReducer = doctorSlice.reducer;
export const doctorActions = doctorSlice.actions;
