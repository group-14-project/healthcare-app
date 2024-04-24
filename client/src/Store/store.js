import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice";
import { patientReducer } from "./patientSlice";
import { doctorReducer } from "./doctorSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import { seniorDoctorReducer } from "./seniorDoctorSlice";
import { consultReducer } from "./consultSlice";
import { hospitalReducer } from "./hospitalSlice";

const persistConfig = {
	key: "root",
	storage: storageSession,
};

const combinedReducer = combineReducers({
	login: loginReducer,
	patient: patientReducer,
	doctor: doctorReducer,
	consult: consultReducer,
	seniorDoctor: seniorDoctorReducer,
	hospital: hospitalReducer
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
