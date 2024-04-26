import React, { useEffect, useRef, useState } from 'react';
import { fetchPatientConsents, patientActions } from '../../Store/patientSlice';
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
import getstomClient from './MySocket';
import CallLoader from './CallLoader';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


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

     const stompClient = useRef();

     
     const { enqueueSnackbar } = useSnackbar();

     const dispatch = useDispatch();
     const patientPendingConsents = useSelector(state => state.patient.pendingConsents)
     const patientApprovedConsents = useSelector(state => state.patient.approvedConsents);

     const patientState = useSelector(state => state.patient);

     useEffect(() => {
          dispatch(fetchPatientConsents());
     }, []);


     // useEffect(() => {

     //      // dispatch(consultActions.updateEmail(state.patient.email));

     //      console.log(patientState.calling);

     //      stompClient.current = getstomClient().client
     //      console.log("this si stompClient: ", stompClient.current)
     //      stompClient.current.connect({}, () => {
     //           console.log("connection is establissssssssshed")
     //           console.log(stompClient.current);

     //           stompClient.current.subscribe("/user/" + patientState.patientId + "/topic/call", (data) => {

     //                console.log("Queue Size: ", data.body);

     //           })

     //           stompClient.current.subscribe("/user/" + patientState.patientId + "/topic/acceptCall", (accept) => {
     //                dispatch(patientActions.updateCallingState(false));
     //                // setCalling(false);
     //                const acceptBody = JSON.parse(accept.body);
     //                const acceptedBy = JSON.parse(acceptBody.acceptedBy);
     //                const initiatedBy = JSON.parse(acceptBody.initiatedBy);
     //                acceptedBy.callee = patientState.patientId;
     //                initiatedBy.caller = patientState.remoteId;
     //                acceptedBy.name = patientState.patientName
     //                initiatedBy.name = patientState.doctorName;
     //                console.log(acceptBody);
     //                navigate(`/room/${acceptBody.roomID}`, { state: { acceptedBy, initiatedBy } });
     //           });

     //           stompClient.current.subscribe("/user/" + patientState.patientId + "/topic/rejectCall", (accept) => {
     //                dispatch(patientActions.updateCallingState(false));
     //                // setCalling(false);
     //                const acceptBody = JSON.parse(accept.body);
     //                const rejectedBy = JSON.parse(acceptBody.rejectedBy);
     //                console.log(rejectedBy.message);
     //                const variant = "error"
     //                enqueueSnackbar(rejectedBy.message, { variant });
     //           });

     //      })

     // }, [])


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
                            
	const navigate = useNavigate();                                {formatDate(consent.date)}
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
                                                            <Button variant="outlined" color="error" onClick={(e) => { handleRejectConsentRequest(e, consent.consentId) }}>
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
                              {
                                   patientState.calling
                                        ?
                                        <CallLoader />
                                        :
                                        <></>
                              }
                         </Box>
               }

          </>
     )
}

export default Consents;