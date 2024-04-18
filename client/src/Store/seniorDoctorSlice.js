import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	consents: [],
};

export const fetchConsents = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:9090/senior_doctor/viewConsents",
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
			dispatch(seniorDoctorActions.updateConsents(response.data));
		} catch (error) {
			console.error("Error fetching consents", error);
		}
	};
};

const seniorDoctorSlice = createSlice({
	name: "seniorDoctor",
	initialState,
	reducers: {
		updateConsents: (state, action) => {
			state.consents = action.payload;
		},
	},
});

export const seniorDoctorActions = seniorDoctorSlice.actions;
export const seniorDoctorReducer = seniorDoctorSlice.reducer;
