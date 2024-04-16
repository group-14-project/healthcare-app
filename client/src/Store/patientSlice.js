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
	loading:true
};

export const handleUpdatePatientDetails = () => {
	return async (dispatch,getState) => {
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
			state.firstTimeLogin = true;
		},
		updatePatientDetails: (state, { payload }) => {
			return {
				...state,
				[payload.name]: payload.value,
			};
		},
	},
});

export const patientReducer = patientSlice.reducer;
export const patientActions = patientSlice.actions;
