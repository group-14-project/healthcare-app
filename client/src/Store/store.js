import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, loginActions } from "../Features/loginSlice";

export const store = configureStore({
     reducer: {
          loginReducer,
     }
})