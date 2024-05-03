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
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../Store/doctorSlice";
import { store } from "../../Store/store";
import IncomingCall from "./IncomingCall";

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


function Feedback() {
	const doctorState = useSelector(state => state.doctor);
	const reviews = useSelector((state) => state.doctor.reviews);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchReviews());
	}, []);

	return (
		<Box sx={{ display: "flex", marginLeft: "65px" }}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center">Patient Name</StyledTableCell>
							<StyledTableCell align="center">Feedback</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reviews.map((review, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component="th" scope="row" align="center">
									{review.patientFirstName} {review.patientLastName}
								</StyledTableCell>
								<StyledTableCell align="center"><i>“{review.review}”</i></StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{doctorState.incomingCall ? (
				<IncomingCall />
			) : (
				<></>
			)}
		</Box>
	);
}

export default Feedback;
