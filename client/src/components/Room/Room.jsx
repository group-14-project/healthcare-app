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
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useNavigate } from 'react-router-dom';
import { useReactMediaRecorder } from "react-media-recorder";
import "./Room.css";
import { useSelector } from 'react-redux';
import getstomClient from '../Patient/MySocket';


const Room = () => {

     let stompClient = useRef();

     const location = useLocation();

     let localVideoRef = useRef();
     let remoteVideoRef = useRef();
     let peerConnection = useRef();
     let myref = useRef(null);
     let mediaRecorder = useRef();


     let remoteID = location.state.initiatedBy.caller;
     let remoteName = location.state.initiatedBy.name
     let localID = location.state.acceptedBy.callee;
     let localName = location.state.acceptedBy.name;
     const [audio, setAudio] = useState(false);
     const [video, setVideo] = useState(false);
     const [localStream, setLocalStream] = useState(null);
     const [remoteStream, setRemoteStream] = useState(null);
     const [recording, setRecording] = useState([]);
     const [recordingStart, setRecordingStart] = useState(false);
     const [recordingStop, setRecordingStop] = useState(true);
     const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
     const role = useSelector(state => state.login.user.role);



     const navigate = useNavigate();





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
               // var conn = new SockJS("http://localhost:9090/socket");
               stompClient.current = getstomClient().client;


               // stompClient.current.connect({}, async (frame) => {

               await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
               }).then((stream) => {
                    localVideoRef.current.srcObject = stream;
                    setLocalStream(stream);
                    stream.getTracks().forEach(async (track) => {
                         await peerConnection.current.addTrack(track, stream);
                         track.enabled = false;
                    });
               })

               await peerConnection.current.setLocalDescription(await peerConnection.current.createOffer());
               // console.log("setting description: ", description);
               stompClient.current.send("/app/offer", {}, JSON.stringify({
                    "toUser": remoteID.toString(),
                    "fromUser": localID.toString(),
                    "offer": JSON.stringify(peerConnection.current.localDescription)
               }))

               stompClient.current.subscribe("/user/" + localID + "/topic/offer", async (offer) => {
                    console.log("offer: ", JSON.parse(offer.body));
                    const offerData = JSON.parse(offer.body);
                    // if (peerConnection.current.signalingState !== "stable") {
                    await peerConnection.current.setRemoteDescription(JSON.parse(offerData.offer));

                    console.log("setting remote description: ", peerConnection.current.remoteDescription);

                    await peerConnection.current.setLocalDescription(await peerConnection.current.createAnswer());
                    console.log("setting description: ", peerConnection.current.localDescription);
                    stompClient.current.send("/app/answer", {}, JSON.stringify({
                         "toUser": offerData.fromUser.toString(),
                         "fromUser": offerData.toUser.toString(),
                         "answer": JSON.stringify(peerConnection.current.localDescription)
                    }));

               })

               stompClient.current.subscribe("/user/" + localID + "/topic/candidate", async (answer) => {
                    // console.log("candidate: ", JSON.parse(answer.body));
                    const candidateData = JSON.parse(answer.body);

                    console.log("candidate: ", candidateData);

                    const candidate = JSON.parse(candidateData.candidate);
                    console.log(candidate);
                    console.log("remote description: ", peerConnection.current.remoteDescription);
                    console.log("local description: ", peerConnection.current.localDescription);
                    // if (candidate && peerConnection.current && peerConnection.current.remoteDescription)
                    await peerConnection.current.addIceCandidate(candidate);

               })


               stompClient.current.subscribe("/user/" + localID + "/topic/answer", async (answer) => {

                    console.log("negotiation answer: ", answer.body);

                    const answerData = JSON.parse(answer.body);
                    await peerConnection.current.setRemoteDescription(JSON.parse(answerData.answer));
                    console.log("negotiation remote description: ", peerConnection.current.remoteDescription);


               });

               stompClient.current.subscribe("/user/" + localID + "/topic/disconnectCall", async (disconnect) => {

                    console.log("user disconnected: ", disconnect);

                    myref.current.style.display = "none";

                    peerConnection.current.close();

                    navigate('/endCall');

               })



               peerConnection.current.onnegotiationneeded = async (event) => {
                    await peerConnection.current.setLocalDescription(await peerConnection.current.createOffer());
                    console.log("negotiation setting description: ", peerConnection.current.localDescription);
                    stompClient.current.send("/app/offer", {}, JSON.stringify({
                         "toUser": remoteID.toString(),
                         "fromUser": localID.toString(),
                         "offer": JSON.stringify(peerConnection.current.localDescription)
                    }))
               }


               peerConnection.current.onicecandidate = (event) => {
                    console.log(event);
                    if (event.candidate) {
                         stompClient.current.send("/app/candidate", {}, JSON.stringify({
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
          }
     
          handlewebrtc();


     }, [])




     const handleVoiceToggle = async (e) => {
          console.log(localStream);
          const audioTrack = await localStream.getTracks().find(track => track.kind === 'audio');
          console.log(audioTrack);
          if (audioTrack.enabled) {
               audioTrack.enabled = false;
               setAudio(false);
          }
          else {
               audioTrack.enabled = true;
               setAudio(true);
          }
     }



     const handleVideoToggle = async (e) => {
          console.log(localStream);
          const videoTrack = await localStream.getTracks().find(track => track.kind === 'video');
          console.log(videoTrack);
          if (videoTrack.enabled) {
               videoTrack.enabled = false;
               setVideo(false);
          }
          else {
               videoTrack.enabled = true;
               setVideo(true);
          }
     }


     const handleEndCall = async (e) => {

          localStream.getTracks().forEach(track => {
               track.stop();
          })



          peerConnection.current.ontrack = null;
          peerConnection.current.onremovetrack = null;
          peerConnection.current.onicecandidate = null;
          peerConnection.current.oniceconnectionstatechange = null;
          peerConnection.current.onsignalingstatechange = null;

          console.log(remoteVideoRef.current);


          peerConnection.current.close();

          stompClient.current.send("/app/disconnectCall", {}, JSON.stringify({
               "acceptedBy": localID.toString(),
               "initiatedBy": remoteID.toString(),
               "role": role
          }))

          peerConnection.current = null;


          stompClient.current = null;

          navigate("/endCall");
          // if (role === "doctor") navigate("/doctor/dashboard");
          // else navigate("/patient/dashboard");

     }

     /*
     
          NEED TO COMPLETE THE RECORDING TASK
 
     function download() {
          console.log(recording);
          const blob = new Blob(recording, {
               type: "video/mp4",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = "test.mp4";
          a.click();
          window.URL.revokeObjectURL(url);
     }
 
     const handleStartRecording = async () => {
          startRecording();
          // const canvas = document.querySelector("body");
          // const stream = localStream.captureStream(25);
          // setRecordingStart(prev => prev = true);
          // setRecordingStop(prev => prev = false);
 
          // const options = { mimeType: "video/webm;codecs=vp9,opus" };
          // mediaRecorder.current = new MediaRecorder(localStream, options);
          // mediaRecorder.current.ondataavailable = (event) => {
          //      console.log(event);
 
          //      if (event.data.size > 0) {
          //           setRecording(event.data);
          //           // console.log(recording);
          //           download();
          //      }
          // }
          // mediaRecorder.current.start();
 
 
          // mediaRecorder.current
     }
 
     const handleDownload = () => {
          console.log(mediaBlobUrl);
          if (mediaBlobUrl) {
               const url = window.URL.createObjectURL(new Blob(mediaBlobUrl, {type: 'video/mp4'}));
               const a = document.createElement('a');
               a.style.display = 'none';
               a.href = url;
               a.download = 'recorded_video.mp4'; // You can set the desired file name here
               document.body.appendChild(a);
               a.click();
               window.URL.revokeObjectURL(url);
               document.body.removeChild(a);
          }
     };
 
 
     const handleStopRecording = async () => {
          stopRecording();
          handleDownload();
          // setRecordedVideoBlob(mediaBlobUrl);
 
          // const canvas = document.querySelector("body");
          // const stream = localStream.captureStream(25);
 
          // setRecordingStart(prev => prev = false);
          // setRecordingStop(prev => prev = true);
 
          // mediaRecorder.current.stop();
     }
     */








     console.log(location.state);
     console.log("status: ", status);



     return (
          <>
               <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "20px" }}>
                    <div style={{ margin: "10px" }}>
                         <video src={mediaBlobUrl} ref={localVideoRef} autoPlay muted style={{ border: "2px solid grey", borderRadius: "30px" }} />
                         <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>{localName}(You)</div>
                    </div>
                    <div ref={myref} style={{ margin: "10px" }} >
                         <video ref={remoteVideoRef} autoPlay style={{ border: "2px solid grey", borderRadius: "30px", width: "100%", height: "100%" }} />
                         <div style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>{remoteName}</div>
                    </div>

               </div>
               <div style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={handleVoiceToggle}>
                         {
                              audio
                                   ?
                                   <MicIcon className='call_btn' sx={{ margin: "20px" }} />
                                   :
                                   <MicOffIcon className='call_btn' sx={{ margin: "20px" }} />
                         }
                    </IconButton>
                    <IconButton onClick={handleVideoToggle}>
                         {
                              video
                                   ?
                                   <VideocamIcon className='call_btn' sx={{ margin: "20px" }} />
                                   :
                                   <VideocamOffIcon className='call_btn' sx={{ margin: "20px" }} />
                         }
                    </IconButton>
                    <IconButton onClick={handleEndCall}>
                         {
                              <CallEndIcon className='call_btn' sx={{ margin: "20px" }} />
                         }
                    </IconButton>

                    {console.log(status)}
                    {
                         // role === "doctor"
                         //      ?
                         //      status === "idle" || status === "stopped"
                         //           ?
                         //           <IconButton onClick={handleStartRecording}>
                         //                {
                         //                     <RadioButtonCheckedIcon className='call_btn' sx={{ margin: "20px" }} />
                         //                }
                         //           </IconButton>
                         //           :
                         //           <IconButton onClick={handleStopRecording}>
                         //                {
                         //                     <StopCircleIcon className='call_btn' sx={{ margin: "20px" }} />
                         //                }
                         //           </IconButton>
                         //      :
                         //      <>
                         //      </>
                    }

               </div>
          </>
     )
}

export default Room