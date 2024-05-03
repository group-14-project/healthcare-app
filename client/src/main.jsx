import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import router from "./Routes.jsx";
import { persistor, store } from './Store/store.js';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
// import { WebSocketProvider } from "./components/common/WebSocketContext.jsx";
// import SockJsClient from 'react-stomp';

// const SOCKET_URL = 'http://localhost:8080/ws-message';

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			{/* <WebSocketProvider> */}
				<RouterProvider router={router} />
			{/* </WebSocketProvider> */}
		</PersistGate>
	</Provider>
);
