import React, { useEffect, useRef, useState } from 'react'
import { Box } from "@mui/material";
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useStompClient } from "../common/WebSocketContext";
import { useNavigate, useLocation } from 'react-router-dom';

let peerConnections = {};
const SeniorDoctorCall = () => {

     const navigate = useNavigate();

     var configuration = {
          iceServers: [{
               urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478",
               ]
          }]
     };

     const dispatch = useDispatch();
     const stompClient = useStompClient();
     // const pendingConsents = useSelector((state) => state.seniorDoctor.pending);
     const state = useSelector((state) => state.doctor);
     const localID = state.doctorId;
     const localName = state.firstName;
     const patientRef = useRef();
     const doctorRef = useRef();
     const ownRef = useRef();
     const [localStreamP, setLocalStreamP] = useState();
     const [localStreamD, setLocalStreamD] = useState();
     const [calls, setCalls] = useState([]);
     const [audio, setAudio] = useState(false);
     const [video, setVideo] = useState(false);

     const location = useLocation();

     console.log(location.state);

     useEffect(() => {
          if (stompClient) {

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

               // if()
               // if (state.doctorId != 8) {


               stompClient.subscribe("/user/" + localID + "/topic/seniorOffer", async (offer) => {

                    // peerConnection1.current = new RTCPeerConnection(configuration);

                    console.log("offer: ", JSON.parse(offer.body));
                    const offerData = JSON.parse(offer.body);
                    // if (peerConnection.current.signalingState !== "stable") {
                    await peerConnections[offerData.fromUser].setRemoteDescription(JSON.parse(offerData.offer));

                    console.log("setting remote description: ", peerConnections[offerData.fromUser].remoteDescription);

                    await peerConnections[offerData.fromUser].setLocalDescription(await peerConnections[offerData.fromUser].createAnswer());
                    console.log("setting description: ", peerConnections[offerData.fromUser].localDescription);
                    await stompClient.send("/app/answer", {}, JSON.stringify({
                         "toUser": offerData.fromUser.toString(),
                         "fromUser": offerData.toUser.toString(),
                         "answer": JSON.stringify(peerConnections[offerData.fromUser].localDescription)
                    }));

               })

               stompClient.subscribe("/user/" + localID + "/topic/seniorCandidate", async (answer) => {
                    // console.log("candidate: ", JSON.parse(answer.body));
                    const candidateData = JSON.parse(answer.body);

                    console.log("candidate: ", candidateData);

                    const candidate = JSON.parse(candidateData.candidate);
                    console.log(candidate);
                    console.log("remote description: ", peerConnections[candidateData.fromUser].remoteDescription);
                    console.log("local description: ", peerConnections[candidateData.fromUser].localDescription);
                    // if (candidate && peerConnection.current && peerConnection.current.remoteDescription)
                    await peerConnections[candidateData.fromUser].addIceCandidate(candidate);

               })


               stompClient.subscribe("/user/" + localID + "/topic/seniorAnswer", async (answer) => {

                    console.log("peer connections: ", peerConnections);

                    console.log("negotiation answer: ", answer.body);

                    const answerData = JSON.parse(answer.body);
                    await peerConnections[answerData.fromUser].setRemoteDescription(JSON.parse(answerData.answer));
                    console.log("negotiation remote description: ", peerConnections[answerData.fromUser].remoteDescription);

               });

               stompClient.subscribe("/user/" + localID + "/topic/leave", async (answer) => {

                    // localStreamD.getTracks().forEach(track => {
                    //      track.stop();
                    // });
                    // localStreamP.getTracks().forEach(track => {
                    //      track.stop();
                    // });

                    peerConnections[location.state.patientId].ontrack = null;
                    peerConnections[location.state.patientId].onremovetrack = null;
                    peerConnections[location.state.patientId].onicecandidate = null;
                    peerConnections[location.state.patientId].oniceconnectionstatechange = null;
                    peerConnections[location.state.patientId].onsignalingstatechange = null;

                    peerConnections[location.state.doctorId]

                    peerConnections[location.state.doctorId].ontrack = null;
                    peerConnections[location.state.doctorId].onremovetrack = null;
                    peerConnections[location.state.doctorId].onicecandidate = null;
                    peerConnections[location.state.doctorId].oniceconnectionstatechange = null;
                    peerConnections[location.state.doctorId].onsignalingstatechange = null;

                    peerConnections[location.state.patientId].close();
                    peerConnections[location.state.doctorId].close();

                    navigate("/doctor/dashboard");

               });
               // }



               // return () => {
               // 	console.log("cleanup");
               // 	subscription.unsubscribe();
               // };
          }
     }, [stompClient]);



     useEffect(() => {

          const doctorConnect = async (doctorId) => {
               peerConnections[doctorId] = new RTCPeerConnection(configuration);

               const pc = peerConnections[doctorId];

               console.log(pc);

               await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
               }).then((stream) => {
                    ownRef.current.srcObject = stream;
                    setLocalStreamD(stream);
                    stream.getTracks().forEach(async (track) => {
                         await pc.addTrack(track, stream);
                         track.enabled = false;
                    });
               });


               pc.onnegotiationneeded = async (event) => {
                    await pc.setLocalDescription(await pc.createOffer());
                    console.log("negotiation setting description: ", pc.localDescription);
                    await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
                         "toUser": doctorId,
                         "fromUser": localID.toString(),
                         "offer": JSON.stringify(pc.localDescription)
                    }))
               }


               pc.onicecandidate = async (event) => {
                    console.log(event);
                    if (event.candidate) {
                         await stompClient.send("/app/seniorCandidate", {}, JSON.stringify({
                              "toUser": doctorId,
                              "fromUser": localID.toString(),
                              "candidate": JSON.stringify(event.candidate)
                         }))
                    }
               }

               pc.ontrack = (event) => {
                    console.log("remote streams: ", event);
                    doctorRef.current.srcObject = event.streams[0];
                    // setRemoteStream(event.streams);
               }



               await pc.setLocalDescription(await pc.createOffer());
               // console.log("setting description: ", description);
               await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
                    "toUser": doctorId.toString(),
                    "fromUser": localID.toString(),
                    "offer": JSON.stringify(pc.localDescription)
               }));

          }

          const patientConnect = async (patientId) => {


               peerConnections[patientId] = new RTCPeerConnection(configuration);

               const pc = peerConnections[patientId];

               await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
               }).then(async (stream) => {
                    ownRef.current.srcObject = stream;
                    setLocalStreamP(stream);
                    stream.getTracks().forEach(async (track) => {
                         await pc.addTrack(track, stream);
                         track.enabled = false;
                    });
               })


               console.log(pc);


               pc.onnegotiationneeded = async (event) => {
                    await pc.setLocalDescription(await pc.createOffer());
                    console.log("negotiation setting description: ", pc.localDescription);
                    await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
                         "toUser": patientId,
                         "fromUser": localID.toString(),
                         "offer": JSON.stringify(pc.localDescription)
                    }))
               }


               pc.onicecandidate = async (event) => {
                    console.log(event);
                    if (event.candidate) {
                         await stompClient.send("/app/seniorCandidate", {}, JSON.stringify({
                              "toUser": patientId,
                              "fromUser": localID.toString(),
                              "candidate": JSON.stringify(event.candidate)
                         }))
                    }
               }

               pc.ontrack = (event) => {
                    console.log("remote streams: ", event);
                    patientRef.current.srcObject = event.streams[0];
                    // setRemoteStream(event.streams);
               }


               await pc.setLocalDescription(await pc.createOffer());
               // console.log("setting description: ", description);
               await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
                    "toUser": patientId.toString(),
                    "fromUser": localID.toString(),
                    "offer": JSON.stringify(pc.localDescription)
               }));

          }


          const handleJoinCall = async (e, call) => {

               const patientId = location.state.patientId.toString();
               const doctorId = location.state.doctorId.toString();
               await stompClient.send("/app/seniorJoin", {}, JSON.stringify({
                    "toUser": patientId.toString(),
                    "fromUser": localID.toString(),
                    "seniorName": localName,
               }));

               await stompClient.send("/app/seniorJoin", {}, JSON.stringify({
                    "toUser": doctorId.toString(),
                    "fromUser": localID.toString(),
                    "seniorName": localName,
               }));


               await doctorConnect(doctorId);

               await patientConnect(patientId);

          }


          handleJoinCall();

     }, [stompClient]);



     const [isVisible, setIsVisible] = useState(false);

     const handleMouseEnter = () => {
          setIsVisible(true);
     }

     const handleMouseLeave = () => {
          setIsVisible(false);
     }


     const handleVoiceToggle = async (e) => {
          // console.log(localStream);
          const audioTrackP = await localStreamP.getTracks().find(track => track.kind === 'audio');
          const audioTrackD = await localStreamD.getTracks().find(track => track.kind === 'audio');
          // console.log(audioTrack);
          if (audioTrackP.enabled) {
               audioTrackP.enabled = false;
               setAudio(false);
          }
          else {
               audioTrackP.enabled = true;
               setAudio(true);
          }
          if (audioTrackD.enabled) {
               audioTrackD.enabled = false;
               setAudio(false);
          }
          else {
               audioTrackD.enabled = true;
               setAudio(true);
          }
     }



     const handleVideoToggle = async (e) => {
          // console.log(localStream);
          // e.target.style.backgroundColor = "red";
          const videoTrackP = await localStreamP.getTracks().find(track => track.kind === 'video');
          const videoTrackD = await localStreamD.getTracks().find(track => track.kind === 'video');
          // console.log(videoTrack);
          if (videoTrackP.enabled) {
               videoTrackP.enabled = false;
               setVideo(false);
          }
          else {
               videoTrackP.enabled = true;
               setVideo(true);
          }
          if (videoTrackD.enabled) {
               videoTrackD.enabled = false;
               setVideo(false);
          }
          else {
               videoTrackD.enabled = true;
               setVideo(true);
          }
     }

     const handleEndCall = () => {
          localStreamD.getTracks().forEach(track => {
               track.stop();
          });
          localStreamP.getTracks().forEach(track => {
               track.stop();
          });

          peerConnections[location.state.patientId].ontrack = null;
          peerConnections[location.state.patientId].onremovetrack = null;
          peerConnections[location.state.patientId].onicecandidate = null;
          peerConnections[location.state.patientId].oniceconnectionstatechange = null;
          peerConnections[location.state.patientId].onsignalingstatechange = null;

          peerConnections[location.state.doctorId]

          peerConnections[location.state.doctorId].ontrack = null;
          peerConnections[location.state.doctorId].onremovetrack = null;
          peerConnections[location.state.doctorId].onicecandidate = null;
          peerConnections[location.state.doctorId].oniceconnectionstatechange = null;
          peerConnections[location.state.doctorId].onsignalingstatechange = null;

          peerConnections[location.state.patientId].close();
          peerConnections[location.state.doctorId].close();

          stompClient.send("/app/leave", {}, JSON.stringify({
               "fromUser": localID.toString(),
               "toUser": location.state.patientId.toString()
          }));

          stompClient.send("/app/leave", {}, JSON.stringify({
               "fromUser": localID.toString(),
               "toUser": location.state.doctorId.toString()
          }));

          peerConnections[location.state.patientId] = null;
          peerConnections[location.state.doctorId] = null;

          navigate("/doctor/dashboard");

     }


     return (
          <>

               <div className='room'>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", alignItems: "center" }}>
                         <div style={{ margin: "10px", display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                              <video ref={patientRef} autoPlay style={{ borderRadius: "30px", width: "100%", height: "100%" }} />
                              <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", width: '100%', color: "#fff" }}>{location.state.patientName}</div>
                         </div>

                         <div style={{ margin: "10px", display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "left", alignItems: "center" }} >
                              <video ref={doctorRef} autoPlay style={{ borderRadius: "30px", width: "100%", height: "100%" }} />
                              <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", color: "#fff" }}>{location.state.doctorName}</div>
                         </div>

                         <div style={{ margin: "10px", display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "left", alignItems: "center" }}>
                              <video ref={ownRef} autoPlay muted style={{ borderRadius: "30px", width: "100%", height: "100%" }} />
                              <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", color: "#fff" }}>{localName}(You)</div>
                         </div>

                    </div>
                    <div style={{ width: "100%", height: "100px" }} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                         {
                              (
                                   <div style={{ display: "flex", justifyContent: "center", position: 'fixed', bottom: '0', left: '49%', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.2)', color: '#fff', borderRadius: '20px', width: "50%" }}>
                                        <IconButton onClick={handleVoiceToggle}>
                                             {
                                                  audio
                                                       ?
                                                       <div style={{ borderRadius: "50%", border: "1px solid grey" }}>
                                                            <MicIcon className='call_btn' sx={{ margin: "20px" }} />
                                                       </div>
                                                       :
                                                       <div style={{ backgroundColor: "red", borderRadius: "50%" }}>
                                                            <MicOffIcon className='call_btn' sx={{ margin: "20px" }} />
                                                       </div>
                                             }
                                        </IconButton>
                                        <IconButton onClick={handleVideoToggle}>
                                             {
                                                  video
                                                       ?
                                                       <div style={{ borderRadius: "50%", border: "1px solid grey" }}>
                                                            <VideocamIcon className='call_btn' sx={{ margin: "20px" }} />
                                                       </div>
                                                       :
                                                       <div style={{ backgroundColor: "red", borderRadius: "50%" }}>
                                                            <VideocamOffIcon className='call_btn' sx={{ margin: "20px" }} />
                                                       </div>
                                             }
                                        </IconButton>
                                        <IconButton onClick={handleEndCall}>
                                             {
                                                  <div style={{ backgroundColor: "red", borderRadius: "50%" }}>
                                                       <CallEndIcon className='call_btn' sx={{ margin: "20px" }} />
                                                  </div>
                                             }
                                        </IconButton>

                                   </div>
                              )
                         }
                    </div>
               </div>
          </>
     )
}

export default SeniorDoctorCall