import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
     role: 'patient',
     user: {
          email: "",
          password: ""
     }
}


const loginSlice = createSlice({
     name: "login",
     initialState,
     reducers: {
          updateRole: (state, action) => {
               state.role = action.payload;
          },
          updateEmail: (state, action) => {
               state.email = action.payload;
          },
          updatePassword: (state, action) => {
               state.password = action.payload;
          }
     }

})