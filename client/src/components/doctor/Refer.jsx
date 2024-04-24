import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	handlehospitalAndSpecializationAndDoctor,
	consentRegistration,
	handleGetAllPatients,
} from "../../Store/doctorSlice";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

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

function Refer() {
	const patientList = useSelector((state) => state.doctor.AllpatientsList);
	const [hospitalName, setHospitalName] = useState("");
	const [specializationName, setSpecialization] = useState("");
	const [doctor, setDoctor] = useState("");
	const dispatch = useDispatch();
	const hospitalList = useSelector(
		(state) => state.doctor.hospitalAndSpecializationAndDoctor
	);

	useEffect(() => {
		dispatch(handlehospitalAndSpecializationAndDoctor());
	}, []);

	const handleConsentRegisteration = (e, patient) => {
		e.preventDefault();
		const data = {
			patientEmail: patient,
			newDoctorEmail: doctor,
		};
		console.log(data);
		// dispatch(handleConsentRegisteration(data));
		dispatch(consentRegistration(data));
	};
	useEffect(() => {
		dispatch(handleGetAllPatients());
	}, []);
	return (
		<Box sx={{ display: "flex", marginLeft: "65px" }}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center">Patient Name</StyledTableCell>
							<StyledTableCell align="center">Hospital</StyledTableCell>
							<StyledTableCell align="center">Specialization</StyledTableCell>
							<StyledTableCell align="center">Doctor</StyledTableCell>
							<StyledTableCell align="center">
								Share &nbsp; &nbsp;
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patientList.map((patient, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell align="center" component="th" scope="row">
									{patient.firstName} {patient.lastName}
								</StyledTableCell>
								<StyledTableCell align="center">
									{/* <select
										id="hospital"
										name="hospital"
										onChange={(e) => setHospitalName(e.target.value)}
									>
										<option value="" disabled selected>
											Choose Hospital
										</option>
										{hospitalList.map((hospital, index) => (
											<option value={hospital.hospital} key={index}>
												{hospital.hospital}
											</option>
										))}
									</select> */}
									<FormControl sx={{ m: 1, width: 180 }}>
										<InputLabel id="demo-multiple-name-label">
											Choose Hospital
										</InputLabel>
										<Select
											labelId="demo-multiple-name-label"
											id="demo-multiple-name"
											onChange={(e) => setHospitalName(e.target.value)}
											input={<OutlinedInput label="Choose Hospital" />}
										>
											{hospitalList.map((hospital, index) => (
												<MenuItem key={index} value={hospital.hospital}>
													{hospital.hospital}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</StyledTableCell>
								<StyledTableCell align="center">
									{/* <select
										id="specialization"
										name="specialization"
										onChange={(e) => setSpecialization(e.target.value)}
									>
										<option value="" disabled selected>
											Choose Specialization
										</option>
										{hospitalList
											.find((hospital) => hospital.hospital === hospitalName)
											?.specializationNames.map((specialization, index) => (
												<option
													value={specialization.specialization}
													key={index}
												>
													{specialization.specialization}
												</option>
											))}
									</select> */}
									<FormControl sx={{ m: 1, width: 180 }}>
										<InputLabel id="demo-multiple-name-label">
											Choose Specialization
										</InputLabel>
										<Select
											labelId="demo-multiple-name-label"
											id="demo-multiple-name"
											onChange={(e) => setSpecialization(e.target.value)}
											input={<OutlinedInput label="Choose Specialization" />}
										>
											{hospitalList
												.find((hospital) => hospital.hospital === hospitalName)
												?.specializationNames.map((specialization, index) => (
													<MenuItem
														key={index}
														value={specialization.specialization}
													>
														{specialization.specialization}
													</MenuItem>
												))}
										</Select>
									</FormControl>
								</StyledTableCell>
								<StyledTableCell align="center">
									{/* <select
										id="doctor"
										name="doctor"
										onChange={(e) => setDoctor(e.target.value)}
									>
										<option value="" disabled selected>
											Choose Doctor
										</option>
										{hospitalList
											.find((hospital) => hospital.hospital === hospitalName)
											?.specializationNames.find(
												(specialization) =>
													specialization.specialization === specializationName
											)
											?.doctors.map((doctor, index) => (
												<option value={doctor.email} key={index}>
													{doctor.firstName} {doctor.lastName}
												</option>
											))}
									</select> */}
									<FormControl sx={{ m: 1, width: 180 }}>
										<InputLabel id="demo-multiple-name-label">
											Choose Doctor
										</InputLabel>
										<Select
											labelId="demo-multiple-name-label"
											id="demo-multiple-name"
											onChange={(e) => setDoctor(e.target.value)}
											input={<OutlinedInput label="Choose Doctor" />}
										>
											{hospitalList
												.find((hospital) => hospital.hospital === hospitalName)
												?.specializationNames.find(
													(specialization) =>
														specialization.specialization === specializationName
												)
												?.doctors.map((doctor, index) => (
													<MenuItem key={index} value={doctor.email}>
														{doctor.firstName} {doctor.lastName}
													</MenuItem>
												))}
										</Select>
									</FormControl>
								</StyledTableCell>
								<StyledTableCell align="center">
									<Button
										style={{ backgroundColor: "#00ACB9" }}
										variant="contained"
										onClick={(e) =>
											handleConsentRegisteration(e, patient.email)
										}
									>
										Share
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default Refer;
