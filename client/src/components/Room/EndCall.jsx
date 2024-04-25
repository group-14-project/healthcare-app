import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import IncomingCall from '../doctor/IncomingCall';


const EndCall = () => {

     // const navigate = useNavigate();
     // const dispatch = useDispatch();
     const state = useSelector(state => state);
     const navigate = useNavigate();

     let stompClient = useRef();
     const [remoteID, setRemoteId] = useState("");
     const [localID, setLocalID] = useState(state.doctor.doctorId);
     const [roomID, setRoomID] = useState("");
     const [patientName, setPatientName] = useState("");
     const [modalOpen, setModalOpen] = useState(false);
     const [consultState, setConsultState] = useState({});
     const [incomingCall, setIncomingCall] = useState(false);


     // useEffect(() => {
     //      var conn = new SockJS("http://localhost:9090/socket");
     //      stompClient.current = new Stomp.over(conn);

     //      stompClient.current.connect({}, (frame) => {
     //           stompClient.current.subscribe(
     //                "/user/" + localID + "/topic/call",
     //                (call) => {
     //                     console.log(call);
     //                     console.log("call from: " + call.body);
     //                     // console.log("remote id: " + call.body);
     //                     const userData = JSON.parse(call.body);
     //                     console.log(userData);
     //                     // console.log("consult state in doc dashboard: ", state.consult);
     //                     // const consultationData = JSON.parse(userData["consultState"]);
     //                     // const callFrom = JSON.parse(userData["callFrom"]);
     //                     // console.log(consultationData)/;
     //                     // console.log(callFrom);
     //                     // setConsultState(consultationData);

     //                     setRemoteId(call.body);
     //                     // setPatientName(callFrom.patientName);

     //                     setIncomingCall(true);
     //                }
     //           );
     //      });
     // }, []);

     

     const handleClick = (e) => {
          e.preventDefault();
          if (state.login.user.role === "patient") navigate("/patient/dashboard");
          else navigate("/doctor/dashboard");
     }

     return (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
               <Box sx={{ fontSize: "2rem", marginBottom: "20px" }}>
                    Call Ended!!
               </Box>

               <Box>
                    <Button variant='contained' color="success" onClick={handleClick}>Go to Dashboard</Button>
               </Box>
               {incomingCall ? (
                    <IncomingCall
                         acceptUtil={handleAcceptCall}
                         rejectUtil={handleRejectCall}
                         vars={patientName}
                    />
               ) : (
                    <></>
               )}
          </Box>
     )
}

export default EndCall