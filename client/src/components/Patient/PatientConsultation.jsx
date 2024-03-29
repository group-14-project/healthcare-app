import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import config from "../services/config.jsx";
import MessageParser from "../services/MessageParser.jsx";
import ActionProvider from "../services/ActionProvider.jsx";
import { Box } from "@mui/material";
import "./PatientConsultation.css";

function PatientConsultation() {
	return (
		<Box className = "patient-consultation">
			<Chatbot
				config={config}
				messageParser={MessageParser}
				actionProvider={ActionProvider}
			/>
		</Box>
	);
}

export default PatientConsultation;
