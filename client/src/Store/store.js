import { combineReducers, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice";
import { patientReducer } from "./patientSlice";
import { doctorReducer } from "./doctorSlice";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from "redux-persist";
import {thunk} from "redux-thunk";
import { seniorDoctorReducer } from "./seniorDoctorSlice";
import { consultReducer } from "./consultSlice";

const persistConfig = {
	key: "root",
	storage:storageSession,
};

const combinedReducer = combineReducers({
	login: loginReducer,
	patient: patientReducer,
	doctor: doctorReducer,
	consult: consultReducer,
	seniorDoctor: seniorDoctorReducer
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);
export const store = configureStore({
	reducer: persistedReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export const persistor = persistStore(store);
