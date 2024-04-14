import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
     role: 'patient',
     user: {
          email: "",
          password: ""
     }
}


const handleLogin = createAsyncThunk("login/loginOTP", async (loginData) => {


     try {
          const response = await axios.post(
               `http://localhost:9090/${loginData.role}/loginotp`,
               loginData,
               {
                    Authorization: {
                         Type: "Basic Auth",
                         Username: "user",
                         Password: "password",
                    },
                    headers: {
                         "Access-Control-Allow-Origin": "*",
                         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log(response);
          const serializedHeaders = JSON.stringify(response.headers);

          console.log("Serialized Headers:", serializedHeaders);

          return {
               data: response.data,
               headers: serializedHeaders
          };

     } catch (error) {
          console.error("Error signing up:", error);
     }
})



const loginSlice = createSlice({
     name: "login",
     initialState,
     reducers: {
          resetState: () => {
               return initialState;
          },
          updateRole: (state, action) => {
               state.role = action.payload;
          },
          updateUser: (state, action) => {
               console.log(action);
               state.user = {
                    ...state.user,
                    [action.payload.name]: action.payload.value
               }
          }
     }

})


export const loginReducer = loginSlice.reducer;
export const loginActions = loginSlice.actions;
export const login = handleLogin;