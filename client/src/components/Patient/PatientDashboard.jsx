import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/index";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import height from "../../assets/height.png";
import bloodType from "../../assets/blood-type.png";
import weight from "../../assets/weight.png";
import PatientTable from "./PatientTable";
import { store } from "../../Store/store";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import styled from "@emotion/styled";
import "./PatientDashboard.css";
import CalendarModal from "./CalendarModal";
import { patientActions } from "../../Store/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const events = [
	{ id: 1, title: "Appointment-1", start: "2024-04-23 14:30", allDay: false },
	{ id: 2, title: "Appointment-2", start: "2024-04-22 12:30", allDay: false },
	{ id: 3, title: "Appointment-3", start: "2024-04-30 11:00", allDay: false },
	{ id: 4, title: "Appointment-4", start: "2024-04-25 16:15", allDay: false },
];

const PatientDashboard = (props) => {
	// const state = store.getState().patient;
	const state = useSelector((state) => state);
	console.log("From patient dashboard", state);
	const heads = ["Date", "Doctor Name", "Symptom"];
	const [modalOpen, setModalOpen] = useState(false);
	var category = "health";

	const dispatch = useDispatch();

	const handleDateClick = () => {
		setModalOpen((prev) => (prev = true));
	};

	function renderEventContent(eventInfo) {
		// return (
		// 	<>
		// 		<b>{eventInfo.timeText}</b>
		// 		<i>{eventInfo.event.title}</i>
		// 	</>
		// )

		console.log(eventInfo);
	}

	useEffect(() => {
		console.log("hello");

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
				const quoteData = response.data[0];
				console.log(quoteData);
				dispatch(patientActions.updateQuote(quoteData));
			} catch (error) {
				console.error("Error fetching quote", error);
			}
		};
		fetchData();
	}, []);

	return (
		<Box
			sx={{ display: "flex", marginLeft: "65px", backgroundColor: "#F9F9F9" }}
		>
			<Box sx={{ flex: 2 }}>
				<Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-around",
							width: "80%",
							margin: "25px auto",
							padding: "40px",
							borderRadius: "10px",
							backgroundColor: "#fff",
							opacity: "0.9",
						}}
					>
						<VolunteerActivismIcon
							sx={{ fontSize: "5rem", color: "#3C9A8D" }}
						/>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Typography
								variant="h5"
								component="h2"
								sx={{ fontWeight: "900", color: "rgb(4 47 175)" }}
							>
								Greetings, {state.patient.firstName} {state.patient.lastName}!
							</Typography>
							<Typography
								variant="h6"
								component="h2"
								sx={{ marginTop: "10px", fontWeight: "900", color: "#888888" }}
							>
								How are you feeling today?
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							margin: "50px auto",
						}}
					>
						<Box
							sx={{
								backgroundColor: "#fff",
								padding: "20px 50px",
								borderRadius: "10px",
								textAlign: "center",
							}}
						>
							<Box>
								<img src={height} height="64px" width="64px" />
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="p" sx={{ marginTop: "10px" }}>
									Your Height
								</Typography>

								<Typography
									variant="p"
									sx={{
										backgroundColor: "#3c9a8d",
										padding: "5px 10px",
										marginTop: "10px",
										borderRadius: "5px",
									}}
								>
									{state.patient.height} cm
								</Typography>
							</Box>
						</Box>

						<Box
							sx={{
								backgroundColor: "#fff",
								padding: "20px 50px",
								borderRadius: "10px",
								textAlign: "center",
							}}
						>
							<Box>
								<img src={weight} height="64px" width="64px" />
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="p" sx={{ marginTop: "10px" }}>
									Your Weight
								</Typography>

								<Typography
									variant="p"
									sx={{
										backgroundColor: "#3c9a8d",
										padding: "5px 10px",
										marginTop: "10px",
										borderRadius: "5px",
									}}
								>
									{state.patient.weight} Kg
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								backgroundColor: "#fff",
								padding: "20px 50px",
								borderRadius: "10px",
								textAlign: "center",
							}}
						>
							<Box>
								<img src={bloodType} height="64px" width="64px" />
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="p" sx={{ marginTop: "10px" }}>
									Your Blood Group
								</Typography>

								<Typography
									variant="p"
									sx={{
										backgroundColor: "#3c9a8d",
										padding: "5px 10px",
										marginTop: "10px",
										borderRadius: "5px",
									}}
								>
									{state.patient.bloodGroup}
								</Typography>
							</Box>
						</Box>
					</Box>

					<Box sx={{ padding: "40px" }}>
						<PatientTable
							pastApp={state.patient.pastAppointments}
							heads={heads}
						/>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					flex: 1,
					backgroundColor: "white",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						padding: "30px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box
						sx={{
							marginBottom: "40px",
						}}
					>
						<FullCalendar
							schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
							// ref={calendarComponentRef}
							initialView="dayGridMonth"
							displayEventTime={true}
							headerToolbar={{
								left: "prev,next,today",
								center: "title",
								right: "dayGridMonth",
							}}
							selectable={true}
							plugins={[
								dayGridPlugin,
								interactionPlugin,
								timeGridPlugin,
								listPlugin,
							]}
							eventClick={(event) => {
								console.log(event.event.id);
							}}
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
						className="quote_box side_divs card text-white height"
						style={{ backgroundColor: "#009AAA", padding: "20px" }}
					>
						<div
							className="card_body "
							style={{ height: "100%", width: "100%" }}
						>
							<i className="fas fa-quote-left fa-2x mb-4"></i>

							<p className="lead">{state.patient.quote.quote}</p>

							<hr />

							<div className="d-flex justify-content-between">
								<p className="mb-0">{state.patient.quote.author}</p>
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
				{modalOpen && <CalendarModal onClose={() => setModalOpen(false)} />}
			</Box>
		</Box>
	);
};

export default PatientDashboard;
