import React, { useState } from "react";
import logo from "../../assets/logo_full_black.png";
import styles from "./PatientPrescription.module.css";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Prescription from "../doctor/Prescription";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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



function PrescriptionModal(props) {
     // console.log("PM",props);
     return (
          <Modal
               {...props}
               size="lg"
               // show={lgShow}
               // onHide={() => setLgShow(false)}
               aria-labelledby="example-modal-sizes-title-lg"
               sx={{ width: "100%" }}
          >
               <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                         Prescription
                    </Modal.Title>
               </Modal.Header>
               <Modal.Body><Prescription props={props} /></Modal.Body>
          </Modal>
     );
}


const PatientPrescription = () => {

     const [lgShow, setLgShow] = useState(false);

     const AppointmentDetails = useSelector(state => state.patient.pastAppointments);
     const patientState = useSelector(state=>state.patient);

     return (

          <Box sx={{ display: "flex", marginLeft: "65px", padding: "20px" }}>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <StyledTableCell align="center">Appoitment Date</StyledTableCell>
                                   <StyledTableCell align="center">Symptom</StyledTableCell>
                                   <StyledTableCell align="center">Prescription</StyledTableCell>
                                   <StyledTableCell align="center">Recording Link</StyledTableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {AppointmentDetails.map((appointment, index) => (
                                   <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row" align="center">
                                             {appointment.appointmentDateAndTime.split("T")[0]}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                             {appointment.mainSymptom}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                             <Button onClick={() => setLgShow(true)}>View Prescription</Button>
                                             <PrescriptionModal
                                                  show={lgShow}
                                                  onHide={() => setLgShow(false)}
                                                  appointment={appointment}
                                             />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">Link</StyledTableCell>
                                   </StyledTableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
               {
                    patientState.calling
                         ?
                         <CallLoader />
                         :
                         <></>
               }
          </Box>
     )


}

export default PatientPrescription;
