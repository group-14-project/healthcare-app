import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
// import "./DocPatients.css";
import styles from "./DocPatients.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/logo_full_black.png";
import {
	handleGetAllPatients,
	handleGetPatientReport,
	handleGetPatientReports,
	handleRecommendedPatients,
	handleGetRecPatientReports,
	handleGetRecPatientReport,
} from "../../Store/doctorSlice";
import { useSelector, useDispatch } from "react-redux";
import { Prescription } from "../index";
import formatDate from "../../Utility Data/dateChangeFunc";
import IncomingCall from "./IncomingCall";

function separateString(originalString) {
	// Splitting the original string into an array based on '--'
	const parts = originalString.split("--");

	// If there's no '--' delimiter, return the original string as beforeDelimiter
	if (parts.length === 1) {
		return {
			beforeDelimiter: [originalString.trim()],
			afterDelimiter: "",
		};
	}

	// First part will contain the elements before '--', separated by new line
	const beforeDelimiterArray = parts[0].trim().split("\n");

	// Second part will be the string after '--'
	const afterDelimiterString = parts[1].trim();

	return {
		beforeDelimiter: beforeDelimiterArray,
		afterDelimiter: afterDelimiterString,
	};
}
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

function PrescriptionModal(props) {
	const [medArray, setMedArray] = useState([]);
	const [addComment, setAddComment] = useState("");
	console.log("props", props.appointment.prescription);
	// console.log("props",props.appointment.prescription)
	const doctorState = useSelector((state) => state.doctor);
	// console.log(doctorState);
	useEffect(() => {
		if (props.appointment.prescription !== null) {
			const { beforeDelimiter, afterDelimiter } = separateString(
				props.appointment.prescription
			);
			setMedArray(beforeDelimiter);
			setAddComment(afterDelimiter);
		}
	}, []);
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="example-modal-sizes-title-lg"
			sx={{ width: "100%" }}
		>
			<Modal.Header closeButton onClick={props.onHide}>
				<Modal.Title id="example-modal-sizes-title-lg">
					Prescription
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.main_box}>
					<div className={styles.header}>
						<div className={`${styles.header_divs} ${styles.logo}`}>
							<img src={logo} alt="Arogyashala" />
						</div>
						<div className={`${styles.header_divs} ${styles.doctor_details}`}>
							<h4>
								Dr. {doctorState.firstName} {doctorState.lastName}
							</h4>
							<h5>{doctorState.degree}</h5>
						</div>
					</div>
					<div className={styles.main_body}>
						<table className={styles.prescription_table}>
							<thead>
								<tr>
									<th>Medicine Name and Dosage</th>
								</tr>
							</thead>
							<tbody>
								{medArray.map((med, index) => (
									<tr key={index}>
										<td>{med}</td>
									</tr>
								))}
							</tbody>
						</table>
						<div>
							{addComment}
						</div>
					</div>
					<div className={styles.footer}>
						<Button variant="contained" color="success">
							Print
						</Button>
						<Button variant="contained" color="error" onClick={props.onHide}>
							Close
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

function AppointmentsModal(props) {
	const AppointmentDetails = props.patientdetails;
	console.log("appointDetials", AppointmentDetails);
	const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);
	const [lgShow, setLgShow] = useState(false);
	const handleClick = (index) =>{
		setLgShow(true);
		setSelectedAppointmentIndex(index)
	}
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton onClick={props.onHide}>
				<Modal.Title id="contained-modal-title-vcenter">
					Past Consultations
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Appoitment Date</StyledTableCell>
								<StyledTableCell align="center">Symptom</StyledTableCell>
								<StyledTableCell align="right">Prescription</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{AppointmentDetails.map((appointment, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell component="th" scope="row">
										{formatDate(
											appointment.appointmentDateAndTime.split("T")[0]
										)}
									</StyledTableCell>
									<StyledTableCell align="center">
										{appointment.mainSymptom}
									</StyledTableCell>
									<StyledTableCell align="right">
										<Button
											variant="contained"
											color="success"
											onClick={() => handleClick(index)}
											
										>
											View Prescription
										</Button>
										{selectedAppointmentIndex && <PrescriptionModal
											show={lgShow}
											onHide={() => setSelectedAppointmentIndex(null)}
											appointment={AppointmentDetails[selectedAppointmentIndex]}
										/>}
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="contained" color="error" onClick={props.onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
function ReportsModal(props) {
	const dispatch = useDispatch();
	const reports = props.reports;
	const [lgShow, setLgShow] = useState(false);
	const handleViewReport = (reportId, modalOpen, reportName) => {
		setLgShow(modalOpen);
		if (props.rec === "true") {
			dispatch(handleGetRecPatientReport(reportId, reportName));
		} else {
			dispatch(handleGetPatientReport(reportId, reportName));
		}
	};
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton onClick={props.onHide}>
				<Modal.Title id="contained-modal-title-vcenter">Reports</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Report Date</StyledTableCell>
								<StyledTableCell align="center">Report Name</StyledTableCell>
								<StyledTableCell align="right">View</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reports.length === 0 ? (
								<StyledTableRow>
									<StyledTableCell colSpan={3} align="center">
										No Reports Found
									</StyledTableCell>
								</StyledTableRow>
							) : (
								reports.map((report, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component="th" scope="row">
											{formatDate(report.localDateTime.split("T")[0])}
										</StyledTableCell>
										<StyledTableCell align="center">
											{report.reportName}
										</StyledTableCell>
										<StyledTableCell align="right">
											<Button
												variant="contained"
												color="success"
												onClick={() =>
													handleViewReport(report.id, true, report.reportName)
												}
											>
												View Report
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="contained" color="error" onClick={props.onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
function DocPatients() {
	const doctorState = useSelector((state) => state.doctor);
	const [appModalShow, setappModalShow] = useState(false);
	const [repModalShow, setrepModalShow] = useState(false);
	const [reports, setReports] = useState([]);
	const dispatch = useDispatch();
	const pastAppointments = useSelector(
		(state) => state.doctor.pastAppointments
	);
	const recommendedPatients = useSelector(
		(state) => state.doctor.recommendedPatients
	);
	const [patientDetails, setPatientDetails] = useState([]);

	const patientList = useSelector((state) => state.doctor.AllpatientsList);
	const handleViewDetails = (patientEmail) => {
		setappModalShow(true);
		const patientsDetailsRecv = pastAppointments.filter(
			(appointment) => appointment.patientEmail === patientEmail
		);
		setPatientDetails(patientsDetailsRecv);
	};
	const handleViewReports = async (patientEmail) => {
		setrepModalShow(true);
		const response = await dispatch(handleGetPatientReports(patientEmail));
		setReports(response);
	};
	const handleViewReportsRecommended = async (connectionId) => {
		setrepModalShow(true);
		const response = await dispatch(handleGetRecPatientReports(connectionId));
		setReports(response);
	};

	useEffect(() => {
		dispatch(handleGetAllPatients());
		dispatch(handleRecommendedPatients());
	}, []);

	return (
		<>
			<Box
				sx={{ display: "flex", marginLeft: "66px", flexDirection: "column" }}
			>
				<h1
					style={{ textAlign: "center", marginBottom: "3%", marginTop: "3%" }}
				>
					My Patients
				</h1>
				{patientList.length === 0 ? (
					<Box sx={{ margin: "auto" }}>
						You don't have any patients as of now
					</Box>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Patient Name</StyledTableCell>
									<StyledTableCell align="center">Last Visit</StyledTableCell>
									<StyledTableCell align="center">View Reports</StyledTableCell>
									<StyledTableCell align="center">View Details</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{patientList.map((patient, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component="th" scope="row">
											{patient.firstName + " " + patient.lastName}
										</StyledTableCell>
										<StyledTableCell align="center">
											{formatDate(patient.date.split("T")[0])}
										</StyledTableCell>
										<StyledTableCell align="center">
											<Button
												variant="contained"
												color="success"
												// style  ={{backgroundColor:"#1A5E20"}}
												onClick={() => handleViewReports(patient.email)}
											>
												View Reports
											</Button>
											<ReportsModal
												show={repModalShow}
												onHide={() => setrepModalShow(false)}
												patientdetails={patientDetails}
												reports={reports}
												rec={"false"}
											/>
										</StyledTableCell>
										<StyledTableCell align="center">
											<Button
												variant="contained"
												color="success"
												onClick={() => handleViewDetails(patient.email)}
											>
												View Details
											</Button>
											<AppointmentsModal
												show={appModalShow}
												onHide={() => setappModalShow(false)}
												patientdetails={patientDetails}
											/>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>

			<Box
				sx={{ display: "flex", marginLeft: "66px", flexDirection: "column" }}
			>
				<h1
					style={{ textAlign: "center", marginBottom: "3%", marginTop: "3%" }}
				>
					Recommended Patients
				</h1>
				{recommendedPatients.length === 0 ? (
					<Box sx={{ margin: "auto" }}>
						You don't have any patients recommended as of now
					</Box>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Patient Name</StyledTableCell>
									<StyledTableCell align="center">From Doctor</StyledTableCell>
									<StyledTableCell align="center">Date</StyledTableCell>
									<StyledTableCell align="center">View Reports</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{recommendedPatients.map((patient, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component="th" scope="row">
											{patient.patientFirstName + " " + patient.patientLastName}
										</StyledTableCell>
										<StyledTableCell align="center" component="th" scope="row">
											{patient.doctorFirstName + " " + patient.doctorLastName}
										</StyledTableCell>
										<StyledTableCell align="center">
											{formatDate(patient.localDate.split("T")[0])}
										</StyledTableCell>
										<StyledTableCell align="center">
											<Button
												variant="contained"
												color="success"
												onClick={() =>
													handleViewReportsRecommended(patient.consentId)
												}
											>
												View Reports
											</Button>
											<ReportsModal
												show={repModalShow}
												onHide={() => setrepModalShow(false)}
												patientdetails={patientDetails}
												reports={reports}
												rec={"true"}
											/>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
				{doctorState.incomingCall ? <IncomingCall /> : <></>}
			</Box>
		</>
	);
}

export default DocPatients;
