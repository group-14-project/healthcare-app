import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function PatientTable(props) {
	console.log(props);
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{props.heads.map((head) => (
							<TableCell align="center" key={head}>
								{head}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{props.pastApp.map((App,index) => (
						<TableRow key = {index}>
							<TableCell align="center">{App.appointmentDateAndTime.split("T")[0]}</TableCell>
							<TableCell align="center">{App.doctorFirstName +" "+App.doctorLastName}</TableCell>

							<TableCell align="center">{App.mainSymptom}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
