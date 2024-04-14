import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {}


const patientSlice = createSlice({
     name: "patient",
     initialState,
     reducers: {
          resetState: () => {
               return initialState;
          },
          updatePatient: (state, action) => {
               console.log(action);
               state = {
                    ...state,
                    [action.payload.name]: action.payload.value
               }
          }
     }

})

export const patientReducer = patientSlice.reducer;
export const patientActions = patientSlice.actions;