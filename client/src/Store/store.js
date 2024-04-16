import { configureStore } from "@reduxjs/toolkit";
import { loginReducer} from "./loginSlice";
import { patientReducer } from "./patientSlice";
import { doctorReducer } from "./doctorSlice";

export const store = configureStore({
     reducer: {
          login:loginReducer,
          patient: patientReducer,
          doctor: doctorReducer,
     }
})