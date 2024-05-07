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
import Stomp from "stompjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Store/store.js";
import { consultActions } from "../../Store/consultSlice.js";
import { useSnackbar } from "notistack";
import CallLoader from "./CallLoader.jsx";
import { makeCall, patientActions } from "../../Store/patientSlice.js";
import {
	WebSocketProvider,
	useStompClient,
} from "../common/WebSocketContext.jsx";
// import getstomClient from "./MySocket.js";

function PatientConsultation(props) {
	const navigate = useNavigate();
	const consult = useSelector((state) => state.consult);
	const patientState = useSelector((state) => state.patient);
	const mainSymptom = useSelector((state) => state.consult.mainSymptom);

	const state = store.getState();

	const patientId = state.patient.patientId;
	const patientName = state.patient.firstName;

	console.log(patientId);

	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);
	const [remoteID, setRemoteID] = useState("");

	const [calling, setCalling] = useState(false);
	// const mysoc = useRef();

	const [localID, setLocalId] = useState(patientId);
	// const stompClient = useRef();
	const { enqueueSnackbar } = useSnackbar();

	const stompClient = useStompClient();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(consultActions.updateEmail(state.patient.email));

		console.log(patientState.calling);

		// stompClient.current = getstomClient().client
		// console.log("this si stompClient: ", stompClient.current)
		// stompClient.current.connect({}, () => {
		// 	console.log("connection is establissssssssshed")
		// 	console.log(stompClient.current);
		if (stompClient) {
			stompClient.subscribe("/user/" + localID + "/topic/call", (data) => {
				console.log("Queue Size: ", data.body);
			});

			stompClient.subscribe(
				"/user/" + localID + "/topic/acceptCall",
				(accept) => {
					dispatch(patientActions.updateCallingState(false));
					// setCalling(false);
					console.log("patient state: ", patientState);
					const acceptBody = JSON.parse(accept.body);
					const acceptedBy = JSON.parse(acceptBody.acceptedBy);
					const initiatedBy = JSON.parse(acceptBody.initiatedBy);
					console.log("accept body: ", acceptBody);
					// const temp = acceptedBy;
					initiatedBy.caller = acceptedBy.callee;
					initiatedBy.name = acceptedBy.name;
					acceptedBy.callee = localID;
					acceptedBy.name = patientName;
					console.log(acceptBody);
					navigate(`/room/${acceptBody.roomID}`, {
						state: { acceptedBy, initiatedBy },
					});
				}
			);

			stompClient.subscribe(
				"/user/" + localID + "/topic/rejectCall",
				(accept) => {
					dispatch(patientActions.updateCallingState(false));
					// setCalling(false);
					const acceptBody = JSON.parse(accept.body);
					const rejectedBy = JSON.parse(acceptBody.rejectedBy);
					console.log(rejectedBy.message);
					const variant = "error";
					enqueueSnackbar(rejectedBy.message, { variant });
				}
			);
		}

		// })
	}, [stompClient]);

	const handleCall = (doctorId, doctorName) => {
		dispatch(patientActions.updateCallingState(true));
		// setCalling(true);
		// setRemoteID(doctorId.toString());
		dispatch(patientActions.updateRemoteId(doctorId));

		dispatch(patientActions.updateDoctorName(doctorName));

		dispatch(makeCall(localID, patientName, doctorId, doctorName, stompClient, consult));

		// var conn = new SockJS("http://localhost:9090/socket");

		// stompClient.current = new Stomp.over(conn);

		// console.log("insider handle: ",stompClient.current);

		// stompClient.current.connect({}, () => {

		// stompClient.current.subscribe("/user/" + localID + "/topic/call", (data) => {

		// 	console.log("Queue Size: ", data.body);

		// })

		// stompClient.current.subscribe("/user/" + localID + "/topic/acceptCall", (accept) => {
		// 	// console.log(accept);
		// 	// dispatch(patientActions.updateCallingState(false));
		// 	setCalling(false);
		// 	const acceptBody = JSON.parse(accept.body);
		// 	const acceptedBy = JSON.parse(acceptBody.acceptedBy);
		// 	const initiatedBy = JSON.parse(acceptBody.initiatedBy);
		// 	acceptedBy.callee = localID;
		// 	initiatedBy.caller = doctorId;
		// 	acceptedBy.name = patientName
		// 	initiatedBy.name = doctorName;
		// 	console.log(acceptBody);
		// 	navigate(`/room/${acceptBody.roomID}`, { state: { acceptedBy, initiatedBy } });
		// });

		// stompClient.current.subscribe("/user/" + localID + "/topic/rejectCall", (accept) => {
		// 	// dispatch(patientActions.updateCallingState(false));
		// 	setCalling(false);
		// 	const acceptBody = JSON.parse(accept.body);
		// 	const rejectedBy = JSON.parse(acceptBody.rejectedBy);
		// 	console.log(rejectedBy.message);
		// 	const variant = "error"
		// 	enqueueSnackbar(rejectedBy.message, { variant });
		// })

		// console.log("consult: ", consult);

		// stompClient.current.send("/app/call", {}, JSON.stringify({
		// 	"callTo": JSON.stringify({ "doctorName": doctorName, "remoteId": doctorId.toString() }),
		// 	"callFrom": JSON.stringify({ "patientName": patientName, "localId": localID.toString() }),
		// 	// "consultState": JSON.stringify(consult)
		// }));
		// })
	};

	const createWebSocket = () => {
		const newSocket = new WebSocket("wss://localhost:9090/doctor-status");
		// console.log(newSocket);
		newSocket.onopen = () => {
			console.log("WebSocket connection established");
		};

		console.log(state.consult);

		setSocket(newSocket);
		document.getElementById("active-docs").style.display = "block";
	};

	useEffect(() => {
		if (socket) {
			socket.onmessage = (event) => {
				console.log(mainSymptom, "mainSymptom");
				const message = JSON.parse(event.data);
				const newMessage = message.filter((msg) => msg.specialization === mainSymptom)
				setMessages(newMessage);
				console.log(message, "message");
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
								<TableCell align="right">Specialization</TableCell>
								<TableCell align="right">Status</TableCell>
								<TableCell align="right">Consult Doctor</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{messages.map((message, index) => (
								<TableRow
									key={index}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scopename="row">
										{message.firstName}
									</TableCell>
									<TableCell align="right">{message.hospitalName}</TableCell>
									<TableCell align="right">{message.specialization}</TableCell>
									<TableCell align="right">
										{message.status === "active" ? (
											<>
											<div className="ring-container">
												<div className="ringring1"></div>
												<div className="circle1"></div>
											</div>
											active
											</>
										) : message.status === "busy" ? (
											<>
											<div className="ring-container">
												<div className="ringring2"></div>
												<div className="circle2"></div>
											</div>
											Busy
											</>
										) : message.status === "offline" ? (
											<>
											<div className="ring-container">
												<div className="ringring3"></div>
												<div className="circle3"></div>
											</div>
											offline
											</>
										) : (
											<>
											<div className="ring-container">
												<div className="ringring4"></div>
												<div className="circle4"></div>
											</div>
											On Call
											</>
										)}
									</TableCell>
									<TableCell align="right">
										{message.status === "active" || message.status === "onCall" ? <Link
											onClick={() => {
												handleCall(message.doctorId, message.firstName);
											}}
										>
											Call
										</Link> : "Can't call" }
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			{patientState.calling ? <CallLoader /> : <></>}
		</Box>
	);
}

export default PatientConsultation;
