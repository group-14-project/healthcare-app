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
import DuoSharpIcon from "@mui/icons-material/DuoSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import MedicationSharpIcon from "@mui/icons-material/MedicationSharp";
import UndoSharpIcon from "@mui/icons-material/UndoSharp";
import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import smallLogo from "../../assets/logo.png";
import largeLogo from "../../assets/logo_full.png";
import { Link } from "react-router-dom";
import './Sidebar.css';
import { useLocation } from "react-router-dom";

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
	console.log("in sidebar: ", props);
	const sidebarContent = props.content.sidebarContent.sidebar.content;
	const userType = props.type.user.user.type;
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [logo,setLogo] = React.useState(smallLogo);
	const location = useLocation();
	const patientData = location.state;
	console.log(location.state);

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

	return (
		<Box className="sidebar-parent" ref={sidebarRef}>
			<CssBaseline />

			<ThemeProvider theme={SidebarTheme}>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader className="logo">
						<IconButton>
							<img src={logo} alt="logo" className={logo===smallLogo ? "small_logo_img": "large_logo_img"}/>
						</IconButton>
					</DrawerHeader>

					<DrawerHeader className="burger-btn">

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
						{sidebarContent.map((text, index) => (
							<ListItem key={text} disablePadding className="sidebar-list-item">
								<ListItemButton
									className="sidebar-btn"
									sx={{
										justifyContent: open ? "initial" : "center",
										marginBottom: "10px"
									}}
									component={Link}
									to={`${userType}/${text.replace(/\s+/g, '').toLowerCase()}`}
									patient={patientData}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : "auto",
											justifyContent: "center",
											color: "#fff"
										}}
									>
										{index == 0 ? (
											<DuoSharpIcon style={{ color: "#fff" }} />
										) : index == 1 ? (
											<SummarizeSharpIcon style={{ color: "#fff" }} />
										) : index == 2 ? (
											<MedicationSharpIcon style={{ color: "#fff" }} />
										) : index == 3 ? (
											<UndoSharpIcon style={{ color: "#fff" }} />
										) : index == 4 ? (
											<UpdateSharpIcon style={{ color: "#fff" }} />
										) : (
											<LogoutSharpIcon style={{ color: "#fff" }} />
										)}
									</ListItemIcon>
									<ListItemText primary={text} sx={{ ...(!open && { display: "none" }), color: "#fff" }} />
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
