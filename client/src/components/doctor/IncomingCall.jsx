import React from 'react'
import Button from "@mui/material/Button";

const IncomingCall = (props) => {

     console.log(props);


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
                    backdropFilter: blur("10px"),
                    zIndex: "2",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
               }}
          >
               <h4 style={{ color: "#fff" }}>
                    Patient {props.patientName} is calling you
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
                         onClick={props.utils}
                    >
                         Accept
                    </Button>
                    <Button variant="outlined" color="error">
                         Reject
                    </Button>
               </div>
          </div>
     )
}

export default IncomingCall;