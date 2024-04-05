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
import { Button } from "@mui/material";

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

function createData(patient_name, hospital, doctor, share_button) {
	return { patient_name, hospital, doctor, share_button };
}

const rows = [
	createData("Frozen yoghurt", "25 May 2024", "Click Here"),
	createData("Ice cream sandwich", "25 May 2024", "Click Here"),
	createData("Eclair", "25 May 2024", "Click Here"),
	createData("Cupcake", "25 May 2024", "Click Here"),
	createData("Gingerbread", "25 May 2024", "Click Here"),
];
function Refer() {
	return (
		<Box sx={{ display: "flex", marginLeft: "65px", padding: "20px" }}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Patient Name</StyledTableCell>
							<StyledTableCell align="center">Hospital</StyledTableCell>
							<StyledTableCell align="center">Doctor</StyledTableCell>
							<StyledTableCell align="right">
								Share &nbsp; &nbsp;
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<StyledTableRow key={row.patient_name}>
								<StyledTableCell component="th" scope="row">
									{row.patient_name}
								</StyledTableCell>
								<StyledTableCell align="center">
									<select id="hospital" name="hospital">
										<option value="" disabled selected>
											Choose Hospital
										</option>
										<option value="volvo">Volvo</option>
										<option value="saab">Saab</option>
										<option value="fiat">Fiat</option>
										<option value="audi">Audi</option>
									</select>
								</StyledTableCell>
								<StyledTableCell align="center">
									<select
										id="doctor"
										name="doctor"
									>
										<option value="" disabled selected>
											Choose Doctor
										</option>
										<option value="volvo">Volvo</option>
										<option value="saab">Saab</option>
										<option value="fiat">Fiat</option>
										<option value="audi">Audi</option>
									</select>
								</StyledTableCell>
								<StyledTableCell align="right">
									<Button
										style={{ backgroundColor: "#00ACB9" }}
										variant="contained"
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
