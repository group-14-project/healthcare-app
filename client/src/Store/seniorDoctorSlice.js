import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	pending: [],
	approved: [],
};
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
	types: [
		{
			type: "waiting",
			background: "orange",
			duration: 10000,
			icon:false
		},
	],
});

export const fetchConsents = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://localhost:9090/senior_doctor/viewConsents",
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
			console.log("consents", response.data);
			dispatch(seniorDoctorActions.addConsents(response.data));
		} catch (error) {
			console.error("Error fetching consents", error);
		}
	};
};

export const approveConsent = (consentId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			console.log(consentId);
			const response = await axios.post(
				`https://localhost:9090/senior_doctor/approveConsent/${consentId}`,
				null,
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
			notyf.open({
				type: "waiting",
				message: "Please Wait...",
			});
			const response = await fetchData();
			dispatch(seniorDoctorActions.pendingToApproved(consentId));
			notyf.success("Consent Approved Successfully");
		} catch (error) {
			console.error("Error Approving consents", error);
			notyf.error(error.response.data.errorMessage);
		}
	};
};

export const rejectConsent = (consentId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			console.log(consentId);
			const response = await axios.post(
				`https://localhost:9090/senior_doctor/rejectConsent/${consentId}`,
				null,
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
			notyf.open({
				type: "waiting",
				message: "Please Wait...",
			});
			const response = await fetchData();
			dispatch(seniorDoctorActions.pendingToApproved(consentId));
			notyf.success("Consent Rejected Successfully");
		} catch (error) {
			console.error("Error Rejecting consent", error);
			notyf.error(error.response.data.errorMessage);
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
			state.pending = state.pending.filter(
				(consentId) => consentId !== action.payload.consentId
			);
		},
	},
});

export const seniorDoctorActions = seniorDoctorSlice.actions;
export const seniorDoctorReducer = seniorDoctorSlice.reducer;
