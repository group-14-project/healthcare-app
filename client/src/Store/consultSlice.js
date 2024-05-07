import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { doctorActions } from "./doctorSlice";
import {GetCookie} from './loginSlice';
const initialState = {
     email: "",
     mainSymptom: "",
     secondarySymptom: "",
     appointmentDate: ""
}

export const makeConnection = async (data) => {
     return async (dispatch, getState) => {
          const fetchData = async () => {
               const state = getState();
               console.log("consult state: ",state.consult);
               const response = await axios.post
                    (
                         "https://localhost:9090/doctor/makeConnection",
                         data,
                         {
                              headers: {
                                   Authorization: GetCookie(),
                                   "Access-Control-Allow-Origin": "*",
                                   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                                   "Content-Type": "application/json",
                              },
                         }

                    ).then((res)=>{
                         console.log("res: ",res);
                         // const resData = JSON.parse(res.data);
                         

                         dispatch(doctorActions.updatePastAppointments(res.data));

                         return res;
                    })

               // console.log(response.data);



               
               
          };
          try {
               const response = await fetchData();
               // console.log("appointment added", response.data);
               return response;
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
