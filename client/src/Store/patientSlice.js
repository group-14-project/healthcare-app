import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
	reports: []
};

export const handleUpdatePatientDetails = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const state = getState();
			const response = await axios.put(
				"http://localhost:9090/patient/updateDetail",
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
		} catch (error) {
			console.error("Error adding details", error);
		}
	};
};


export const fetchReports = () => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:9090/patient/viewReports",
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
		}
		catch (err) {
			console.error("error fetching reports: ", err);
		}

	}
}


export const uploadReport = (data) => {
	return async (dispatch, getState) => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:9090/patient/uploadReport",
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

		} catch (error) {
			console.log("Error uploading report", error);
		}
	}
}


export const downloadReport = (reportId, reportName) => {
	return async (dispatch, getState) => {
		const helper = async () => {
			const response = await axios.get(
				`http://localhost:9090/patient/downloadFile/${reportId}`,
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
			// setFileData(null);
			// setFileName("");

		} catch (error) {
			console.log("Error downloading report", error);
		}
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
			// state.reports = [];
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
			console.log(action.payload);
			state.reports = action.payload;
		}
	},
});

export const patientReducer = patientSlice.reducer;
export const patientActions = patientSlice.actions;
