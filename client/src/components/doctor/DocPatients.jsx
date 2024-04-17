import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./DocPatients.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { handleGetAllPatients } from "../../Store/doctorSlice";
import { useSelector, useDispatch } from "react-redux";
import {Prescription} from "../index";

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
	// console.log("PM",props);
	return (
		<Modal
		{...props}
			size="lg"
			// show={lgShow}
			// onHide={() => setLgShow(false)}
			aria-labelledby="example-modal-sizes-title-lg"
			sx = {{width:"100%"}}
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-lg">
					Prescription
				</Modal.Title>
			</Modal.Header>
			<Modal.Body><Prescription props = {props} /></Modal.Body>
		</Modal>
	);
}

function AppointmentsModal(props) {
	const AppointmentDetails = props.patientDetails;
	const [lgShow, setLgShow] = useState(false);
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
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
								<StyledTableCell align="right">Recording Link</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{AppointmentDetails.map((appointment, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell component="th" scope="row">
										{appointment.appointmentDateAndTime.split("T")[0]}
									</StyledTableCell>
									<StyledTableCell align="center">
										{appointment.mainSymptom}
									</StyledTableCell>
									<StyledTableCell align="right">
										<Button onClick={() => setLgShow(true)}>View Prescription</Button>
										<PrescriptionModal
											show={lgShow}
											onHide={() => setLgShow(false)}
											appointment={appointment}
										/>
									</StyledTableCell>
									<StyledTableCell align="right">Link</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
function DocPatients() {
	const [modalShow, setModalShow] = useState(false);
	const dispatch = useDispatch();
	const pastAppointments = useSelector(
		(state) => state.doctor.pastAppointments
	);
	const [patientDetails, setPatientDetails] = useState([]);
	useEffect(() => {
		dispatch(handleGetAllPatients());
	}, []);
	const patientList = useSelector((state) => state.doctor.AllpatientsList);
	const handleViewDetails = (patientEmail) => {
		setModalShow(true);
		const patientsDetailsRecv = pastAppointments.filter(
			(appointment) => appointment.patientEmail === patientEmail
		);
		setPatientDetails(patientsDetailsRecv);
	};

	return (
		<Box sx={{ display: "flex", marginLeft: "65px" }}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Patient Name</StyledTableCell>
							<StyledTableCell align="center">Last Visit</StyledTableCell>
							<StyledTableCell align="right">View Details</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patientList.map((patient, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component="th" scope="row">
									{patient.firstName + " " + patient.lastName}
								</StyledTableCell>
								<StyledTableCell align="center">
									{patient.date.split("T")[0]}
								</StyledTableCell>
								<StyledTableCell align="right">
									<Button
										variant="primary"
										onClick={() => handleViewDetails(patient.email)}
									>
										View Details
									</Button>
									<AppointmentsModal
										show={modalShow}
										onHide={() => setModalShow(false)}
										patientDetails={patientDetails}
									/>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default DocPatients;
