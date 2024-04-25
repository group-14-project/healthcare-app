import React, { useEffect, useState, useRef } from "react";
import { Banner, Graph, SmallCalender, PrescriptionForm } from "../index";
import { Box } from "@mui/material";
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
import { doctorActions, handleGetAllPatients } from "../../Store/doctorSlice";
import { fetchConsents, seniorDoctorActions } from "../../Store/seniorDoctorSlice";
import IncomingCall from "./IncomingCall";
import CalendarModal from "../Patient/CalendarModal";
import { makeConnection } from "../../Store/consultSlice";
import { store } from "../../Store/store";

function DoctorDashboard() {
	const [incomingCall, setIncomingCall] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.doctor);
	const seniorDoctorState = useSelector((state) => state.seniorDoctor);
	var category = "health";
	const stompClient = useSelector(state=>state.doctor.stompRef);
	const [remoteID, setRemoteId] = useState("");
	const [localID, setLocalID] = useState(state.doctorId);
	const [roomID, setRoomID] = useState("");
	const [patientName, setPatientName] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [consultState, setConsultState] = useState({});
	const isFirstRender = useRef(true)

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	
	const handleDateClick = () => {
		setModalOpen((prev) => !prev);
	};

	useEffect(() => {
		localStorage.setItem("doctorId", state.doctorId);
		localStorage.setItem("doctorName", state.firstName);
		console.log(state)
	}, []);

	const handleAcceptCall = async () => {
		console.log("consult state: ", consultState);
		const res = dispatch(makeConnection(consultState));

		console.log("make connection res: ", res);

		const newUuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
			/[018]/g,
			(c) =>
				(
					c ^
					(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
				).toString(16)
		);

		console.log(newUuid);

		const doctorName = state.firstName;

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

	const handleRejectCall = () => {
		setIncomingCall(false);
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

		
		if (isFirstRender.current) {
			isFirstRender.current = false; // it's no longer the first render
			return;
		}
		// var conn = new SockJS("http://localhost:9090/socket");
		// stompClient.current = new Stomp.over(conn);
		// console.log("fidbfisdbfidsbf");
		console.log("fijwdifbijf",stompClient);
		
		stompClient.connect({}, (frame) => {
			// console.log("inside connect")
			stompClient.subscribe(
				"/user/" + localID + "/topic/call",
				(call) => {
					console.log(call);
					console.log("call from: " + call.body);
					// console.log("remote id: " + call.body);
					const userData = JSON.parse(call.body);
					console.log(userData);
					// console.log("consult state in doc dashboard: ", state.consult);
					// const consultationData = JSON.parse(userData["consultState"]);
					// const callFrom = JSON.parse(userData["callFrom"]);
					// console.log(consultationData)/;
					// console.log(callFrom);
					// setConsultState(consultationData);

					setRemoteId(call.body);
					// setPatientName(callFrom.patientName);

					setIncomingCall(true);
				}
			);
		});
	}, [stompClient, state]);

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
			</Box>

			{incomingCall ? (
				<IncomingCall
					acceptUtil={handleAcceptCall}
					rejectUtil={handleRejectCall}
					vars={patientName}
				/>
			) : (
				<></>
			)}
			{modalOpen && <CalendarModal onClose={() => setModalOpen(false)} />}
		</>
	);
}

export default DoctorDashboard;
