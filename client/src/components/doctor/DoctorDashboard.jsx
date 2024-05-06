import React, { useEffect, useState, useRef } from "react";
import { Banner, Graph, SmallCalender, PrescriptionForm } from "../index";
import { Box, Button } from "@mui/material";
import patient from "../../assets/patient.png";
import appointments from "../../assets/appointments.png";
import prescription from "../../assets/prescription.png";
import styles from "./DoctorDashboard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { acceptCall, doctorActions } from "../../Store/doctorSlice";
import IncomingCall from "./IncomingCall";
import CalendarModal from "../Patient/CalendarModal";
import { makeConnection } from "../../Store/consultSlice";
import { handleGetAllPatients } from "../../Store/doctorSlice";
import { useStompClient } from "../common/WebSocketContext";


function DoctorDashboard() {

	
	// const [incomingCall, setIncomingCall] = useState(false);
	// location.reload();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.doctor);
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


			// return () => {
			// 	console.log("cleanup");
			// 	subscription.unsubscribe();
			// };
		}
	}, [stompClient]);

	useEffect(() => {
		dispatch(handleGetAllPatients())
	}, []);



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
							<Box sx = {{cursor: "pointer"}} className={styles.btn_div} onClick={handleShow}>
								Template &nbsp;
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
								Total Appointments
							</Box>
							<Box className={styles.btn_div}>{state.totalAppointments}</Box>
						</Box>
					</Box>

					<Box className={styles.graph}>
						<Graph data={state.eachDayCounts} />
					</Box>
				</Box>
				<Box className={styles.side_box}>
					<Box className={`${styles.side_divs} ${styles.calender}`}>
						<SmallCalender />
					</Box>
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
				{/* <Button variant="success" onClick={handleJoinCall}>Join Call</Button> */}
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
