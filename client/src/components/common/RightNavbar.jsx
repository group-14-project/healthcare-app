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
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Store/store";
import styles from "./RightNavbar.module.css";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../Store/loginSlice";
import { changeStatus } from "../../Store/doctorSlice";

const RightNavbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = store.getState();
	const [currState, setCurrentState] = useState("busy");
	const role = useSelector((state) => state.login.user.role);
	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.clear();
		window.sessionStorage.clear();
		loginActions.updateDetails(dispatch(loginActions.resetState()));

		navigate("/");
	};
	const handleSwitch = () => {
		if(currState == "busy"){
			setCurrentState("active")
			dispatch(changeStatus(1));
		}
		else{
			setCurrentState("busy");
			dispatch(changeStatus(2))

		}
	};
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
						{role == "doctor" && (
							<>
								<input
									onClick={handleSwitch}
									className={styles.input_switch}
									type="checkbox"
									id="demo"
								/>
								<label className={styles.label_switch} htmlFor="demo"></label>
								<span className={styles.info_text}></span>
							</>
						)}
					</Toolbar>
					<Toolbar>
						<Box>
							<Typography noWrap component="p" className="rgt-navbar-name">
								{role !== "hospital" &&
									state[role].firstName + " " + state[role].lastName}
								{role === "hospital" &&
									state[role].hospitalName}
							</Typography>
							<Box
								underline="none"
								className={`"rgt-navbar-view-label" ${styles.hover}`}
							>
								{"View Profile"}
								<Box className={styles.profile_logout}>
									<Link
										onClick={() => {
											navigate(`/${role}/details`);
										}}
										underline="none"
										className="rgt-navbar-view-label"
									>
										{"View Profile"}
									</Link>
									<hr className={styles.line_hard} />
									<Link
										underline="none"
										className="rgt-navbar-view-label"
										onClick={handleLogout}
									>
										{"Logout"}
									</Link>
								</Box>
							</Box>
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
