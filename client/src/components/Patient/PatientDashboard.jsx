import { Box, Typography } from '@mui/material'
import React from 'react'
import MidNavbar from '../common/MidNavbar'
import RightNavbar from '../common/RightNavbar'

const PatientDashboard = () => {
  return (

    <Box sx={{ display: "flex", marginLeft:"60px"}}>
      <Box sx={{ flex: 2 }}>
        <MidNavbar />
      </Box>
      <Box sx={{ flex: 1, backgroundColor: "white"}}>
        <RightNavbar />
      </Box>
    </Box>

  )
}

export default PatientDashboard