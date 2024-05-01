import React, { useEffect, useState, useRef } from "react";
import { Banner, Graph, SmallCalender, PrescriptionForm } from "../index";
import { Box, Button } from "@mui/material";
import patient from "../../assets/patient.png";
import appointments from "../../assets/appointments.png";
import next_app from "../../assets/next_app.png";
import prescription from "../../assets/prescription.png";
import styles from "./DoctorDashboard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector, useStore } from "react-redux";
import { acceptCall, doctorActions, handleGetAllPatients } from "../../Store/doctorSlice";
import { fetchConsents, seniorDoctorActions } from "../../Store/seniorDoctorSlice";
import IncomingCall from "./IncomingCall";
import CalendarModal from "../Patient/CalendarModal";
import { makeConnection } from "../../Store/consultSlice";
import { store } from "../../Store/store";
// import getstomClient from "../Patient/MySocket";
// import stompClient from "../Patient/stomVariable"



import { useStompClient } from "../common/WebSocketContext";
// import stompClient from "../Patient/MySocket";

let peerConnections = {};
function DoctorDashboard() {

	var configuration = {
		iceServers: [{
			urls: [
				"stun:stun.l.google.com:19302",
				"stun:global.stun.twilio.com:3478",
			]
		}]
	};
	// const [incomingCall, setIncomingCall] = useState(false);
	// location.reload();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.doctor);
	const seniorDoctorState = useSelector((state) => state.seniorDoctor);
	var category = "health";
	const stompClient = useStompClient();
	// const stompClient = useRef();
	// stompClient.current = useSelector(state => state.doctor.stompRef);
	const [remoteID, setRemoteId] = useState("");
	const [localID, setLocalID] = useState(state.doctorId);
	const [roomID, setRoomID] = useState("");
	// const [patientName, setPatientName] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [consultState, setConsultState] = useState({});
	const isFirstRender = useRef(true)

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);


	let patientRef = useRef();
	let doctorRef = useRef();
	let ownRef = useRef();

	const handleDateClick = () => {
		setModalOpen((prev) => !prev);
	};

	// const stompClient = useRef();

	const patientName = useSelector(state => state.doctor.patientName);


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
			if (state.doctorId != 8) {


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
			}



			// return () => {
			// 	console.log("cleanup");
			// 	subscription.unsubscribe();
			// };
		}
	}, [stompClient]);

	const handleAcceptCall = async () => {

		const obj = dispatch(acceptCall(state.firstName, state.patientName, state.remoteId, state.doctorId));


		navigate(`/room/${obj.roomId}`, { state: obj.data });
	};

	const handleRejectCall = () => {
		// setIncomingCall(false);
		dispatch(doctorActions.updateIncomingCall(false));
		const rejectedBy = {
			name: state.firstName,
			callee: localID,
			message: "Doctor is Busy right now",
		};
		const initiatedBy = { name: patientName, caller: remoteID };

		stompClient.current.send(
			"/app/rejectCall",
			{},
			JSON.stringify({
				rejectedBy: JSON.stringify(rejectedBy),
				initiatedBy: JSON.stringify(initiatedBy),
			})
		);
	};




	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api.api-ninjas.com/v1/quotes?category=${category}`,
					{
						headers: {
							"X-Api-Key": `Y+pN8GpN+SFL+5UL96rzFw==OsFELYxpBagii5Aa`,
						},
					}
				);
				const quoteData = response.data[0];
				dispatch(doctorActions.updateQuote(quoteData));
			} catch (error) {
				console.error("Error fetching quote", error);
			}
		};
		fetchData();
	}, []);

	const doctorConnect = async (doctorId) => {
		peerConnections[doctorId] = new RTCPeerConnection(configuration);

		const pc = peerConnections[doctorId];

		console.log(pc);

		await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true
		}).then((stream) => {
			ownRef.current.srcObject = stream;
			// setLocalStream(stream);
			stream.getTracks().forEach(async (track) => {
				await pc.addTrack(track, stream);
				// track.enabled = true;
			});
		})


		pc.onnegotiationneeded = async (event) => {
			await pc.setLocalDescription(await pc.createOffer());
			console.log("negotiation setting description: ", pc.localDescription);
			stompClient.send("/app/seniorOffer", {}, JSON.stringify({
				"toUser": doctorId,
				"fromUser": localID.toString(),
				"offer": JSON.stringify(pc.localDescription)
			}))
		}


		pc.onicecandidate = (event) => {
			console.log(event);
			if (event.candidate) {
				stompClient.send("/app/seniorCandidate", {}, JSON.stringify({
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
		}).then((stream) => {
			ownRef.current.srcObject = stream;
			// setLocalStream(stream);
			stream.getTracks().forEach(async (track) => {
				await pc.addTrack(track, stream);
				// track.enabled = true;
			});
		})

		console.log(pc);


		pc.onnegotiationneeded = async (event) => {
			await pc.setLocalDescription(await pc.createOffer());
			console.log("negotiation setting description: ", pc.localDescription);
			stompClient.send("/app/seniorOffer", {}, JSON.stringify({
				"toUser": patientId,
				"fromUser": localID.toString(),
				"offer": JSON.stringify(pc.localDescription)
			}))
		}


		pc.onicecandidate = (event) => {
			console.log(event);
			if (event.candidate) {
				stompClient.send("/app/seniorCandidate", {}, JSON.stringify({
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


	const handleJoinCall = async (e) => {



		const patientId = "8";
		const doctorId = "10";
		await stompClient.send("/app/seniorJoin", {}, JSON.stringify({
			"toUser": patientId.toString(),
			"fromUser": localID.toString(),
		}));

		await stompClient.send("/app/seniorJoin", {}, JSON.stringify({
			"toUser": doctorId.toString(),
			"fromUser": localID.toString(),
		}));

		e.preventDefault();

		await doctorConnect(patientId);

		await patientConnect(doctorId);

	}



	return (
		<>
			<Box
				className={styles.outer_div}
				sx={{ display: "flex", marginLeft: "60px" }}
			>
				<Box className={styles.main_box} sx={{ width: "66.6%" }}>
					<Banner doctor={state} />
					<Box className={styles.quick_actions}>
						<Box className={`${styles.action_btn} ${styles.action_btn_1}`}>
							<Box className={styles.patient_icon}>
								<img src={patient} alt="patient" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Total Patients
							</Box>
							<Box className={styles.btn_div}>{state.totalPatients}</Box>
						</Box>
						<Box className={`${styles.action_btn} ${styles.action_btn_2}`}>
							<Box className={styles.patient_icon}>
								<img src={prescription} alt="prescription" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Prescription
							</Box>
							<Box className={styles.btn_div} onClick={handleShow}>
								Template &nbsp;
								{/* <span className={styles.template_icon}>
									<i className="fa-solid fa-circle-arrow-right"></i>
								</span> */}
								<PrescriptionForm show={show} onHide={() => setShow(false)} />
							</Box>
						</Box>

						<Box className={`${styles.action_btn} ${styles.action_btn_3}`}>
							<Box className={styles.patient_icon}>
								<img src={appointments} alt="appointments" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Appointments
							</Box>
							<Box className={styles.quick_btn_font}>
								{state.totalAppointments}
							</Box>
						</Box>
						<Box className={`${styles.action_btn} ${styles.action_btn_4}`}>
							<Box className={styles.patient_icon}>
								<img src={next_app} alt="next_app" />
							</Box>
							<Box
								sx={{
									fontWeight: 600,
									marginBottom: "6px",
								}}
							>
								Clock
							</Box>
							<Box className={styles.btn_div}>Join Now</Box>
						</Box>
					</Box>

					<Box className={styles.graph}>
						<Graph data={state.eachDayCounts} />
					</Box>
					<Box>
						<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "20px" }}>
							<div style={{ margin: "10px" }}>
								<video ref={patientRef} autoPlay muted style={{ border: "2px solid grey", borderRadius: "30px" }} />
								{/* <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>{localName}(You)</div> */}
							</div>
							<div style={{ margin: "10px" }} >
								<video ref={doctorRef} autoPlay style={{ border: "2px solid grey", borderRadius: "30px", width: "100%", height: "100%" }} />
								{/* <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>{remoteName}</div> */}
							</div>

							<div  style={{ margin: "10px" }} >
								<video ref={ownRef} autoPlay style={{ border: "2px solid grey", borderRadius: "30px", width: "100%", height: "100%" }} />
								{/* <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>senior doctor</div> */}
							</div>

						</div>
					</Box>
				</Box>
				<Box className={styles.side_box}>
					<Box className={`${styles.side_divs} ${styles.calender}`}>
						<SmallCalender />
					</Box>
					{/* <Box sx={{
						marginBottom: "40px"
					}}>
						{/* <FullCalendar
							schedulerLicenseKey="GPL-My-Project-Is-Open-Source"

							// ref={calendarComponentRef}
							initialView='dayGridMonth'
							displayEventTime={true}
							headerToolbar={{
								left: "prev,next,today",
								center: "title",
								right: "dayGridMonth"
							}}
							selectable={true}
							plugins={[
								dayGridPlugin,
								interactionPlugin,
								timeGridPlugin,
								listPlugin
							]}
							eventClick={(event) => { console.log(event.event.id) }}
							events={events}
							contentHeight="auto"
							themeSystem="standard"
							// event
							// eventContent={(info) => <EventItem info={info} />}
							selectOverlap={false}
							eventOverlap={false}
							dateClick={handleDateClick} */}

					{/* /> 
						
					</Box> */}
					<Box
						className={`${styles.appointments_container} ${styles.side_divs}`}
					>
						<h4 className={styles.appointments_title}>Recent Appointments</h4>
						<ul className={styles.appointments_list}>
							{state.pastAppointments.map((appointment, index) => (
								<li key={index} className={styles.appointment_item}>
									<div className={styles.patient_name}>
										{appointment.patientFirstName}&nbsp;
										{appointment.patientLastName}
									</div>
									<div className={styles.appointment_date}>
										{appointment.appointmentDateAndTime.split("T")[0]}
									</div>
								</li>
							))}
						</ul>
					</Box>

					<Box
						className={`${styles.quote_box} ${styles.side_divs} card text-white height`}
						style={{ backgroundColor: "#009AAA" }}
					>
						<div
							className="card-body "
							style={{ height: "100%", width: "100%" }}
						>
							<i className="fas fa-quote-left fa-2x mb-4"></i>

							<p className={`lead ${styles.lead}`}>{state.quote.quote}</p>

							<hr />

							<div className="d-flex justify-content-between">
								<p className="mb-0">{state.quote.author}</p>
								<h6 className="mb-0">
									<span
										className="badge rounded-pill"
										style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
									>
										876
									</span>{" "}
									<i className="fas fa-heart ms-2"></i>
								</h6>
							</div>
						</div>
					</Box>
				</Box>
				<Button variant="success" onClick={handleJoinCall}>Join Call</Button>
			</Box>

			{state.incomingCall ? (
				<IncomingCall />
			) : (
				<></>
			)}
			{modalOpen && <CalendarModal onClose={() => setModalOpen(false)} />}
		</>
	);
}

export default DoctorDashboard;
