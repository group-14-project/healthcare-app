import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import getstomClient from "../components/Patient/MySocket";



// const stompClient = getstomClient();


const initialState = {
	bloodGroup: "",
	email: "",
	firstName: "",
	lastName: "",
	height: "",
	weight: "",
	gender: "",
	pastAppointments: [],
	futureAppointments: [],
	patientId: null,
	firstTimeLogin: false,
	quote: {
		quote: "",
		author: "",
		category: ""
	},
	reports: [],
	pendingConsents: [],
	approvedConsents: [],
	calling: false,
	remoteId: "",
	doctorName: "",
};
import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; 
const notyf = new Notyf({
	position: {
		x: 'right',
		y: 'top',
	  },
});





export const handleUpdatePatientDetails = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const state = getState();
			const response = await axios.put(
				"https://localhost:9090/patient/updateDetail",
				state.patient,
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
			console.log("details added", response.data);
			return true
		} catch (error) {
			console.error("Error adding details", error);
			return false;
		}
	};
};


export const fetchReports = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://localhost:9090/patient/viewReports",
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
			dispatch(patientActions.updateReports(response.data));
			console.log("reports fetched: ", response.data);
			return true
		}
		catch (err) {
			console.error("error fetching reports: ", err);
			return false;
		}

	}
}


export const uploadReport = (data) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.post(
				"https://localhost:9090/patient/uploadReport",
				data,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "multipart/form-data"
					},
				}
			);
			return response;
		};
		try {

			const response = await fetchData();
			console.log(response);
			notyf.success("Report Uploaded Successfully");

		} catch (error) {
			console.log("Error uploading report", error);
			notyf.error("Error Uploading Report");
		}
	}
}

export const downloadReport = (reportId, reportName) => {
	return async (dispatch, getState) => {
		const helper = async () => {
			const response = await axios.get(
				`https://localhost:9090/patient/downloadFile/${reportId}`,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					},
					responseType: "blob"
				}
			);
			return response;
		};
		try {

			const response = await helper();
			console.log(response);

			const blob = new Blob([response.data], { type: response.headers["content-type"] });
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", reportName);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.log("Error downloading report", error);
			notyf.error("Error Downloading Report");
		}
	}
}

export const fetchPatientConsents = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://localhost:9090/patient/viewConsents",
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
			console.log(response.data);
			const pending = [], approved = [];
			response.data.map((consent) => {
				console.log(consent);
				if (consent.patientConsent === "pending")
					pending.push(consent);
				else if (consent.patientConsent === "accepted")
					approved.push(consent);
			});

			dispatch(patientActions.updatePendingConsents(pending));
			dispatch(patientActions.updateApprovedConsents(approved));


		} catch (error) {
			console.error("Error fetching consents", error);
		}
	}
}

export const approveConsent = (data) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.put(
				"https://localhost:9090/patient/giveConsent",
				data,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json"
					},
				}
			);
			return response;
		};
		try {

			const response = await fetchData();
			console.log(response);
			dispatch(fetchPatientConsents());
			notyf.success("Consent Provided Successfully");
		} catch (error) {
			console.log("Error providing consent", error);
			notyf.error(response.data.errorMessage);
		}
	}
}

export const withdrawConsent = (data) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.put(
				"https://localhost:9090/patient/withdrawConsent",
				data,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json"
					},
				}
			);
			return response;
		};
		try {

			const response = await fetchData();
			console.log(response);
			dispatch(fetchPatientConsents());
			notyf.success("Consent Withdrawn Successfully");

		} catch (error) {
			console.log("Error withdrawing consent", error);
			notyf.error("Error Withdrawing Consent");
		}
	}
}

export const rejectConsentRequest = (data) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.put(
				"https://localhost:9090/patient/rejectConsent",
				data,
				{
					headers: {
						Authorization: localStorage.getItem("Authorization"),
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Content-Type": "application/json"
					},
				}
			);
			return response;
		};
		try {

			const response = await fetchData();
			console.log(response);
			dispatch(fetchPatientConsents());


		} catch (error) {
			console.log("Error rejecting consent", error);
			notyf.error("Error Rejecting Consent");
		}
	}
}



export const makeCall = (patientId, patientName, doctorId, doctorName, stompClient) => {
	stompClient.send("/app/call", {}, JSON.stringify({
		"callTo": JSON.stringify({ "doctorName": doctorName, "remoteId": doctorId.toString() }),
		"callFrom": JSON.stringify({ "patientName": patientName, "localId": patientId.toString() }),
		// "consultState": JSON.stringify(consult)
	}));

	

	return {
		type: "call",
		"callTo": JSON.stringify({ "doctorName": doctorName, "remoteId": doctorId.toString() }),
		"callFrom": JSON.stringify({ "patientName": patientName, "localId": patientId.toString() }),
		// "consultState": JSON.stringify(consult)
	}

}



const patientSlice = createSlice({
	name: "patient",
	initialState,
	reducers: {
		resetState: () => {
			return initialState;
		},
		addPatientDetails: (state, { payload }) => {
			state.bloodGroup = payload.bloodGroup;
			state.email = payload.email;
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
			state.height = payload.height;
			state.weight = payload.weight;
			state.gender = payload.gender;
			state.pastAppointments = payload.pastAppointments;
			state.futureAppointments = payload.futureAppointments;
			state.patientId = payload.patientId;
			state.firstTimeLogin = payload.firstTimeLogin;
		},
		updatePatientDetails: (state, { payload }) => {
			console.log(payload);
			return {
				...state,
				[payload.name]: payload.value,
			};
		},
		updateQuote: (state, { payload }) => {
			state.quote = payload;
		},
		updateReports: (state, action) => {
			state.reports = action.payload;
		},
		updatePendingConsents: (state, action) => {
			state.pendingConsents = action.payload;
		},
		updateApprovedConsents: (state, action) => {
			state.approvedConsents = action.payload;
		},
		updateCallingState: (state, action) => {
			state.calling = action.payload;
		},
		updateRemoteId: (state, action) => {
			state.remoteId = action.payload;
		},
		updateDoctorName: (state, action) => {
			state.doctorName = action.payload;
		},
	},
});

export const patientReducer = patientSlice.reducer;
export const patientActions = patientSlice.actions;
