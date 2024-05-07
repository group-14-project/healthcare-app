import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	email: "",
	hospitalName: "",
	address: "",
	city: "",
	firstTimeLogin: false,
	eachDayCounts: [],
	quote: {
		quote: "",
		author: "",
		category: "",
	},
	doctors: [],
	reviews: [],
    specialization:[]
};

const hospitalSlice = createSlice({
	name: "doctor",
	initialState,
	reducers: {
		resetState: () => {
			return initialState;
		},
		addHospitalDetails: (state, { payload }) => {``
			state.email = payload.email;
			state.hospitalName = payload.hospitalName;
			state.address = payload.address;
			state.city = payload.city;
			state.firstTimeLogin = payload.firstTimeLogin;
			state.eachDayCounts = payload.eachDayCounts;
			state.doctors = payload.doctors;
			state.reviews = payload.reviews;
            state.specialization = payload.specialization;
		},
		updateQuote: (state, { payload }) => {
			state.quote = payload;
		},
		
	},
});

export const hospitalReducer = hospitalSlice.reducer;
export const hospitalActions = hospitalSlice.actions;
