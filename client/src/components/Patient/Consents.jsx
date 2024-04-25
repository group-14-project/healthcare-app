import React, { useEffect, useState } from 'react';
import { fetchPatientConsents } from '../../Store/patientSlice';
import { useDispatch, useSelector } from 'react-redux';
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
import formatDate from '../../Utility Data/dateChangeFunc';
import { approveConsent, withdrawConsent, rejectConsentRequest } from '../../Store/patientSlice';




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
     
     "&:last-child td, &:last-child th": {
          border: 0,
     },
}));



const Consents = () => {

     const dispatch = useDispatch();
     const patientPendingConsents = useSelector(state => state.patient.pendingConsents)
     const patientApprovedConsents = useSelector(state => state.patient.approvedConsents);

     useEffect(() => {
          dispatch(fetchPatientConsents());
     }, []);


     const handleApproveConsent = (e, consentId) => {
          e.preventDefault();
          dispatch(approveConsent({ consentId: consentId }));
     }

     const handleWithdrawConsent = (e, consentId) => {
          e.preventDefault();
          dispatch(withdrawConsent({ consentId: consentId }));
     }

     const handleRejectConsentRequest = (e, consentId) => {
          e.preventDefault();
          dispatch(rejectConsentRequest({ consentId: consentId }));
     }


     return (
          <>
               {
                    patientPendingConsents === undefined
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
                                             {patientPendingConsents.map((consent, index) => (
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
                                                            {consent.patientConsent}
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            {formatDate(consent.date)}
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            <Button
                                                                 variant="contained"
                                                                 color="success"
                                                                 style={{ marginRight: "15px" }}
                                                                 onClick={(e) => { handleApproveConsent(e, consent.consentId) }}
                                                            >
                                                                 Approve
                                                            </Button>
                                                            <Button variant="outlined" color="error" onClick={(e)=>{handleRejectConsentRequest(e, consent.consentId)}}>
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
                    patientApprovedConsents === undefined
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
                                                  <StyledTableCell align="center">Take Action</StyledTableCell>
                                                  {/* <StyledTableCell align="center">Take Action</StyledTableCell> */}
                                             </TableRow>
                                        </TableHead>
                                        <TableBody>
                                             {patientApprovedConsents.map((consent, index) => (
                                                  <StyledTableRow key={index}>
                                                       <StyledTableCell component="th" scope="row">
                                                            {`${consent.patientFirstName} ${consent.patientLastName}`}
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">{`${consent.mainDoctorFirstName} ${consent.mainDoctorLastName}`}</StyledTableCell>
                                                       <StyledTableCell align="center">{`${consent.newDoctorFirstName} ${consent.newDoctorLastName}`}</StyledTableCell>
                                                       <StyledTableCell align="center">{consent.newDoctorHospitalName}</StyledTableCell>
                                                       <StyledTableCell align="center">{consent.patientConsent === false ? <span>Rejected</span> : <span>Approved</span>}</StyledTableCell>
                                                       <StyledTableCell align="center">{formatDate(consent.date)}</StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            <Button
                                                                 variant="contained"
                                                                 color="success"
                                                                 style={{ marginRight: "15px" }}
                                                                 onClick={(e) => { handleWithdrawConsent(e, consent.consentId) }}
                                                            >
                                                                 Withdraw
                                                            </Button>
                                                       </StyledTableCell>
                                                  </StyledTableRow>
                                             ))}
                                        </TableBody>
                                   </Table>
                              </TableContainer>
                         </Box>
               }

          </>
     )
}

export default Consents;