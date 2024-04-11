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
import { useNavigate } from 'react-router-dom';
import "./Room.css";

const Room = () => {

     let stompClient = useRef();

     // let peerState = useState(["local", re])
     const location = useLocation();

     let localVideoRef = useRef();
     let remoteVideoRef = useRef();
     let peerConnection = useRef();
     let myref = useRef();

     let remoteID = location.state.initiatedBy.caller;
     let remoteName = location.state.initiatedBy.name
     let localID = location.state.acceptedBy.callee;
     let localName = location.state.acceptedBy.name;
     const [audio, setAudio] = useState(false);
     const [video, setVideo] = useState(false);
     const [localStream, setLocalStream] = useState(null);
     const [remoteStream, setRemoteStream] = useState(null);

     const navigate = useNavigate();

     // const [reloadCount, setReloadCount] = useState(1);
     // localStorage.setItem("reloadCount", 1);

     // const reloadCount = parseInt(localStorage.getItem("reloadCount"));


     useEffect(() => {

          // if(reloadCount===1){
          //      localStorage.setItem("reloadCount", reloadCount+1);
          //      window.location.reload();
          // }


          var configuration = {
               iceServers: [{
                    urls: [
                         "stun:stun.l.google.com:19302",
                         "stun:global.stun.twilio.com:3478",
                    ]
               }]
          };

          peerConnection.current = new RTCPeerConnection(configuration);
          var conn = new SockJS("http://localhost:9090/socket");
          stompClient.current = new Stomp.over(conn);


          stompClient.current.connect({}, async (frame) => {
               
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

          })





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
               "initiatedBy": remoteID.toString()
          }))

          peerConnection.current = null;


          stompClient.current = null;

          navigate('/endCall');

     }




     console.log(location.state);



     return (
          <>
               <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "20px" }}>
                    <div style={{ margin: "10px" }}>
                         <video ref={localVideoRef} autoPlay muted style={{ border: "2px solid grey", borderRadius: "30px" }} />
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
               </div>
          </>
     )
}

export default Room