import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {GetCookie} from './loginSlice';
// import getstomClient from "../components/Patient/MySocket";

// const stompClient = getstomClient();


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
	stompRef: {},
	incomingCall: false,
	remoteId: "",
	patientName: "",
	consultState: "",
	// roomId: ""
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
				"https://localhost:9090/doctor/viewHospitalsAndDoctors",
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
				"https://localhost:9090/doctor/viewReviews",
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
				"https://localhost:9090/doctor/patientsLastAppointment",
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
				"https://localhost:9090/doctor/getRecommendedPatients",
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
				"https://localhost:9090/doctor/registerConsent",
				data,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
			notyf.error(error.response.data.errorMessage);
		}
	};
};

export const changeStatus = (status) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://localhost:9090/doctor/changeStatus/${status}`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
				console.log("Status Changed", response.data);
				notyf.success("Status Changed successfully");
		} catch (error) {
			console.error("Error Changing Status", error);
			notyf.error(error.response.data.errorMessage);
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
				`https://localhost:9090/doctor/viewReports`,
				data,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
			notyf.error(error.response.data.errorMessage);
		}
	};
};


export const handleGetRecPatientReports = (id) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			// console.log(data);
			const response = await axios.get(
				`https://localhost:9090/doctor/viewRecommendedReports/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
			notyf.error(error.response.data.errorMessage);
		}
	};
};
export const handleGetRecPatientReport = (id, reportName) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			console.log(id);
			const response = await axios.get(
				`https://localhost:9090/doctor/downloadRecommendedFile/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
			notyf.error(error.response.data.errorMessage);
		}
	};
};

export const acceptCall = (doctorName, patientName, remoteId, localId, stompClient) => {

	const newUuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
		/[018]/g,
		(c) =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
	);

	console.log(newUuid);

	// const doctorName = state.firstName;

	// setRoomID(newUuid);

	console.log("stomp client in doctor slice: ", stompClient);

	const acceptedBy = { name: doctorName, callee: localId.toString() };
	const initiatedBy = { name: patientName, caller: remoteId.toString() };

	stompClient.send(
		"/app/acceptCall",
		{},
		JSON.stringify({
			roomID: newUuid,
			acceptedBy: JSON.stringify(acceptedBy),
			initiatedBy: JSON.stringify(initiatedBy),
		})
	);



	return { type: "acceptCall", data: { acceptedBy, initiatedBy }, roomId: newUuid };

}



export const rejectCall = (doctorName, doctorId, patientName, patientId, stompClient) => {
	const rejectedBy = {
		name: doctorName,
		callee: doctorId,
		message: "Doctor is Busy right now",
	};
	const initiatedBy = { name: patientName, caller: patientId };

	stompClient.send(
		"/app/rejectCall",
		{},
		JSON.stringify({
			rejectedBy: JSON.stringify(rejectedBy),
			initiatedBy: JSON.stringify(initiatedBy),
		})
	);

	return { type: "rejectCall", data: { rejectedBy, initiatedBy } };

}

export const handleGetPatientReport = (id, reportName) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			console.log(id);
			const response = await axios.get(
				`https://localhost:9090/doctor/downloadFile/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
			notyf.error(error.response.data.errorMessage);
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
			state.stompRef = payload.stompRef;
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
		updateSocketRef: (state, action) => {
			state.stompRef = action.payload;
		},
		updateIncomingCall: (state, action) => {
			state.incomingCall = action.payload;
		},
		updateRemoteId: (state, action) => {
			state.remoteId = action.payload;
		},
		updatePatientName: (state, action) => {
			state.patientName = action.payload;
		},
		updateConsultState: (state, action) => {
			state.consultState = action.payload;
		}
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
				`https://localhost:9090/doctor/addPrescription`,
				data,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
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
