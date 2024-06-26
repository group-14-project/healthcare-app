import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import IncomingCall from '../doctor/IncomingCall';
// import getstomClient from '../Patient/MySocket';
import { doctorActions } from '../../Store/doctorSlice';
import { useStompClient } from '../common/WebSocketContext';



const EndCall = () => {

     // const navigate = useNavigate();
     // const dispatch = useDispatch();
     const state = useSelector(state => state);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     // let stompClient = useRef();
     const [remoteID, setRemoteId] = useState("");
     const [localID, setLocalID] = useState(state.doctor.doctorId);
     const [roomID, setRoomID] = useState("");
     const [patientName, setPatientName] = useState("");
     const [modalOpen, setModalOpen] = useState(false);
     const [consultState, setConsultState] = useState({});
     // const [incomingCall, setIncomingCall] = useState(false);
     const stompClient = useStompClient();


     useEffect(() => {
          console.log(state)

               if(stompClient){

               
                    stompClient.subscribe("/user/" + localID + "/topic/call", (call) => {
                         // console.log('Received message:', message.body);
                         console.log("call from: " + call.body);
                         // console.log("remote id: " + call.body);
                         const userData = JSON.parse(call.body);
                         // console.log(userData);
                         // // console.log("consult state in doc dashboard: ", state.consult);
                         // const consultationData = JSON.parse(userData["consultState"]);
                         const callFrom = JSON.parse(userData["callFrom"]);
                         // console.log(consultationData);
                         // console.log(callFrom.localId);
                         // setConsultState(consultationData);

                         dispatch(doctorActions.updateRemoteId(callFrom.localId));

                         dispatch(doctorActions.updatePatientName(callFrom.patientName))

                         dispatch(doctorActions.updateIncomingCall(true));
                    });
               }


     }, [stompClient]);



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
               {state.doctor.incomingCall ? (
                    <IncomingCall />
               ) : (
                    <></>
               )}
          </Box>
     )
}

export default EndCall