import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import star from "../../assets/star.png";

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

function createData(name, rating, feedback) {
	return { name, rating, feedback };
}
const rows = [
	createData("Frozen yoghurt", 4, "Click Here"),
	createData("Ice cream sandwich", 3, "Click Here"),
	createData("Eclair", 5, "Click Here"),
	createData("Cupcake", 5, "Click Here"),
	createData("Gingerbread", 5, "Click Here"),
];
function Feedback() {
	return (
		<Box sx={{ display: "flex", marginLeft: "65px"}}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Patient Name</StyledTableCell>
							<StyledTableCell align="center">Rating</StyledTableCell>
							<StyledTableCell align="right">Feedback</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<StyledTableRow key={row.name}>
								<StyledTableCell component="th" scope="row">
									{row.name}
								</StyledTableCell>
								<StyledTableCell align="center">
									{[...Array(row.rating)].map((_, index) => (
										<span key={index}>
											<img src={star} alt="star" />
										</span> // Unicode character for star
									))}
								</StyledTableCell>
								<StyledTableCell align="right">{row.feedback}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default Feedback;
