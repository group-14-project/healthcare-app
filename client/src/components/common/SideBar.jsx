import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SidebarTheme from "./SidebarTheme";
import { ThemeProvider } from "@emotion/react";
import PersonIcon from "@mui/icons-material/Person";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DuoSharpIcon from "@mui/icons-material/DuoSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import MedicationSharpIcon from "@mui/icons-material/MedicationSharp";
import UndoSharpIcon from "@mui/icons-material/UndoSharp";
import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import smallLogo from "../../assets/logo.png";
import largeLogo from "../../assets/logo_full.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";
import ShieldIcon from "@mui/icons-material/Shield";
import { useDispatch, useSelector } from "react-redux";
import { GetCookie, loginActions,logout } from "../../Store/loginSlice";
import sessionStorage from "redux-persist/es/storage/session";
import AddIcon from "@mui/icons-material/Add";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

function SideBar(props) {
	const sidebarRef = React.useRef(null);

	const sidebarContent = props.content.sidebarContent.sidebar.content;
	const userType = props.type.user.user.type;
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [logo, setLogo] = React.useState(smallLogo);
	const location = useLocation();
	const patientData = location.state;

	const navigate = useNavigate();
	const role = useSelector((state) => state.login.user.role);
	const state = useSelector((state) => state.login);
	const senior = useSelector((state) => state.doctor.senior);

	const dispatch = useDispatch();

	const showDashboard = () => {
		navigate(`/${role}/dashboard`);
	};

	React.useEffect(() => {
		function handleClickOutside(event) {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setOpen(false);
				setLogo(smallLogo);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [sidebarRef]);

	const handleDrawerOpen = () => {
		setOpen(true);
		setLogo(largeLogo);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout(userType,localStorage.getItem("token")));
		// sessionStorage.clear();
		window.sessionStorage.clear();
		loginActions.updateDetails(dispatch(loginActions.resetState()));
		navigate("/");
	};

	return (
		<Box className={styles.sidebar_parent} ref={sidebarRef}>
			<CssBaseline />

			<ThemeProvider theme={SidebarTheme}>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader className={styles.sidebar_logo}>
						<IconButton
							className={styles.sidebar_logos}
							onClick={showDashboard}
						>
							<img
								src={logo}
								alt="logo"
								className={`${
									logo === smallLogo ? "small_logo_img" : "large_logo_img"
								}
									${styles.sidebar_logo_img}`}
							/>
						</IconButton>
					</DrawerHeader>

					<DrawerHeader className={styles.burger_btn}>
						<IconButton
							color="#fff"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								...(open && { display: "none", color: "#fff" }),
							}}
						>
							<MenuIcon style={{ color: "#fff" }} />
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						{userType === "doctor" &&
							sidebarContent.map((text, index) => (
								<ListItem
									key={text}
									disablePadding
									className={styles.sidebar_list_item}
								>
									<ListItemButton
										onClick={(e) => {
											text === "Logout" ? handleLogout(e) : "";
										}}
										className={styles.sidebar_btn}
										sx={{
											justifyContent: open ? "initial" : "center",
											marginBottom: "10px",
										}}
										component={Link}
										to={`${userType}/${text.replace(/\s+/g, "").toLowerCase()}`}
										patient={patientData}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : "auto",
												justifyContent: "center",
												color: "#fff",
											}}
										>
											{index == 0 ? (
												<PersonIcon style={{ color: "#fff" }} />
											) : index == 1 ? (
												<SummarizeSharpIcon style={{ color: "#fff" }} />
											) : index == 2 ? (
												<ReviewsIcon style={{ color: "#fff" }} />
											) : index == 3 ? (
												<ScreenShareIcon style={{ color: "#fff" }} />
											) : index == 4 ? (
												userType === "doctor" ? (
													<UndoSharpIcon style={{ color: "#fff" }} />
												) : (
													<ShieldIcon style={{ color: "#fff" }} />
												)
											) : index == 5 && userType === "doctor" ? (
												<ShieldIcon style={{ color: "#fff" }} />
											) : (
												<LogoutSharpIcon style={{ color: "#fff" }} />
											)}
										</ListItemIcon>
										<ListItemText
											primary={text}
											sx={{ ...(!open && { display: "none" }), color: "#fff" }}
										/>
									</ListItemButton>
								</ListItem>
							))}
						{userType === "patient" &&
							sidebarContent.map((text, index) => (
								<ListItem
									key={text}
									disablePadding
									className={styles.sidebar_list_item}
								>
									<ListItemButton
										onClick={(e) => {
											text === "Logout" ? handleLogout(e) : "";
										}}
										className={styles.sidebar_btn}
										sx={{
											justifyContent: open ? "initial" : "center",
											marginBottom: "10px",
										}}
										component={Link}
										to={`${userType}/${text.replace(/\s+/g, "").toLowerCase()}`}
										patient={patientData}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : "auto",
												justifyContent: "center",
												color: "#fff",
											}}
										>
											{index == 0 ? (
												<DuoSharpIcon style={{ color: "#fff" }} />
											) : index == 1 ? (
												<SummarizeSharpIcon style={{ color: "#fff" }} />
											) : index == 2 ? (
												<MedicationSharpIcon style={{ color: "#fff" }} />
											) : index == 3 ? (
												<ScreenShareIcon style={{ color: "#fff" }} />
											) : index == 4 ? (
												userType === "doctor" ? (
													<UndoSharpIcon style={{ color: "#fff" }} />
												) : (
													<ShieldIcon style={{ color: "#fff" }} />
												)
											) : index == 5 && userType === "doctor" ? (
												<ShieldIcon style={{ color: "#fff" }} />
											) : (
												<LogoutSharpIcon style={{ color: "#fff" }} />
											)}
										</ListItemIcon>
										<ListItemText
											primary={text}
											sx={{ ...(!open && { display: "none" }), color: "#fff" }}
										/>
									</ListItemButton>
								</ListItem>
							))}
						{userType === "hospital" &&
							sidebarContent.map((text, index) => (
								<ListItem
									key={text}
									disablePadding
									className={styles.sidebar_list_item}
								>
									<ListItemButton
										onClick={(e) => {
											text === "Logout" ? handleLogout(e) : "";
										}}
										className={styles.sidebar_btn}
										sx={{
											justifyContent: open ? "initial" : "center",
											marginBottom: "10px",
										}}
										component={Link}
										to={`${userType}/${text.replace(/\s+/g, "").toLowerCase()}`}
										patient={patientData}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : "auto",
												justifyContent: "center",
												color: "#fff",
											}}
										>
											{index == 0 ? (
												<AddIcon style={{ color: "#fff" }} />
											) : index == 1 ? (
												<MedicationSharpIcon style={{ color: "#fff" }} />
											) : index == 3 ? (
												<PlaylistAddCheckIcon style={{ color: "#fff" }} />
											) : (
												<LogoutSharpIcon style={{ color: "#fff" }} />
											)}
										</ListItemIcon>
										<ListItemText
											primary={text}
											sx={{ ...(!open && { display: "none" }), color: "#fff" }}
										/>
									</ListItemButton>
								</ListItem>
							))}
					</List>
				</Drawer>
			</ThemeProvider>
		</Box>
	);
}

export default SideBar;
