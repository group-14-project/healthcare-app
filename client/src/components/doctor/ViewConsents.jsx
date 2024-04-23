import React, { useEffect } from "react";
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
import { fetchConsents } from "../../Store/seniorDoctorSlice";
import formatDate from "../../Utility Data/dateChangeFunc"

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

function ViewConsents() {

	const seniorDoctorConsents = useSelector(
		(state) => state.seniorDoctor.consents
	);

	const options = { month: 'long' };
	useEffect(() => {

		console.log("seniorDoctorConsents", seniorDoctorConsents)
	}, []);
	return (
		<>
			{
				seniorDoctorConsents.pendingConsents === undefined
					?
					<Box>
						You don't have any consents for approval as of now
					</Box>
					:
					<Box
						sx={{ display: "flex", flexDirection: "column", marginLeft: "65px" }}
					>
						<h1
							style={{ textAlign: "center", marginBottom: "3%", marginTop: "3%" }}
						>
							Pending Consents
						</h1>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 700 }} aria-label="customized table">
								<TableHead>
									<TableRow>
										<StyledTableCell>Patient Name</StyledTableCell>
										<StyledTableCell align="center">From Doctor </StyledTableCell>
										<StyledTableCell align="center">To Doctor </StyledTableCell>
										<StyledTableCell align="center">Hospital Name </StyledTableCell>
										<StyledTableCell align="center">
											Patient's Consent{" "}
										</StyledTableCell>
										<StyledTableCell align="center">Date</StyledTableCell>
										<StyledTableCell align="center">Take Action</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{seniorDoctorConsents.pendingConsents.map((consent, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell component="th" scope="row">
												{`${consent.patientFirstName} ${consent.patientLastName}`}
											</StyledTableCell>
											<StyledTableCell align="center">{`${consent.mainDoctorFirstName} ${consent.mainDoctorLastName}`}</StyledTableCell>
											<StyledTableCell align="center">{`${consent.newDoctorFirstName} ${consent.newDoctorLastName}`}</StyledTableCell>
											<StyledTableCell align="center">
												{consent.newDoctorHospitalName}
											</StyledTableCell>
											<StyledTableCell align="center">
												{consent.patientConsent === false ? (
													<span>Rejected</span>
												) : (
													<span>Approved</span>
												)}
											</StyledTableCell>
											<StyledTableCell align="center">
												{formatDate(consent.date)}
											</StyledTableCell>
											<StyledTableCell align="center">
												<Button
													variant="contained"
													color="success"
													style={{ marginRight: "15px" }}
												>
													Approve
												</Button>
												<Button variant="outlined" color="error">
													Reject
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
			}

			{
				seniorDoctorConsents.approvedConsents === undefined
					?
					<Box>You have not approved any consent as of now</Box>
					:
					<Box sx={{ display: "flex", flexDirection: "column", marginLeft: "65px" }}>
						<h1 style={{ textAlign: "center", marginBottom: "3%", marginTop: "7%" }}>Approved Consents</h1>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 700 }} aria-label="customized table">
								<TableHead>
									<TableRow>
										<StyledTableCell>Patient Name</StyledTableCell>
										<StyledTableCell align="center">From Doctor </StyledTableCell>
										<StyledTableCell align="center">To Doctor </StyledTableCell>
										<StyledTableCell align="center">Hospital Name </StyledTableCell>
										<StyledTableCell align="center">Patient's Consent </StyledTableCell>
										<StyledTableCell align="center">Date</StyledTableCell>
										{/* <StyledTableCell align="center">Take Action</StyledTableCell> */}
									</TableRow>
								</TableHead>
								<TableBody>
									{seniorDoctorConsents.approvedConsents.map((consent, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell component="th" scope="row">
												{`${consent.patientFirstName} ${consent.patientLastName}`}
											</StyledTableCell>
											<StyledTableCell align="center">{`${consent.mainDoctorFirstName} ${consent.mainDoctorLastName}`}</StyledTableCell>
											<StyledTableCell align="center">{`${consent.newDoctorFirstName} ${consent.newDoctorLastName}`}</StyledTableCell>
											<StyledTableCell align="center">{consent.newDoctorHospitalName}</StyledTableCell>
											<StyledTableCell align="center">{consent.patientConsent === false ? <span>Rejected</span> : <span>Approved</span>}</StyledTableCell>
											<StyledTableCell align="center">{formatDate(consent.date)}</StyledTableCell>
											{/* <StyledTableCell align="center">
									<Button variant="contained" color="success" style = {{marginRight:"15px"}}>Approve</Button>
									<Button variant="outlined" color="error">Reject</Button>
								</StyledTableCell> */}
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
			}
		</>
	);
}

export default ViewConsents;
