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
import Button from "@mui/material/Button";
import ReportForm from "./ReportForm";
import { fetchReports, downloadReport } from "../../Store/patientSlice";
import { useSelector, useDispatch } from "react-redux";
import formatDate from "../../Utility Data/dateChangeFunc";
import CallLoader from "./CallLoader";

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

const Reports = (props) => {
	const patientState = useSelector((state) => state.patient);
     

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchReports());
	}, []);

	const [show, setShow] = useState(false);
	const [fileData, setFileData] = useState(null);
	const [fileName, setFileName] = useState("");

	const handleDownload = async (e, reportId, reportName) => {
		e.preventDefault();

		const data = dispatch(downloadReport(reportId, reportName));
	};

	const handleShow = () => setShow(true);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				marginLeft: "65px",
				padding: "20px",
			}}
		>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center">Report ID</StyledTableCell>
							<StyledTableCell align="center">Report Name</StyledTableCell>
							<StyledTableCell align="center">Report Link</StyledTableCell>
							<StyledTableCell align="center">Doctor Name</StyledTableCell>
							<StyledTableCell align="center">Date</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patientState.reports.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="td" scope="row" align="center">
									{row.id}
								</StyledTableCell>
								<StyledTableCell component="td" scope="row" align="center">
									{row.reportName}
								</StyledTableCell>
								<StyledTableCell align="center">
									<Button
										style={{ backgroundColor: "#00ACB9" }}
										variant="contained"
										onClick={(e) => {
											handleDownload(e, row.id, row.reportName);
										}}
									>
										Download
									</Button>
								</StyledTableCell>
								<StyledTableCell component="td" scope="row" align="center">
								{row.doctorFirstName && row.doctorFirstName + " " + row.doctorLastName}	
								</StyledTableCell>
								<StyledTableCell component="td" scope="row" align="center">
									{formatDate(row.localDateTime.slice(0, 10))}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Box sx={{ marginTop: "30px" }}>
				<Button
					sx={{ float: "right", backgroundColor: "#00ACB9" }}
					variant="contained"
					onClick={handleShow}
				>
					Upload a new report{" "}
				</Button>
			</Box>

			{show ? <ReportForm show={show} setShow={setShow} /> : <></>}
			{patientState.calling ? <CallLoader /> : <></>}
		</Box>
	);
};

export default Reports;
