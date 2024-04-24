import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	pending: [],
	approved:[]
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
			console.log("consents",response.data)
			dispatch(seniorDoctorActions.addConsents(response.data));
		} catch (error) {
			console.error("Error fetching consents", error);
		}
	};
};

export const approveConsent = (consentId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			console.log(consentId)
			const response = await axios.post(
				`http://localhost:9090/senior_doctor/approveConsent/${consentId}`,null,
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
			dispatch(seniorDoctorActions.pendingToApproved(consentId));
		} catch (error) {
			console.error("Error Approving consents", error);
		}
	};
};

const seniorDoctorSlice = createSlice({
	name: "seniorDoctor",
	initialState,
	reducers: {
		addConsents: (state, action) => {
			state.pending = action.payload.pendingConsents;
			state.approved = action.payload.approvedConsents;
		},
		pendingToApproved: (state, action) => {
			state.approved.push(action.payload);
			state.pending = state.pending.filter((consentId) => consentId !== action.payload.consentId);
		},
	},
});

export const seniorDoctorActions = seniorDoctorSlice.actions;
export const seniorDoctorReducer = seniorDoctorSlice.reducer;
