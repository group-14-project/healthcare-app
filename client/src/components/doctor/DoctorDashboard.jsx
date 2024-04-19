import React, { useEffect, useState, useRef } from "react";
import { Banner, Graph } from "../index";
import { Box } from "@mui/material";
import patient from "../../assets/patient.png";
import appointments from "../../assets/appointments.png";
import next_app from "../../assets/next_app.png";
import prescription from "../../assets/prescription.png";
import styles from "./DoctorDashboard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Button from "@mui/material/Button";
import { store } from "../../Store/store";
import { useDispatch, useSelector, useStore } from "react-redux";
import { doctorActions, handleGetAllPatients } from "../../Store/doctorSlice";
import IncomingCall from "./IncomingCall";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";;
import listPlugin from '@fullcalendar/list';
// import styled from "@emotion/styled";
import CalendarModal from "../Patient/CalendarModal";
import { consultActions } from "../../Store/consultSlice";
import { makeConnection } from "../../Store/consultSlice";

const events = [
	{ id: 1, title: 'Appointment-1', start: "2024-04-23 14:30", allDay: false },
	{ id: 2, title: 'Appointment-2', start: "2024-04-22 12:30", allDay: false },
	{ id: 3, title: 'Appointment-3', start: "2024-04-30 11:00", allDay: false },
	{ id: 4, title: 'Appointment-4', start: "2024-04-25 16:15", allDay: false }
]

function DoctorDashboard() {
	const [incomingCall, setIncomingCall] = useState(false);
	// const location = useLocation();
	// const d = location.state.doctor;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	var category = "health";
	let stompClient = useRef();
	const [remoteID, setRemoteId] = useState("");
	const [localID, setLocalID] = useState(state.doctor.doctorId);
	const [roomID, setRoomID] = useState("");
	const [patientName, setPatientName] = useState("");

	const [modalOpen, setModalOpen] = useState(false);
	const [consultState, setConsultState] = useState({});

	useEffect(() => {
		dispatch(handleGetAllPatients())
	}, []);

	const handleDateClick = () => {
		setModalOpen((prev) => !prev);
	}

	useEffect(() => {
		localStorage.setItem("doctorId", state.doctor.doctorId);
		localStorage.setItem("doctorName", state.doctor.firstName);
	}, []);

	const handleAcceptCall = async () => {

		console.log("consult state: ", consultState);


		const res = dispatch(makeConnection(consultState));


		const newUuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
			/[018]/g,
			(c) =>
				(
					c ^
					(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
				).toString(16)
		);

		console.log(newUuid);

		const doctorName = state.doctor.firstName;

		setRoomID(newUuid);

		const acceptedBy = { name: doctorName, callee: localID };
		const initiatedBy = { name: patientName, caller: remoteID };

		stompClient.current.send(
			"/app/acceptCall",
			{},
			JSON.stringify({
				roomID: newUuid,
				acceptedBy: JSON.stringify(acceptedBy),
				initiatedBy: JSON.stringify(initiatedBy),
			})
		);

		navigate(`/room/${newUuid}`, { state: { acceptedBy, initiatedBy } });
	};

	useEffect(() => {
		var conn = new SockJS("http://localhost:9090/socket");
		stompClient.current = new Stomp.over(conn);

		stompClient.current.connect({}, (frame) => {
			stompClient.current.subscribe(
				"/user/" + localID + "/topic/call",
				(call) => {
					console.log("call from: " + call.body);
					// console.log("remote id: " + call.body);
					const userData = JSON.parse(call.body);
					console.log(userData);
					// console.log("consult state in doc dashboard: ", state.consult);
					const consultationData = JSON.parse(userData["consultState"]);
					const callFrom = JSON.parse(userData["callFrom"]);
					console.log(consultationData);
					console.log(callFrom.localId)
					setConsultState(consultationData);

					setRemoteId(callFrom.localId);
					setPatientName(
						callFrom.patientName
					);

					setIncomingCall(true);
				}
			);
		});
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
				console.log("Quote Fetched:", response.data[0]);
				const quoteData = (response.data[0]);
				console.log(quoteData)
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
					<Banner doctor={state.doctor} />
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
							<Box className={styles.btn_div}>{state.doctor.totalPatients}</Box>
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
							<Box className={styles.btn_div}>
								Template &nbsp;
								<span className={styles.template_icon}>
									<i className="fa-solid fa-circle-arrow-right"></i>
								</span>
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
								{state.doctor.totalAppointments}
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
						<Graph data={state.doctor.eachDayCounts} />
					</Box>
				</Box>
				<Box className={styles.side_box}>
					{/* <Box className={`${styles.side_divs} ${styles.calender}`}>Calender</Box> */}
					<Box sx={{
						marginBottom: "40px"
					}}>
						<FullCalendar
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
							dateClick={handleDateClick}

						/>
					</Box>
					<Box
						className={`${styles.appointments_container} ${styles.side_divs}`}
					>
						<h4 className={styles.appointments_title}>Recent Appointments</h4>
						<ul className={styles.appointments_list}>
							{state.doctor.pastAppointments.map((appointment, index) => (
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

					<Box className={`${styles.quote_box} ${styles.side_divs} card text-white height`} style={{ backgroundColor: "#009AAA" }}>

						<div className="card-body " style={{ height: "100%", width: "100%" }}>
							<i className="fas fa-quote-left fa-2x mb-4"></i>

							<p className={`lead ${styles.lead}`}>
								{state.doctor.quote.quote}
							</p>

							<hr />

							<div className="d-flex justify-content-between">
								<p className="mb-0">{state.doctor.quote.author}</p>
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
			</Box>

			{incomingCall ? (
				<IncomingCall utils={handleAcceptCall} vars={patientName} />
			) : (
				<></>
			)}
			{modalOpen && <CalendarModal onClose={() => setModalOpen(false)} />}
			
		</>
	);
}

export default DoctorDashboard;
