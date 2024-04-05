import React, { useEffect, useState } from "react";
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

const RightNavbar = () => {
	const location = useLocation();
	console.log("Right Navbar", location.state);
	const [roleName,setRoleName] = useState("");
	useEffect(() => {
		setRoleName(localStorage.getItem("role"));
	}, []);

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
								{/* {location.state[roleName].firstName +
									" " +
									location.state[roleName].lastName} */}
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
