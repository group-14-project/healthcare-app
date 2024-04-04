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
		const createWebSocket = () => {
			const newSocket = new WebSocket("ws://localhost:9090/doctor-status");

			newSocket.onopen = () => {
				console.log("WebSocket connection established");
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

	useEffect(() => {
		if (socket) {
			socket.onmessage = (event) => {
				const message = JSON.parse(event.data);
				setMessages(message);
			};
			socket.onclose = () => {
				console.log("WebSocket connection closed");
			};
		}
	}, [messages, socket, setMessages]);

	return (
		<Box className="patient-consultation">
			<Chatbot
				config={config}
				messageParser={MessageParser}
				actionProvider={ActionProvider}
			/>
			<Box className="active-docs">
				<table className="avail-docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Degree</th>
							<th>Hospital</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{messages.map((message, index) => (
							<tr key={index}>
								<td>Dr. {message.firstName}</td>
								<td>{message.degree}</td>
								<td>{message.hospitalName}</td>
								<td>{message.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Box>
		</Box>
	);
}

export default PatientConsultation;
