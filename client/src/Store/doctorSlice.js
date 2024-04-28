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
	reviews: [],
	senior: false,
	recommendedPatients: [],
};
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
});

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
			console.log(
				"Error getting hospitalAndSpecializationAndDoctor management",
				error
			);
		}
	};
};

export const fetchReviews = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:9090/doctor/viewReviews",
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
					name: "reviews",
					value: response.data,
				})
			);
		} catch (error) {
			console.error("Error getting reviews", error);
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

export const handleRecommendedPatients = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:9090/doctor/getRecommendedPatients",
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
					name: "recommendedPatients",
					value: response.data,
				})
			);
		} catch (error) {
			console.error("Error getting recommended patients", error);
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
			const existingConsent = getState().doctor.consentsShared.find(
				(consent) => {
					return (
						consent.patientEmail === data.patientEmail &&
						consent.newDoctorEmail === data.newDoctorEmail
					);
				}
			);
			if (!existingConsent) {
				const response = await fetchData();
				console.log("Consent shared", response.data);
				notyf.success("Consent Registered successfully");
			} else {
				notyf.error("Consent already registered");
				return;
			}
		} catch (error) {
			console.error("Error sharing consent", error);
			notyf.error("This patient is already registered with this doctor");
		}
	};
};

export const handleGetPatientReports = (email) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const data = {
				email: email,
			};
			console.log(data);
			const response = await axios.post(
				`http://localhost:9090/doctor/viewReports`,
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
			const response = await fetchData();
			console.log("Reports fetched", response.data);
			return response.data;
		} catch (error) {
			console.error("Error getting reports", error);
			notyf.error("Error fetching patient reports");
		}
	};
};


export const handleGetRecPatientReports = (id) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			// console.log(data);
			const response = await axios.get(
				`http://localhost:9090/doctor/viewRecommendedReports/${id}`,
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
			console.log("Reports fetched", response.data);
			return response.data;
		} catch (error) {
			console.error("Error getting reports", error);
			notyf.error("Error fetching patient reports");
		}
	};
};
export const handleGetRecPatientReport = (id, reportName) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			console.log(id);
			const response = await axios.get(
				`http://localhost:9090/doctor/downloadRecommendedFile/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					},
					responseType: "blob",
				}
			);
			return response;
		};
		try {
			const response = await fetchData();
			const blob = new Blob([response.data], {
				type: response.headers["content-type"],
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", reportName);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Error getting reports", error);
			notyf.error("You can't download this report");
		}
	};
};

export const handleGetPatientReport = (id, reportName) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			console.log(id);
			const response = await axios.get(
				`http://localhost:9090/doctor/downloadFile/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					},
					responseType: "blob",
				}
			);
			return response;
		};
		try {
			const response = await fetchData();
			const blob = new Blob([response.data], {
				type: response.headers["content-type"],
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", reportName);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Error getting reports", error);
			notyf.error("Error fetching patient reports");
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
			state.senior = payload.senior;
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
		updatePastAppointments: (state, action) => {
			state.pastAppointments = [...state.pastAppointments, action.payload];
		},
	},
});

export const handleAddPrescription = (email,presc) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			console.log(email,presc)
			const data = {
				patientEmail: email,
				prescription: presc,
			};
			console.log(data)
			const response = await axios.post(
				`http://localhost:9090/doctor/addPrescription`,
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
			const response = await fetchData();
			notyf.success("Prescription written successfully");
		} catch (error) {
			console.error("Error writing prescription", error);
			notyf.error("Error writing Prescription");
		}
	};
};

export const doctorReducer = doctorSlice.reducer;
export const doctorActions = doctorSlice.actions;
