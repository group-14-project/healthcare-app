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

const handleCallJoin = () =>{
    // handle call join

}

function OnGoingCalls() {
	const dispatch = useDispatch();
	const pendingConsents = useSelector((state) => state.seniorDoctor.pending);

	return (
		<>
			<Box
				sx={{ display: "flex", flexDirection: "column", marginLeft: "65px" }}
			>
				{pendingConsents.length === 0 ? (
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
								{pendingConsents.map((consent, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component="th" scope="row">
											{`${consent.patientFirstName} ${consent.patientLastName}`}
										</StyledTableCell>
										<StyledTableCell align="center">{`${consent.mainDoctorFirstName} ${consent.mainDoctorLastName}`}</StyledTableCell>
										<StyledTableCell align="center">
											<Button
												variant="contained"
												color="success"
												style={{ marginRight: "15px" }}
												onClick={() => {
													handleCallJoin(consent);
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
			</Box>
		</>
	);
}

export default OnGoingCalls;
