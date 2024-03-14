import React from "react";
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

function createData(name, last_visit, view_details) {
	return { name, last_visit, view_details };
}

const rows = [
	createData("Frozen yoghurt", "25 May 2024", "Click Here"),
	createData("Ice cream sandwich", "25 May 2024", "Click Here"),
	createData("Eclair", "25 May 2024", "Click Here"),
	createData("Cupcake", "25 May 2024", "Click Here"),
	createData("Gingerbread", "25 May 2024", "Click Here"),
];
function DocPatients() {
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
						{rows.map((row) => (
							<StyledTableRow key={row.name}>
								<StyledTableCell component="th" scope="row">
									{row.name}
								</StyledTableCell>
								<StyledTableCell align="center">
									{row.last_visit}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.view_details}
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
