import React from 'react'
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { acceptCall, doctorActions, rejectCall } from '../../Store/doctorSlice';


const IncomingCall = (props) => {

     const doctorState = useSelector(state => state.doctor);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     console.log(props);

     const handleAcceptCall = async () => {

          const obj = dispatch(acceptCall(doctorState.firstName, doctorState.patientName, doctorState.remoteId, doctorState.doctorId));

          dispatch(doctorActions.updateIncomingCall(false));

          navigate(`/room/${obj.roomId}`, { state: obj.data });
     };

     const handleRejectCall = () => {
          dispatch(doctorActions.updateIncomingCall(false));

          dispatch(rejectCall(doctorState.firstName, doctorState.doctorId, doctorState.patientName, doctorState.remoteId));
     }


     return (
          <div
               style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(0,0,0,0.9)",
                    backdropFilter: "blur(5px)",
                    zIndex: "2",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
               }}
          >
               <h4 style={{ color: "#fff" }}>
                    Patient {doctorState.patientName} is calling you
               </h4>
               <div
                    style={{
                         display: "flex",
                         flexDirection: "row",
                         justifyContent: "space-evenly",
                         width: "20%",
                    }}
               >
                    <Button
                         variant="contained"
                         color="success"
                         onClick={handleAcceptCall}
                    >
                         Accept
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleRejectCall}>
                         Reject
                    </Button>
               </div>
          </div>
     )
}

export default IncomingCall;