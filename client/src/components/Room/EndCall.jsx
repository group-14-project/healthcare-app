import React from 'react'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EndCall = () => {

     const state = useSelector(state=>state);
     const navigate = useNavigate();
     
     const handleClick = (e) => {
          e.preventDefault();
          if(state.login.user.role === "patient")navigate("/patient/dashboard");
          else navigate("/doctor/dashboard");
     }

     return (
          <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", height:"100vh" }}>
               <Box sx={{fontSize:"2rem", marginBottom:"20px"}}>
                    Call Ended!!
               </Box>

               <Box>
                    <Button variant='contained' color="success" onClick={handleClick}>Go to Dashboard</Button>
               </Box>

          </Box>
     )
}

export default EndCall