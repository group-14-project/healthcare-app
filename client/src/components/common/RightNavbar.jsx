import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Box from "@mui/material/Box";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import { store } from "../../Store/store";

const RightNavbar = () => {
	const state = store.getState();
	const role = useSelector((state) => state.login.user.role);
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
								{state[role].firstName + " " + state[role].lastName}
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
