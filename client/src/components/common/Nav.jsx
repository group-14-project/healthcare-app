import React from 'react'
import { Box, Typography } from '@mui/material'
import MidNavbar from '../common/MidNavbar'
import RightNavbar from '../common/RightNavbar'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const Nav = (props) => {

     console.log(props)
     const sidebarContent = props.sidebar;
     const user = props.user
     return (
          <>

               <SideBar content={{sidebarContent}} type={{user}}/>
               <Box sx={{ display: "flex", marginLeft: "60px" }}>
                    <Box sx={{ flex: 2 }}>
                         <MidNavbar />
                    </Box>
                    <Box sx={{ flex: 1, backgroundColor: "white" }}>
                         <RightNavbar />
                    </Box>
               </Box>
               {/* <div>
                    <Outlet />
               </div> */}

          </>
     )
}

export default Nav