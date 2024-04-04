import React, { useEffect, useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../services/config.jsx";
import MessageParser from "../services/MessageParser.jsx";
import ActionProvider from "../services/ActionProvider.jsx";
import { Box } from "@mui/material";
import "./PatientConsultation.css";

function PatientConsultation() {
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const createWebSocket =  () => {
			const newSocket = new WebSocket("ws://localhost:9090/doctor-status");

			newSocket.onopen = () => {
				console.log("WebSocket connection established");
			};

			newSocket.onmessage = (event) => {
				const message = JSON.parse(event.data);
				setMessages((ps) => [...ps, message]);
				console.log("MESSAGE",message);
			};

			newSocket.onclose = () => {
				console.log("WebSocket connection closed");
			};

			setSocket(newSocket);
		};

		createWebSocket();

		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, []);

	return (
		<Box className="patient-consultation">
			<Chatbot
				config={config}
				messageParser={MessageParser}
				actionProvider={ActionProvider}
			/>
			<Box>
				<ul>
					{messages.map((message, index) => (
						<li key={index}>
							<p>Email: {message.email}</p>
							<p>Status: {message.status}</p>
							<p>First Name: {message.firstName}</p>
						</li>
					))}
				</ul>
			</Box>
		</Box>
	);
}

export default PatientConsultation;
