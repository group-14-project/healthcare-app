import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useStompClient } from "../common/WebSocketContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetCookie } from "../../Store/loginSlice";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
});


const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#3ec7d1",
		color: theme.palette.common.white,
		fontSize: 16,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

let peerConnections = {};
// let localStream=null;
const handleCallJoin = () => {
	// handle call join

}

function OnGoingCalls() {

	var configuration = {
		iceServers: [{
			urls: [
				"stun:stun.l.google.com:19302",
				"stun:global.stun.twilio.com:3478",
			]
		}]
	};

	const dispatch = useDispatch();
	const stompClient = useStompClient();
	const pendingConsents = useSelector((state) => state.seniorDoctor.pending);
	const state = useSelector((state) => state.doctor);
	const localID = state.doctorId;
	const patientRef = useRef();
	const doctorRef = useRef();
	const ownRef = useRef();
	const [localStreamP, setLocalStreamP] = useState();
	const [localStreamD, setLocalStreamD] = useState();
	const [calls, setCalls] = useState([]);
	const [audio, setAudio] = useState(false);
	const [video, setVideo] = useState(false);
	

	const navigate = useNavigate();

	useEffect(() => {

		const getCallDetails = async (id) => {
			const response = await axios.get(
				`https://localhost:9090/getCallDetails`, {
				headers: {
					Authorization: localStorage.getItem("token"),
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"Content-Type": "application/json",
				},
			}
			);
			return response;
		};


		const fetchData = async () => {
			try {
				const response = await getCallDetails();
				console.log("calls fetched", response.data);
				setCalls(response.data);
				return response.data;
			} catch (error) {
				console.error("Error getting calls", error);
				// notyf.error("Error fetching calls");
			}
		}


		fetchData();


	}, [])


	useEffect(() => {
		if (stompClient) {

			stompClient.subscribe("/user/" + localID + "/topic/call", (call) => {
				// console.log('Received message:', message.body);
				console.log("call from: " + call.body);
				// console.log("remote id: " + call.body);
				const userData = JSON.parse(call.body);
				// console.log(userData);
				// // console.log("consult state in doc dashboard: ", state.consult);
				// const consultationData = JSON.parse(userData["consultState"]);
				const callFrom = JSON.parse(userData["callFrom"]);
				// console.log(consultationData);
				// console.log(callFrom.localId);
				// setConsultState(consultationData);

				dispatch(doctorActions.updateRemoteId(callFrom.localId));

				dispatch(doctorActions.updatePatientName(callFrom.patientName))

				dispatch(doctorActions.updateIncomingCall(true));
			});

			// if()
			// if (state.doctorId != 8) {


			stompClient.subscribe("/user/" + localID + "/topic/seniorOffer", async (offer) => {

				// peerConnection1.current = new RTCPeerConnection(configuration);

				console.log("offer: ", JSON.parse(offer.body));
				const offerData = JSON.parse(offer.body);
				// if (peerConnection.current.signalingState !== "stable") {
				await peerConnections[offerData.fromUser].setRemoteDescription(JSON.parse(offerData.offer));

				console.log("setting remote description: ", peerConnections[offerData.fromUser].remoteDescription);

				await peerConnections[offerData.fromUser].setLocalDescription(await peerConnections[offerData.fromUser].createAnswer());
				console.log("setting description: ", peerConnections[offerData.fromUser].localDescription);
				await stompClient.send("/app/answer", {}, JSON.stringify({
					"toUser": offerData.fromUser.toString(),
					"fromUser": offerData.toUser.toString(),
					"answer": JSON.stringify(peerConnections[offerData.fromUser].localDescription)
				}));

			})

			stompClient.subscribe("/user/" + localID + "/topic/seniorCandidate", async (answer) => {
				// console.log("candidate: ", JSON.parse(answer.body));
				const candidateData = JSON.parse(answer.body);

				console.log("candidate: ", candidateData);

				const candidate = JSON.parse(candidateData.candidate);
				console.log(candidate);
				console.log("remote description: ", peerConnections[candidateData.fromUser].remoteDescription);
				console.log("local description: ", peerConnections[candidateData.fromUser].localDescription);
				// if (candidate && peerConnection.current && peerConnection.current.remoteDescription)
				await peerConnections[candidateData.fromUser].addIceCandidate(candidate);

			})


			stompClient.subscribe("/user/" + localID + "/topic/seniorAnswer", async (answer) => {

				console.log("peer connections: ", peerConnections);

				console.log("negotiation answer: ", answer.body);

				const answerData = JSON.parse(answer.body);
				await peerConnections[answerData.fromUser].setRemoteDescription(JSON.parse(answerData.answer));
				console.log("negotiation remote description: ", peerConnections[answerData.fromUser].remoteDescription);

			});
			// }



			// return () => {
			// 	console.log("cleanup");
			// 	subscription.unsubscribe();
			// };
		}
	}, [stompClient]);


	



	const doctorConnect = async (doctorId) => {
		peerConnections[doctorId] = new RTCPeerConnection(configuration);

		const pc = peerConnections[doctorId];

		console.log(pc);

		await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true
		}).then((stream) => {
			ownRef.current.srcObject = stream;
			setLocalStreamD(stream);
			stream.getTracks().forEach(async (track) => {
				await pc.addTrack(track, stream);
				// track.enabled = true;
			});
		});
		
		
		pc.onnegotiationneeded = async (event) => {
			await pc.setLocalDescription(await pc.createOffer());
			console.log("negotiation setting description: ", pc.localDescription);
			await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
				"toUser": doctorId,
				"fromUser": localID.toString(),
				"offer": JSON.stringify(pc.localDescription)
			}))
		}


		pc.onicecandidate = async (event) => {
			console.log(event);
			if (event.candidate) {
				await stompClient.send("/app/seniorCandidate", {}, JSON.stringify({
					"toUser": doctorId,
					"fromUser": localID.toString(),
					"candidate": JSON.stringify(event.candidate)
				}))
			}
		}

		pc.ontrack = (event) => {
			console.log("remote streams: ", event);
			doctorRef.current.srcObject = event.streams[0];
			// setRemoteStream(event.streams);
		}



		await pc.setLocalDescription(await pc.createOffer());
		// console.log("setting description: ", description);
		await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
			"toUser": doctorId.toString(),
			"fromUser": localID.toString(),
			"offer": JSON.stringify(pc.localDescription)
		}));

	}
	
	const patientConnect = async (patientId) => {


		peerConnections[patientId] = new RTCPeerConnection(configuration);

		const pc = peerConnections[patientId];

		await navigator.mediaDevices.getUserMedia({
				video: true,
			audio: true
		}).then(async (stream) => {
			ownRef.current.srcObject = stream;
			setLocalStreamP(stream);
			stream.getTracks().forEach(async (track) => {
				await pc.addTrack(track, stream);
				// track.enabled = true;
			});
		})

		
		console.log(pc);
		

		pc.onnegotiationneeded = async (event) => {
			await pc.setLocalDescription(await pc.createOffer());
			console.log("negotiation setting description: ", pc.localDescription);
			await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
				"toUser": patientId,
				"fromUser": localID.toString(),
				"offer": JSON.stringify(pc.localDescription)
			}))
		}


		pc.onicecandidate = async (event) => {
			console.log(event);
			if (event.candidate) {
				await stompClient.send("/app/seniorCandidate", {}, JSON.stringify({
					"toUser": patientId,
					"fromUser": localID.toString(),
					"candidate": JSON.stringify(event.candidate)
				}))
			}
		}
		
		pc.ontrack = (event) => {
			console.log("remote streams: ", event);
			patientRef.current.srcObject = event.streams[0];
			// setRemoteStream(event.streams);
		}
		
		
		await pc.setLocalDescription(await pc.createOffer());
		// console.log("setting description: ", description);
		await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
			"toUser": patientId.toString(),
			"fromUser": localID.toString(),
			"offer": JSON.stringify(pc.localDescription)
		}));
		
	}
	

	const handleJoinCall = async (e, call) => {
		e.preventDefault();

		navigate("/call", {state:call});

		// const patientId = call.patientId.toString();
		// const doctorId = call.doctorId.toString();
		// await stompClient.send("/app/seniorJoin", {}, JSON.stringify({
		// 	"toUser": patientId.toString(),
		// 	"fromUser": localID.toString(),
		// }));

		// await stompClient.send("/app/seniorJoin", {}, JSON.stringify({
		// 	"toUser": doctorId.toString(),
		// 	"fromUser": localID.toString(),
		// }));


		// await doctorConnect(doctorId);

		// await patientConnect(patientId);

	}


	const handleVoiceToggle = async (e) => {
		// console.log(localStream);
		const audioTrackP = await localStreamP.getTracks().find(track => track.kind === 'audio');
		const audioTrackD = await localStreamD.getTracks().find(track => track.kind === 'audio');
		// console.log(audioTrack);
		if (audioTrackP.enabled) {
			audioTrackP.enabled = false;
			setAudio(false);
		}
		else {
			audioTrackP.enabled = true;
			setAudio(true);
		}
		if (audioTrackD.enabled) {
			audioTrackP.enabled = false;
			setAudio(false);
		}
		else {
			audioTrackD.enabled = true;
			setAudio(true);
		}
	}



	const handleVideoToggle = async (e) => {
		// console.log(localStream);
		const videoTrackP = await localStreamP.getTracks().find(track => track.kind === 'video');
		const videoTrackD = await localStreamD.getTracks().find(track => track.kind === 'video');
		// console.log(videoTrack);
		if (videoTrackP.enabled) {
			videoTrackP.enabled = false;
			setVideo(false);
		}
		else {
			videoTrackP.enabled = true;
			setVideo(true);
		}
		if (videoTrackD.enabled) {
			videoTrackD.enabled = false;
			setVideo(false);
		}
		else {
			videoTrackD.enabled = true;
			setVideo(true);
		}
	}



	return (
		<>
			<Box
				sx={{ display: "flex", flexDirection: "column", marginLeft: "65px" }}
			>
				{calls.length === 0 ? (
					<Box sx={{ margin: "auto" }}>No ongoing calls as of now</Box>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Patient Name</StyledTableCell>
									<StyledTableCell align="center">Doctor Name </StyledTableCell>
									<StyledTableCell align="center">Join Now</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{calls.map((call, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component="th" scope="row">
											{`${call.patientName}`}
										</StyledTableCell>
										<StyledTableCell align="center">{`${call.doctorName}`}</StyledTableCell>
										<StyledTableCell align="center">
											<Button
												variant="contained"
												color="success"
												style={{ marginRight: "15px" }}
												onClick={(e) => {
													handleJoinCall(e, call);
												}}
											>
												Join
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}

				<Box>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<IconButton onClick={handleVoiceToggle}>
							{
								audio
									?
									<MicIcon className='call_btn' sx={{ margin: "20px" }} />
									:
									<MicOffIcon className='call_btn' sx={{ margin: "20px" }} />
							}
						</IconButton>
						<IconButton onClick={handleVideoToggle}>
							{
								video
									?
									<VideocamIcon className='call_btn' sx={{ margin: "20px" }} />
									:
									<VideocamOffIcon className='call_btn' sx={{ margin: "20px" }} />
							}
						</IconButton>
						<IconButton>
							{
								<CallEndIcon className='call_btn' sx={{ margin: "20px" }} />
							}
						</IconButton>

					</div>
				</Box>
			</Box>
		</>
	);
}

export default OnGoingCalls;
