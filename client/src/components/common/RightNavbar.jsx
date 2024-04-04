import React from "react";
import "./Navbar.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarTheme from "./NavbarTheme";
import { ThemeProvider } from "@emotion/react";
// import IconButton from '@mui/material/IconButton';
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";

// const RightNavbar = () => {

//      // const theme = useTheme();

//      return (

//           <Box sx={{ display: 'flex' }}>

//                <CssBaseline />
//                <ThemeProvider theme={NavbarTheme}>
//                     <AppBar >
//                          <Toolbar>
//                               {/* <IconButton
//                                    color="inherit"
//                                    // aria-label="open drawer"
//                                    // onClick={handleDrawerOpen}
//                                    edge="start"
//                                    sx={{
//                                         marginRight: 5,
//                                         // ...(open && { display: 'none' }),
//                                    }}
//                               >
//                                    <MenuIcon />
//                               </IconButton> */}
//                               <Typography variant="h6" noWrap component="div">
//                                    right variant drawer
//                               </Typography>
//                          </Toolbar>
//                     </AppBar>
//                </ThemeProvider>

//           </Box>

//      )

// }

const RightNavbar = () => {
	const location = useLocation();
	console.log(location.state);

	return (
		<Box className="right-navbar-parent">
			<CssBaseline />
			<AppBar position="static" className="right-navbar">
				<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
					<Toolbar>
						<IconButton>
							<SettingsIcon className="rgt-navbar-settings-btn" />
						</IconButton>
						<IconButton>
							<NotificationsNoneIcon className="rgt-navbar-notif-btn" />
						</IconButton>
					</Toolbar>
<Toolbar>
     <Box>
          <Typography noWrap component="p" className="rgt-navbar-name">
               {location.state[location.state.role].firstName + " " + location.state[location.state.role].lastName}
          </Typography>
          <Link href="#" underline="none" className="rgt-navbar-view-label">
               {"View Profile"}
          </Link>
     </Box>
     <IconButton>
          <AccountCircleIcon className="profile-icon" />
     </IconButton>
</Toolbar>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default RightNavbar;
