import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	message: "",
	type: "",
	status: "",
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		resetState: () => {
			return initialState;
		},
		updateNotification: (state, { payload }) => {
			Object.assign(state, payload);
		},
	},
});

export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;
