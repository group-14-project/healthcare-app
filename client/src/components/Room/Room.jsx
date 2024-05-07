import React, { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MedicationIcon from '@mui/icons-material/Medication';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useNavigate } from 'react-router-dom';
import { useReactMediaRecorder } from "react-media-recorder";
import "./Room.css";
import { useSelector } from 'react-redux';
import { useStompClient } from '../common/WebSocketContext';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PrescriptionForm from '../doctor/PrescriptionForm';

// import getstomClient from '../Patient/MySocket';


const Room = () => {

     // let stompClient = useRef();

     const location = useLocation();

     let localVideoRef = useRef();
     let remoteVideoRef = useRef();
     let SeniorDoctorVideoRef = useRef();
     let peerConnection = useRef();
     let peerConnection1 = useRef();
     let myref = useRef(null);
     let mediaRecorder = useRef();


     let remoteID = location.state.initiatedBy.caller;
     let remoteName = location.state.initiatedBy.name
     let localID = location.state.acceptedBy.callee;
     let localName = location.state.acceptedBy.name;
     // let seniorName = "";
     const [audio, setAudio] = useState(false);
     const [video, setVideo] = useState(false);
     const [seniorJoin, setSeniorJoin] = useState(false);
     const [seniorName, setSeniorName] = useState("");
     const [seniorID, setSeniorId] = useState("");
     const [localStreamR, setLocalStreamR] = useState(null);
     const [localStreamS, setLocalStreamS] = useState(null);
     const [remoteStream, setRemoteStream] = useState(null);
     const [recording, setRecording] = useState([]);
     const [recordingStart, setRecordingStart] = useState(false);
     const [recordingStop, setRecordingStop] = useState(true);
     const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
     const role = useSelector(state => state.login.user.role);

     const stompClient = useStompClient();

     const navigate = useNavigate();

     const [show, setShow] = useState(false);
     const handleShow = () => setShow(true);

     console.log("remoteId: ", remoteID);
     console.log("localId: ", localID);




     useEffect(() => {

          const handlewebrtc = async () => {

               var configuration = {
                    iceServers: [{
                         urls: [
                              "stun:stun.l.google.com:19302",
                              "stun:global.stun.twilio.com:3478",
                         ]
                    }]
               };

               peerConnection.current = new RTCPeerConnection(configuration);
               peerConnection1.current = new RTCPeerConnection(configuration);
               // var conn = new SockJS("http://localhost:9090/socket");
               // stompClient.current = getstomClient().client;


               // stompClient.current.connect({}, async (frame) => {

               await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
               }).then((stream) => {
                    localVideoRef.current.srcObject = stream;
                    setLocalStreamR(stream);
                    stream.getTracks().forEach(async (track) => {
                         await peerConnection.current.addTrack(track, stream);
                         track.enabled = false;
                    });
               })

               await peerConnection.current.setLocalDescription(await peerConnection.current.createOffer());
               // console.log("setting description: ", description);
               await stompClient.send("/app/offer", {}, JSON.stringify({
                    "toUser": remoteID.toString(),
                    "fromUser": localID.toString(),
                    "offer": JSON.stringify(peerConnection.current.localDescription)
               }))

               stompClient.subscribe("/user/" + localID + "/topic/seniorJoin", async (message) => {
                    setSeniorJoin(true);
                    const msg = JSON.parse(message.body);
                    setSeniorName(msg.seniorName);
                    setSeniorId(msg.fromUser);
                    await peerConnection1.current.setLocalDescription(await peerConnection1.current.createOffer());
                    // console.log("setting description: ", description);
                    await stompClient.send("/app/offer", {}, JSON.stringify({
                         "toUser": msg["fromUser"],
                         "fromUser": msg["toUser"],
                         "offer": JSON.stringify(peerConnection1.current.localDescription)
                    }));

                    await navigator.mediaDevices.getUserMedia({
                         video: true,
                         audio: true
                    }).then(async (stream) => {
                         localVideoRef.current.srcObject = stream;
                         setLocalStreamS(stream);
                         stream.getTracks().forEach(async (track) => {
                              await peerConnection1.current.addTrack(track, stream);
                              track.enabled = false;
                         });
                    })

               })

               stompClient.subscribe("/user/" + localID + "/topic/offer", async (offer) => {
                    console.log("offer: ", JSON.parse(offer.body));
                    const offerData = JSON.parse(offer.body);
                    // if (peerConnection.current.signalingState !== "stable") {
                    await peerConnection.current.setRemoteDescription(JSON.parse(offerData.offer));

                    console.log("setting remote description: ", peerConnection.current.remoteDescription);

                    await peerConnection.current.setLocalDescription(await peerConnection.current.createAnswer());
                    console.log("setting description: ", peerConnection.current.localDescription);
                    await stompClient.send("/app/answer", {}, JSON.stringify({
                         "toUser": offerData.fromUser.toString(),
                         "fromUser": offerData.toUser.toString(),
                         "answer": JSON.stringify(peerConnection.current.localDescription)
                    }));

               })

               stompClient.subscribe("/user/" + localID + "/topic/candidate", async (answer) => {
                    // console.log("candidate: ", JSON.parse(answer.body));
                    const candidateData = JSON.parse(answer.body);

                    console.log("candidate: ", candidateData);

                    const candidate = JSON.parse(candidateData.candidate);
                    console.log(candidate);
                    console.log("remote description: ", peerConnection.current.remoteDescription);
                    console.log("local description: ", peerConnection.current.localDescription);
                    // if (candidate && peerConnection.current && peerConnection.current.remoteDescription)
                    await peerConnection.current.addIceCandidate(candidate);

               });


               stompClient.subscribe("/user/" + localID + "/topic/answer", async (answer) => {

                    console.log("negotiation answer: ", answer.body);

                    const answerData = JSON.parse(answer.body);
                    await peerConnection.current.setRemoteDescription(JSON.parse(answerData.answer));
                    console.log("negotiation remote description: ", peerConnection.current.remoteDescription);


               });

               stompClient.subscribe("/user/" + localID + "/topic/disconnectCall", async (disconnect) => {

                    console.log("user disconnected: ", disconnect);

                    // myref.current.style.display = "none";

                    peerConnection.current.close();

                    navigate('/endCall');

               });

               stompClient.subscribe("/user/" + localID + "/topic/seniorOffer", async (offer) => {

                    console.log("offer: ", JSON.parse(offer.body));
                    const offerData = JSON.parse(offer.body);
                    // if (peerConnection.current.signalingState !== "stable") {
                    await peerConnection1.current.setRemoteDescription(JSON.parse(offerData.offer));

                    console.log("setting remote description: ", peerConnection1.current.remoteDescription);

                    await peerConnection1.current.setLocalDescription(await peerConnection1.current.createAnswer());
                    console.log("setting description: ", peerConnection1.current.localDescription);
                    await stompClient.send("/app/seniorAnswer", {}, JSON.stringify({
                         "toUser": offerData.fromUser.toString(),
                         "fromUser": offerData.toUser.toString(),
                         "answer": JSON.stringify(peerConnection1.current.localDescription)
                    }));

               })

               stompClient.subscribe("/user/" + localID + "/topic/seniorCandidate", async (answer) => {
                    // console.log("candidate: ", JSON.parse(answer.body));
                    const candidateData = JSON.parse(answer.body);

                    console.log("candidate: ", candidateData);

                    const candidate = JSON.parse(candidateData.candidate);
                    console.log(candidate);
                    console.log("remote description: ", peerConnection1.current.remoteDescription);
                    console.log("local description: ", peerConnection1.current.localDescription);
                    // if (candidate && peerConnection.current && peerConnection.current.remoteDescription)
                    await peerConnection1.current.addIceCandidate(candidate);

               })


               stompClient.subscribe("/user/" + localID + "/topic/seniorAnswer", async (answer) => {

                    console.log("negotiation answer: ", answer.body);

                    const answerData = JSON.parse(answer.body);
                    await peerConnection1.current.setRemoteDescription(JSON.parse(answerData.answer));
                    console.log("negotiation remote description: ", peerConnection1.current.remoteDescription);


               });

               stompClient.subscribe("/user/" + localID + "/topic/leave", async (answer) => {

                    setSeniorJoin(false);

                    peerConnection1.current.ontrack = null;
                    peerConnection1.current.onremovetrack = null;
                    peerConnection1.current.onicecandidate = null;
                    peerConnection1.current.oniceconnectionstatechange = null;
                    peerConnection1.current.onsignalingstatechange = null;

                    peerConnection1.current.close();

                    peerConnection1.current = null;

               });


               peerConnection.current.onnegotiationneeded = async (event) => {
                    await peerConnection.current.setLocalDescription(await peerConnection.current.createOffer());
                    console.log("negotiation setting description: ", peerConnection.current.localDescription);
                    await stompClient.send("/app/offer", {}, JSON.stringify({
                         "toUser": remoteID.toString(),
                         "fromUser": localID.toString(),
                         "offer": JSON.stringify(peerConnection.current.localDescription)
                    }))
               }


               peerConnection.current.onicecandidate = async (event) => {
                    console.log(event);
                    if (event.candidate) {
                         await stompClient.send("/app/candidate", {}, JSON.stringify({
                              "toUser": remoteID.toString(),
                              "fromUser": localID.toString(),
                              "candidate": JSON.stringify(event.candidate)
                         }))
                    }
               }

               peerConnection.current.ontrack = (event) => {
                    console.log("remote streams: ", event);
                    remoteVideoRef.current.srcObject = event.streams[0];
                    setRemoteStream(event.streams);
               }

               peerConnection1.current.onnegotiationneeded = async (event) => {
                    await peerConnection1.current.setLocalDescription(await peerConnection1.current.createOffer());
                    console.log("negotiation setting description: ", peerConnection1.current.localDescription);
                    await stompClient.send("/app/seniorOffer", {}, JSON.stringify({
                         "toUser": remoteID.toString(),
                         "fromUser": localID.toString(),
                         "offer": JSON.stringify(peerConnection1.current.localDescription)
                    }))
               }


               peerConnection1.current.onicecandidate = async (event) => {
                    console.log(event);
                    if (event.candidate) {
                         await stompClient.send("/app/seniorCandidate", {}, JSON.stringify({
                              "toUser": remoteID.toString(),
                              "fromUser": localID.toString(),
                              "candidate": JSON.stringify(event.candidate)
                         }))
                    }
               }

               peerConnection1.current.ontrack = (event) => {
                    console.log("remote streams: ", event);
                    SeniorDoctorVideoRef.current.srcObject = event.streams[0];
                    // setRemoteStream(event.streams);
               }
          }

          if (stompClient) {
               handlewebrtc();
          }



     }, [stompClient])




     const handleVoiceToggle = async (e) => {
          // console.log(localStream);
          const audioTrackR = await localStreamR.getTracks().find(track => track.kind === 'audio');
          console.log(audioTrackR);
          if (audioTrackR.enabled) {
               audioTrackR.enabled = false;
               setAudio(false);
          }
          else {
               audioTrackR.enabled = true;
               setAudio(true);
          }

          const audioTrackS = await localStreamS.getTracks().find(track => track.kind === 'audio');
          console.log(audioTrackS);
          if (audioTrackS.enabled) {
               audioTrackS.enabled = false;
               setAudio(false);
          }
          else {
               audioTrackS.enabled = true;
               setAudio(true);
          }
     }



     const handleVideoToggle = async (e) => {
          // console.log(localStream);
          const videoTrackR = await localStreamR.getTracks().find(track => track.kind === 'video');
          console.log(videoTrackR);
          if (videoTrackR.enabled) {
               videoTrackR.enabled = false;
               setVideo(false);
          }
          else {
               videoTrackR.enabled = true;
               setVideo(true);
          }

          const videoTrackS = await localStreamS.getTracks().find(track => track.kind === 'video');
          console.log(videoTrackS);
          if (videoTrackS.enabled) {
               videoTrackS.enabled = false;
               setVideo(false);
          }
          else {
               videoTrackS.enabled = true;
               setVideo(true);
          }
     }


     const handleEndCall = async (e) => {

          localStreamR.getTracks().forEach(track => {
               track.stop();
          });

          // localStreamS.getTracks().forEach(track => {
          //      track.stop();
          // });



          peerConnection.current.ontrack = null;
          peerConnection.current.onremovetrack = null;
          peerConnection.current.onicecandidate = null;
          peerConnection.current.oniceconnectionstatechange = null;
          peerConnection.current.onsignalingstatechange = null;

          peerConnection.current.close();

          if(peerConnection1.current !== null){
               peerConnection1.current.ontrack = null;
               peerConnection1.current.onremovetrack = null;
               peerConnection1.current.onicecandidate = null;
               peerConnection1.current.oniceconnectionstatechange = null;
               peerConnection1.current.onsignalingstatechange = null;
               peerConnection1.current.close();
          }

          // console.log(remoteVideoRef.current);



          stompClient.send("/app/disconnectCall", {}, JSON.stringify({
               "acceptedBy": localID.toString(),
               "initiatedBy": remoteID.toString(),
               "role": role
          }));

          stompClient.send("/app/leave", {}, JSON.stringify({
               "fromUser": localID.toString(),
               "toUser": seniorID.toString(),
          }));

          peerConnection.current = null;

          peerConnection1.current = null;


          // stompClient.current = null;
          console.log("hi")
          navigate(`${role}/dashboard`, {replace:true});
          // if (role === "doctor") navigate("/doctor/dashboard");
          // else navigate("/patient/dashboard");

     }

     const [isVisible, setIsVisible] = useState(false);

     const handleMouseEnter = () => {
          setIsVisible(true);
     }

     const handleMouseLeave = () => {
          setIsVisible(false);
     }

     // const handleMouseMove = () => {
     //      setIsVisible(true);
     // };


     // setTimeout(() => {
     //      setIsVisible(false);
     // }, 3000);


     return (
          <div className='room'>
               <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                    <div ref={myref} style={{ margin: "10px", display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                         <video ref={remoteVideoRef} autoPlay style={{ border: "2px solid #202124", borderRadius: "30px", width: "100%", height: "100%" }} />
                         <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", width: '100%', color: "#fff" }}>{remoteName}</div>
                    </div>

                    {
                         seniorJoin
                              ?
                              <div ref={myref} style={{ margin: "10px", display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "left", alignItems: "center" }} >
                                   <video ref={SeniorDoctorVideoRef} autoPlay style={{ border: "2px solid #202124", borderRadius: "30px", width: "100%", height: "100%" }} />
                                   <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", color: "#fff" }}>Senior Dr. {seniorName}</div>
                              </div>
                              :
                              <></>
                    }

                    <div style={{ margin: "10px", display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "left", alignItems: "center" }}>
                         <video src={mediaBlobUrl} ref={localVideoRef} autoPlay muted style={{ border: "2px solid #202124", borderRadius: "30px", width: "100%", height: "100%" }} />
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

                                   {
                                        role === "doctor"
                                             ?
                                             <>
                                                  <IconButton onClick={handleShow}>
                                                       {
                                                            <div style={{ backgroundColor: "white", borderRadius: "50%" }}>
                                                                 <MedicationIcon sx={{ margin: "20px" }} />
                                                                 <PrescriptionForm show={show} onHide={() => setShow(false)} />
                                                            </div>
                                                       }
                                                  </IconButton>
                                             </>
                                             :
                                             <></>

                                   }

                              </div>
                         )
                    }
               </div>
          </div>
     )
}

export default Room
