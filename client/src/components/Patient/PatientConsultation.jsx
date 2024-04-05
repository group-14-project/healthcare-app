import React, { useEffect, useRef, useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../services/config.jsx";
import MessageParser from "../services/MessageParser.jsx";
import ActionProvider from "../services/ActionProvider.jsx";
import { Box } from "@mui/material";
import "./PatientConsultation.css";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { useLocation } from "react-router-dom";



function PatientConsultation(props) {

	const location = useLocation();
	console.log(location.state);

	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);
	let stompClient = useRef();

	const handleCall = () => {
		var conn = new SockJS("http://localhost:9190/socket");
		stompClient.current = new Stomp.over(conn);
		stompClient.current.connect({}, (frame) => {
			stompClient.current.subscribe("/user/" + localID + "/topic/acceptCall", (accept) => {
				const acceptBody = JSON.parse(accept.body);
				console.log(accept);
				navigate(`/room/${acceptBody.roomID}`, { state: { callee: remoteID, caller: localID } });
			})

			stompClient.current.send("/app/call", {}, JSON.stringify({
				"callTo": remoteID.toString(),
				"callFrom": localID.toString()
			}));
		})
	}

	const createWebSocket = () => {
		const newSocket = new WebSocket("ws://localhost:9090/doctor-status");

		newSocket.onopen = () => {
			console.log("WebSocket connection established");
		};

		setSocket(newSocket);
		document.getElementById("active-docs").style.display = "block";
	};
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
				socketFunc={createWebSocket}
				config={config}
				messageParser={MessageParser}
				actionProvider={ActionProvider}
			/>
			<Box id="active-docs" className="active-docs">
				<table className="avail-docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Degree</th>
							<th>Hospital</th>
							<th>Status</th>
							<th>Consult Doctor</th>
						</tr>
					</thead>
					<tbody>
						{messages.map((message, index) => {
							console.log(message);
							// <tr key={index}>
							// 	<td>Dr. {message.firstName}</td>
							// 	<td>{message.degree}</td>
							// 	<td>{message.hospitalName}</td>
							// 	<td>{message.status}</td>
							// 	<td><Link onClick={handleCall}>Call</Link></td>
							// </tr>
						})}
					</tbody>
				</table>
			</Box>
		</Box>
	);
}

export default PatientConsultation;
