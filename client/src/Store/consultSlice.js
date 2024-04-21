import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
     email: "",
     mainSymptom: "",
     secondarySymptom: "",
     appointmentTimeDate: new Date().toString()
}


export const makeConnection = (data) => {
     return async (dispatch, getState) => {
          const fetchData = async () => {
               const state = getState();
               // dispatch(consultActions.updateConsultDetails("appointmentTimeDate", ))
               console.log("consult state: ",state.consult);
               const response = await axios.post
                    (
                         "http://localhost:9090/doctor/makeConnection",
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
               console.log("appointment added", response.data);
          } catch (error) {
               console.error("Error adding appointment", error);
          }
     };
};




const consultSlice = createSlice({
     name: "consult",
     initialState,
     reducers: {
          resetState: () => {
               return initialState;
          },
          updateEmail: (state, action) => {
               state.email = action.payload;
          },
          updateMainSymptom: (state, action) => {
               state.mainSymptom = action.payload;
          },
          updateSecondarySymptom: (state, action) => {
               state.secondarySymptom = action.payload.join(',');
          },
          updateDateTime: (state, action) => {
               state.appointmentTimeDate = action.payload;
          },
          updateConsultDetails: (state, { payload }) => {
			return {
				...state,
				[payload.name]: payload.value,
			};
		}
     }
});


export const consultReducer = consultSlice.reducer;
export const consultActions = consultSlice.actions;