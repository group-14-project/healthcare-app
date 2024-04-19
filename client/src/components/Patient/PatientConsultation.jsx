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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Store/store.js";
import { consultActions } from "../../Store/consultSlice.js";


function PatientConsultation(props) {

	// const location = useLocation();
	// console.log(location.state);
	const navigate = useNavigate();
	// const patientId = localStorage.getItem("patientId");
	// const patientName = localStorage.getItem("patientName");
	// console.log(patientId);

	// const patientId = useSelector((state)=>{state.patient.patientId})
	const consult = useSelector(state=>state.consult);

	const state = store.getState();

	const patientId = state.patient.patientId;
	const patientName = state.patient.firstName;

	console.log(patientId);

	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);
	const [remoteID, setRemoteID] = useState("");
	// const mysoc = useRef();

	const [localID, setLocalId] = useState(patientId);
	let stompClient = useRef();

	const dispatch = useDispatch();

	useEffect(()=>{

		dispatch(consultActions.updateEmail(state.patient.email));

	},[])


	const handleCall = (doctorId, doctorName) => {
		var conn = new SockJS("http://localhost:9090/socket");
		dispatch(consultActions.updateConsultDetails({name: "appointmentTimeDate", value: new Date().toISOString()}));
		stompClient.current = new Stomp.over(conn);
		setRemoteID(doctorId.toString());
		stompClient.current.connect({}, (frame) => {
			stompClient.current.subscribe("/user/" + localID + "/topic/acceptCall", (accept) => {
				// console.log(accept);
				const acceptBody = JSON.parse(accept.body);
				const acceptedBy = JSON.parse(acceptBody.acceptedBy);
				const initiatedBy = JSON.parse(acceptBody.initiatedBy);
				acceptedBy.callee = localID;
				initiatedBy.caller = doctorId;
				acceptedBy.name = patientName
				initiatedBy.name = doctorName;
				console.log(acceptBody);
				navigate(`/room/${acceptBody.roomID}`, { state: { acceptedBy, initiatedBy } });
			})

			console.log("consult: ",consult);

			stompClient.current.send("/app/call", {}, JSON.stringify({
				"callTo": JSON.stringify({ "doctorName": doctorName, "remoteId": doctorId.toString() }),
				"callFrom": JSON.stringify({ "patientName": patientName, "localId": localID.toString() }),
				"consultState": JSON.stringify(consult)
			}));
		})
	}

	const createWebSocket = () => {
		const newSocket = new WebSocket("ws://localhost:9090/doctor-status");
		// console.log(newSocket);
		newSocket.onopen = () => {
			console.log("WebSocket connection established");
		};

		console.log(state.consult);

		setSocket(newSocket);
		document.getElementById("active-docs").style.display = "block";
	};

	useEffect(() => {
		if(socket) {
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
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="right">Hospital</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Status</TableCell>
								<TableCell align="right">Consult Doctor</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{messages.map((message, index) => (
								<TableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scopename="row">
										{message.firstName}
									</TableCell>
									<TableCell align="right">{message.hospitalName}</TableCell>
									<TableCell align="right">{message.email}</TableCell>
									<TableCell align="right">{message.status}</TableCell>
									<TableCell align="right"><Link onClick={() => { handleCall(message.doctorId, message.firstName) }}>Call</Link></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}

export default PatientConsultation;
